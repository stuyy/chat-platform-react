import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { UserSidebar } from '../components/sidebars/UserSidebar';
import { AppDispatch } from '../store';
import { addFriendRequest } from '../store/friends/friendsSlice';
import { SocketContext } from '../utils/context/SocketContext';
import { LayoutPage } from '../utils/styles';
import { FriendRequest } from '../utils/types';

export const AppPage = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      console.log('onFriendRequestReceived');
      console.log(payload);
      dispatch(addFriendRequest(payload));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return (
    <LayoutPage>
      <UserSidebar />
      <Outlet />
    </LayoutPage>
  );
};
