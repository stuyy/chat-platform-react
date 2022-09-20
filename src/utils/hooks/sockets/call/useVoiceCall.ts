import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import {
  setCaller,
  setReceiver,
  setIsReceivingCall,
  setCallType,
} from '../../../../store/call/callSlice';
import { ReceiverEvents } from '../../../constants';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import { CallPayload } from '../../../types';

export function useVoiceCall() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);
  const { isReceivingCall } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    socket.on(ReceiverEvents.VOICE_CALL, (data: CallPayload) => {
      console.log('receiving voice call....');
      console.log(data);
      if (isReceivingCall) return;
      dispatch(setCaller(data.caller));
      dispatch(setReceiver(user!));
      dispatch(setIsReceivingCall(true));
      dispatch(setCallType('audio'));
    });

    return () => {
      socket.off(ReceiverEvents.VOICE_CALL);
    };
  }, [isReceivingCall]);
}
