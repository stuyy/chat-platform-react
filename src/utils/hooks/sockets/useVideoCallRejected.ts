import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { resetState } from '../../../store/call/callSlice';
import { SocketContext } from '../../context/SocketContext';

export function useVideoCallRejected() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    socket.on('onVideoCallRejected', (data) => {
      console.log('receiver rejected the call ', data.receiver);
      dispatch(resetState());
    });

    return () => {
      console.log('removing onVideoCallRejected listener');
      socket.off('onVideoCallRejected');
    };
  }, []);
}
