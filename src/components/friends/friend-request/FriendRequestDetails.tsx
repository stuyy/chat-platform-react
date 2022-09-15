import { FC } from 'react';
import { FriendRequestDetailsType } from '../../../utils/types';
import { UserAvatar } from '../../users/UserAvatar';

type Props = {
  details: FriendRequestDetailsType;
};

export const FriendRequestDetails: FC<Props> = ({ details }) => (
  <div className="details">
    <UserAvatar user={details.user} />
    <div className="name">
      <span>{details.displayName}</span>
      <span className="status">{details.status}</span>
    </div>
  </div>
);
