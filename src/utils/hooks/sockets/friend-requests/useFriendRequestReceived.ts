import { useContext, useEffect } from 'react';
import { IoMdPersonAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../store';
import { addFriendRequest } from '../../../../store/friends/friendsSlice';
import { SocketContext } from '../../../context/SocketContext';
import { FriendRequest } from '../../../types';
import { useToast } from '../../useToast';

export function useFriendRequestReceived() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { info } = useToast({ theme: 'dark' });
  useEffect(() => {
    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      console.log('onFriendRequestReceived');
      console.log(payload);
      dispatch(addFriendRequest(payload));
      info(`Incoming Friend Request from ${payload.sender.firstName}`, {
        position: 'bottom-left',
        icon: IoMdPersonAdd,
        onClick: () => navigate('/friends/requests'),
      });
    });

    return () => {
      socket.off('onFriendRequestReceived');
    };
  }, []);
}
