import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FriendRequestList } from '../../components/friends/FriendRequestList';
import { AppDispatch } from '../../store';
import { fetchFriendRequestThunk } from '../../store/friends/friendsThunk';

export const FriendRequestPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  return <FriendRequestList />;
};
