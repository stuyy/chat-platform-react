import { ChatAdd } from 'akar-icons';
import { useState } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SidebarContainerStyle } from '../../utils/styles';
import {
  ConversationSearchbar,
  ConversationSidebarHeader,
  ConversationSidebarStyle,
  ConversationsScrollableContainer,
} from '../../utils/styles';
import { ConversationSidebarItem } from '../conversations/ConversationSidebarItem';
import { ConversationTab } from '../conversations/ConversationTab';
import { GroupSidebarItem } from '../groups/GroupSidebarItem';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { CreateGroupModal } from '../modals/CreateGroupModal';

export const ConversationSidebar = () => {
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const groups = useSelector((state: RootState) => state.groups.groups);
  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && conversationType === 'private' && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === 'group' && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <ConversationSidebarStyle>
        <ConversationSidebarHeader>
          <ConversationSearchbar placeholder="Search for Conversations" />
          {conversationType === 'private' ? (
            <ChatAdd
              size={30}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          ) : (
            <AiOutlineUsergroupAdd
              size={30}
              cursor="pointer"
              onClick={() => setShowModal(true)}
            />
          )}
        </ConversationSidebarHeader>
        <ConversationTab />
        <ConversationsScrollableContainer>
          <SidebarContainerStyle>
            {conversationType === 'private'
              ? conversations.map((conversation) => (
                  <ConversationSidebarItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                ))
              : groups.map((group) => (
                  <GroupSidebarItem key={group.id} group={group} />
                ))}
          </SidebarContainerStyle>
        </ConversationsScrollableContainer>
        <footer></footer>
      </ConversationSidebarStyle>
    </>
  );
};
