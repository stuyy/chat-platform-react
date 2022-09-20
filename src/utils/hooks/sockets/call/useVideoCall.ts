import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import {
  setCaller,
  setReceiver,
  setIsReceivingCall,
} from '../../../../store/call/callSlice';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import { VideoCallPayload } from '../../../types';

export function useVideoCall() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);
  const { isReceivingCall } = useSelector((state: RootState) => state.call);

  useEffect(() => {
    socket.on('onVideoCall', (data: VideoCallPayload) => {
      console.log('receiving video call....');
      console.log(data);
      if (isReceivingCall) return;
      dispatch(setCaller(data.caller));
      dispatch(setReceiver(user!));
      dispatch(setIsReceivingCall(true));
    });

    return () => {
      socket.off('onVideoCall');
    };
  }, [isReceivingCall]);
}
