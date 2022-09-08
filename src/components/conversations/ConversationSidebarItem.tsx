import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromConversation } from '../../utils/helpers';
import { ConversationSidebarItemStyle } from '../../utils/styles';
import { Conversation } from '../../utils/types';
import { ItemAvatarContainer } from '../messages/AvatarContainer';

import styles from './index.module.scss';

type Props = {
  conversation: Conversation;
};

export const ConversationSidebarItem: React.FC<Props> = ({ conversation }) => {
  const MESSAGE_LENGTH_MAX = 50;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const recipient = getRecipientFromConversation(conversation, user);
  const lastMessageContent = () => {
    const { lastMessageSent } = conversation;
    if (lastMessageSent)
      return lastMessageSent.content.length >= MESSAGE_LENGTH_MAX
        ? lastMessageSent.content.slice(0, MESSAGE_LENGTH_MAX).concat('...')
        : lastMessageSent.content;
    return null;
  };

  return (
    <>
      <ConversationSidebarItemStyle
        onClick={() => navigate(`/conversations/${conversation.id}`)}
      >
        <ItemAvatarContainer 
          user={recipient}
          size={50}
        />
        <div className={styles.contentContainer}>
          <span className={styles.conversationName}>
            {`${recipient?.firstName} ${recipient?.lastName}`}
          </span>
          <span className={styles.conversationLastMessage}>
            {lastMessageContent()}
          </span>
        </div>
      </ConversationSidebarItemStyle>
      <hr className={styles.hr} />
    </>
  );
};
