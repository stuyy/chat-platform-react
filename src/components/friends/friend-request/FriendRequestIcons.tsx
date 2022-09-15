import { FC } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { FriendRequestItemIcon } from '../../../utils/styles/friends';
import {
  FriendRequestDetailsType,
  HandleFriendRequestAction,
} from '../../../utils/types';

type Props = {
  details: FriendRequestDetailsType;
  handleFriendRequest: (type?: HandleFriendRequestAction) => void;
};

export const FriendRequestIcons: FC<Props> = ({
  details,
  handleFriendRequest,
}) => {
  return (
    <div className="icons">
      {details.incoming && (
        <FriendRequestItemIcon
          isAccept={true}
          onClick={() => handleFriendRequest('accept')}
        >
          <MdCheck />
        </FriendRequestItemIcon>
      )}
      <FriendRequestItemIcon
        onClick={() =>
          details.incoming
            ? handleFriendRequest('reject')
            : handleFriendRequest()
        }
      >
        <MdClose />
      </FriendRequestItemIcon>
    </div>
  );
};
