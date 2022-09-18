import { useContext, useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext';

export function useVideoCallRejected() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('onVideoCallRejected', (data) => {
      console.log('receiver rejected the call ', data.receiver);
    });

    return () => {
      console.log('removing onVideoCallRejected listener');
      socket.off('onVideoCallRejected');
    };
  }, []);
}
