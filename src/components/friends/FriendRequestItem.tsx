import { FC, useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { FriendRequestItemContainer } from '../../utils/styles/friends';
import { FriendRequest } from '../../utils/types';

type Props = {
  friendRequest: FriendRequest;
};
export const FriendRequestItem: FC<Props> = ({ friendRequest }) => {
  const { user } = useContext(AuthContext);
  return (
    <FriendRequestItemContainer>
      <div className="avatar"></div>
      <div>
        {user?.id === friendRequest.sender.id ? (
          <div>Outgoing request to {friendRequest.receiver.email}</div>
        ) : (
          <div>Incoming request from {friendRequest.sender.email}</div>
        )}
      </div>
    </FriendRequestItemContainer>
  );
};
