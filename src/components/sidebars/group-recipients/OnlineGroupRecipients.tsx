import { Crown } from 'akar-icons';
import { FC } from 'react';
import { GroupRecipientSidebarItem } from '../../../utils/styles';
import { ContextMenuEvent, Group, User } from '../../../utils/types';
import { UserAvatar } from '../../users/UserAvatar';

type Props = {
  users: User[];
  group?: Group;
  onUserContextMenu: (e: ContextMenuEvent, user: User) => void;
};

export const OnlineGroupRecipients: FC<Props> = ({
  users,
  group,
  onUserContextMenu,
}) => {
  const formatStatusMessage = ({ presence }: User) => {
    if (!presence || !presence.statusMessage) return null;
    const { statusMessage } = presence;
    return statusMessage.length > 30
      ? statusMessage.slice(0, 30).concat('...')
      : statusMessage;
  };

  return (
    <>
      {users.map((user) => (
        <GroupRecipientSidebarItem
          online={true}
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <div className="left">
            <UserAvatar user={user} />
            <div className="recipientDetails">
              <span>{user.firstName}</span>
              <span className="status">{formatStatusMessage(user)}</span>
            </div>
          </div>
          {user.id === group?.owner.id && <Crown color="#ffbf00" />}
        </GroupRecipientSidebarItem>
      ))}
    </>
  );
};
