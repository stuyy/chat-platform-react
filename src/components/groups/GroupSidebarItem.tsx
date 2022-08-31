import { useNavigate } from 'react-router-dom';
import { ConversationSidebarItemStyle } from '../../utils/styles';
import { Group } from '../../utils/types';

import styles from './index.module.scss';

type Props = {
  group: Group;
};

export const GroupSidebarItem: React.FC<Props> = ({ group }) => {
  const navigate = useNavigate();
  return (
    <ConversationSidebarItemStyle
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      <div className={styles.groupAvatar}></div>
      <div>
        <span className={styles.groupName}>{group.title || 'Group'}</span>
        <span className={styles.groupLastMessage}>
          {group.lastMessageSent?.content}
        </span>
      </div>
    </ConversationSidebarItemStyle>
  );
};
