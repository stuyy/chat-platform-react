import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromConversation } from '../../utils/helpers';
import { ConversationSidebarItemStyle } from '../../utils/styles';
import { Conversation } from '../../utils/types';

import styles from './index.module.scss';

type Props = {
  conversation: Conversation;
};

export const ConversationSidebarItem: React.FC<Props> = ({ conversation }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const recipient = getRecipientFromConversation(conversation, user);
  return (
    <>
      <ConversationSidebarItemStyle
        onClick={() => navigate(`/conversations/${conversation.id}`)}
      >
        <div className={styles.conversationAvatar}></div>
        <div className={styles.contentContainer}>
          <span className={styles.conversationName}>
            {`${recipient?.firstName} ${recipient?.lastName}`}
          </span>
          <span className={styles.conversationLastMessage}>
            {conversation.lastMessageSent?.content}
          </span>
        </div>
      </ConversationSidebarItemStyle>
      <hr className={styles.hr} />
    </>
  );
};
