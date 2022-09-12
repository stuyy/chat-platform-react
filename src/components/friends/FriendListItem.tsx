import { FC, useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { FriendListItemContainer } from '../../utils/styles/friends';
import { ContextMenuEvent, Friend } from '../../utils/types';

type Props = {
  friend: Friend;
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void;
};

export const FriendListItem: FC<Props> = ({ friend, onContextMenu }) => {
  const { user } = useContext(AuthContext);
  return (
    <FriendListItemContainer onContextMenu={(e) => onContextMenu(e, friend)}>
      <div className="avatar"></div>
      <div>
        {user?.id === friend.sender.id
          ? friend.receiver.username
          : friend.sender.username}
      </div>
    </FriendListItemContainer>
  );
};
