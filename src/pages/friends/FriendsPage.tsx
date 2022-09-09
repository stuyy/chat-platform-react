import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FriendList } from '../../components/friends/FriendList';
import { AppDispatch } from '../../store';
import { fetchFriendsThunk } from '../../store/friends/friendsThunk';

export const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);

  return <FriendList />;
};
