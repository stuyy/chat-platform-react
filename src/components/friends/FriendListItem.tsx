import { FC, useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { FriendListItemContainer } from '../../utils/styles/friends';
import { Friend } from '../../utils/types';

type Props = {
  friend: Friend;
};

export const FriendListItem: FC<Props> = ({ friend }) => {
  const { user } = useContext(AuthContext);
  return (
    <FriendListItemContainer>
      <div className="avatar"></div>
      <div>
        {user?.id === friend.sender.id
          ? friend.receiver.email
          : friend.sender.email}
      </div>
    </FriendListItemContainer>
  );
};
