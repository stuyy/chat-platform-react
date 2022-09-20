import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import {
  setActiveConversationId,
  setCall,
  setConnection,
  setIsCallInProgress,
  setIsReceivingCall,
} from '../../../../store/call/callSlice';
import { WebsocketEvents } from '../../../constants';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import { AcceptedCallPayload } from '../../../types';

export function useVoiceCallAccepted() {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { peer, localStream } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    socket.on(
      WebsocketEvents.VOICE_CALL_ACCEPTED,
      (data: AcceptedCallPayload) => {
        if (!peer) return console.log('AUDIO: No Peer');
        dispatch(setActiveConversationId(data.conversation.id));
        dispatch(setIsCallInProgress(true));
        dispatch(setIsReceivingCall(false));
        if (data.caller.id === user!.id) {
          console.log('AUDIO: connecting to peer now');
          const connection = peer.connect(data.acceptor.peer.id);
          dispatch(setConnection(connection));
          if (!connection) return console.log('No connection');
          if (localStream) {
            console.log('AUDIO: calling peer now');
            const newCall = peer.call(data.acceptor.peer.id, localStream);
            dispatch(setCall(newCall));
          }
        }
      }
    );

    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_ACCEPTED);
    };
  }, [localStream, peer]);
}
