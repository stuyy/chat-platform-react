import { AxiosError } from 'axios';
import React, { FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { selectGroupById } from '../../store/groupSlice';
import { createMessageThunk } from '../../store/messages/messageThunk';
import { setRateLimitStatus } from '../../store/rate-limit/rateLimitSlice';
import { createMessage, postGroupMessage } from '../../utils/api';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromConversation } from '../../utils/helpers';
import { useToast } from '../../utils/hooks/useToast';
import {
  MessagePanelBody,
  MessagePanelFooter,
  MessagePanelStyle,
  MessageTypingStatus,
} from '../../utils/styles';
import { MessageAttachmentContainer } from './attachments/MessageAttachmentContainer';
import { MessageContainer } from './MessageContainer';
import { MessageInputField } from './MessageInputField';
import { MessagePanelHeader } from './MessagePanelHeader';

type Props = {
  sendTypingStatus: () => void;
  isRecipientTyping: boolean;
};
export const MessagePanel: FC<Props> = ({
  sendTypingStatus,
  isRecipientTyping,
}) => {
  const toastId = 'rateLimitToast';
  const [content, setContent] = useState('');
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const { error } = useToast({ theme: 'dark' });
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(routeId!))
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(routeId!))
  );
  const selectedType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const recipient = getRecipientFromConversation(conversation, user);

  const sendMessage = async () => {
    const trimmedContent = content.trim();
    if (!routeId || !content.trim()) return;
    const params = { id: parseInt(routeId), content: trimmedContent };
    try {
      selectedType === 'private'
        ? await createMessage(params)
        : await postGroupMessage(params);
      setContent('');
    } catch (err) {
      (err as AxiosError).response?.status === 429 &&
        error('You are rate limited', { toastId });
    }
  };
  return (
    <>
      <MessagePanelStyle>
        <MessagePanelHeader />
        <MessagePanelBody>
          <MessageContainer />
        </MessagePanelBody>
        <MessagePanelFooter>
          {attachments.length > 0 && <MessageAttachmentContainer />}
          <MessageInputField
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
            placeholderName={
              selectedType === 'group'
                ? group?.title || 'Group'
                : recipient?.firstName || 'user'
            }
          />
          <MessageTypingStatus>
            {isRecipientTyping ? `${recipient?.firstName} is typing...` : ''}
          </MessageTypingStatus>
        </MessagePanelFooter>
      </MessagePanelStyle>
    </>
  );
};
