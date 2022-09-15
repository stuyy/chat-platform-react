import { Crown } from 'akar-icons';
import { FC } from 'react';
import { GroupRecipientSidebarItem } from '../../../utils/styles';
import { Group, User } from '../../../utils/types';
import { UserAvatar } from '../../users/UserAvatar';

type Props = {
  onlineUsers: User[];
  group?: Group;
  onUserContextMenu: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: User
  ) => void;
};

export const OfflineGroupRecipients: FC<Props> = ({
  onlineUsers,
  group,
  onUserContextMenu,
}) => (
  <>
    {group?.users
      .filter(
        (user) => !onlineUsers.find((onlineUser) => onlineUser.id === user.id)
      )
      .map((user) => (
        <GroupRecipientSidebarItem
          online={false}
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <div className="left">
            <UserAvatar user={user} />
            <span>{user.firstName}</span>
          </div>
          {user.id === group?.owner.id && <Crown color="#ffbf00" />}
        </GroupRecipientSidebarItem>
      ))}
  </>
);
