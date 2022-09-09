import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FriendListContainer } from '../../utils/styles/friends';
import { FriendRequestItem } from './FriendRequestItem';

export const FriendRequestList = () => {
  const friendRequests = useSelector(
    (state: RootState) => state.friends.friendRequests
  );
  return (
    <FriendListContainer>
      {friendRequests.length === 0 && <div>No Friend Requests :(</div>}
      {friendRequests.map((friendRequest) => (
        <FriendRequestItem
          key={friendRequest.id}
          friendRequest={friendRequest}
        />
      ))}
    </FriendListContainer>
  );
};
