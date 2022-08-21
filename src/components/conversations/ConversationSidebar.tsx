import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarItem,
  ConversationSidebarStyle,
} from '../../utils/styles';
import { TbEdit } from 'react-icons/tb';
import { FC } from 'react';
import { ConversationType } from '../../utils/types';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  conversations: ConversationType[];
};

export const ConversationSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();

  return (
    <ConversationSidebarStyle>
      <ConversationSidebarHeader>
        <h1>Conversations</h1>
        <TbEdit size={40} />
      </ConversationSidebarHeader>
      <ConversationSidebarContainer>
        {conversations.map((conversation) => (
          <ConversationSidebarItem
            onClick={() => navigate(`/conversations/${conversation.id}`)}
          >
            <div className={styles.conversationAvatar}></div>
            <div>
              <span className={styles.conversationName}>
                {conversation.name}
              </span>
              <span className={styles.conversationLastMessage}>
                {conversation.lastMessage}
              </span>
            </div>
          </ConversationSidebarItem>
        ))}
      </ConversationSidebarContainer>
    </ConversationSidebarStyle>
  );
};
