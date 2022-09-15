import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

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
          online={true}
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
            online={false}
          />
        ))}
      {showContextMenu && <FriendContextMenu />}
    </FriendListContainer>
  );
};
