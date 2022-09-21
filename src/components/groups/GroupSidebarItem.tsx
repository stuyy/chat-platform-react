import { useNavigate, useParams } from 'react-router-dom';
import { CDN_URL } from '../../utils/constants';
import { ConversationSidebarItemStyle } from '../../utils/styles';
import { ContextMenuEvent, Group } from '../../utils/types';
import { PeopleGroup } from 'akar-icons';

import styles from './index.module.scss';

type Props = {
  group: Group;
  onContextMenu: (event: ContextMenuEvent, group: Group) => void;
};

export const GroupSidebarItem: React.FC<Props> = ({ group, onContextMenu }) => {
  const { id } = useParams();
  const MAX_TITLE_LENGTH = 20;
  const MAX_MESSAGE_LENGTH = 50;
  const navigate = useNavigate();

  const getTransformedTitle = () => {
    if (!group.title) {
      const usersToString = group.users
        .map((user) => user.firstName)
        .join(', ');
      return usersToString.length > MAX_TITLE_LENGTH
        ? usersToString.slice(0, MAX_TITLE_LENGTH).concat('...')
        : usersToString;
    }
    return group.title.length > MAX_TITLE_LENGTH
      ? group.title.slice(0, MAX_TITLE_LENGTH).concat('...')
      : group.title;
  };

  return (
    <ConversationSidebarItemStyle
      onClick={() => navigate(`/groups/${group.id}`)}
      onContextMenu={(e) => onContextMenu(e, group)}
      selected={parseInt(id!) === group.id}
    >
      {group.avatar ? (
        <img
          src={CDN_URL.BASE.concat(group.avatar)}
          alt="avatar"
          className={styles.groupAvatar}
        />
      ) : (
        <div className={styles.defaultGroupAvatar}>
          <PeopleGroup size={28} />
        </div>
      )}
      <div>
        <span className="title">{getTransformedTitle()}</span>
        <span className={styles.groupLastMessage}>
          {group.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  );
};
