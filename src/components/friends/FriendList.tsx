import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { AppDispatch, RootState } from '../../store';
import { FriendListContainer } from '../../utils/styles/friends';
import { FriendListItem } from './FriendListItem';
import { FriendContextMenu } from '../context-menus/FriendContextMenu';
import { ContextMenuEvent, Friend } from '../../utils/types';
import {
  setContextMenuLocation,
  setSelectedFriend,
  toggleContextMenu,
} from '../../store/friends/friendsSlice';

export const FriendList = () => {
  const { showContextMenu, friends, onlineFriends } = useSelector(
    (state: RootState) => state.friends
  );
  const dispatch = useDispatch<AppDispatch>();

  const onContextMenu = (e: ContextMenuEvent, friend: Friend) => {
    e.preventDefault();
    console.log('Friend Context Menu');
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedFriend(friend));
  };

  return (
    <FriendListContainer>
      {onlineFriends.length > 0 && <span>Online ({onlineFriends.length})</span>}
      {onlineFriends.map((friend) => (
        <FriendListItem
          key={friend.id}
          friend={friend}
          onContextMenu={onContextMenu}
        />
      ))}
      <span>Offline</span>
      {friends
        .filter(
          (friend) =>
            !onlineFriends.find((onlineFriend) => onlineFriend.id === friend.id)
        )
        .map((friend) => (
          <FriendListItem
            key={friend.id}
            friend={friend}
            onContextMenu={onContextMenu}
          />
        ))}
      {/* {offlineFriends.length > 0 && (
        <span>Offline ({offlineFriends.length})</span>
      )}
      {offlineFriends.map((friend) => (
        <FriendListItem
          key={friend.id}
          friend={friend}
          onContextMenu={onContextMenu}
        />
      ))} */}
      {showContextMenu && <FriendContextMenu />}
    </FriendListContainer>
  );
};
