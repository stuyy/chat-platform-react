import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { CallsSidebar } from '../../components/sidebars/calls/CallsSidebar';
import { AppDispatch } from '../../store';
import { fetchFriendsThunk } from '../../store/friends/friendsThunk';

export const CallsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, []);
  return (
    <>
      <CallsSidebar />
      <Outlet />
    </>
  );
};
