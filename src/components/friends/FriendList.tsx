import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../../store';
import { FriendListContainer } from '../../utils/styles/friends';
import { FriendListItem } from './FriendListItem';

export const FriendList = () => {
  const { friends, onlineFriends, offlineFriends } = useSelector(
    (state: RootState) => state.friends
  );

  return (
    <FriendListContainer>
      {onlineFriends.length > 0 && <span>Online ({onlineFriends.length})</span>}
      {onlineFriends.map((friend) => (
        <FriendListItem key={friend.id} friend={friend} />
      ))}
      {offlineFriends.length > 0 && (
        <span>Offline ({offlineFriends.length})</span>
      )}
      {offlineFriends.map((friend) => (
        <FriendListItem key={friend.id} friend={friend} />
      ))}
    </FriendListContainer>
  );
};
