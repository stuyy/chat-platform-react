import { AxiosError } from 'axios';
import React, { FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { selectGroupById } from '../../store/groupSlice';
import { removeAllAttachments } from '../../store/message-panel/messagePanelSlice';
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
  const dispatch = useDispatch();
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
    console.log('sendMessage');
    if (!routeId) return;
    if (!trimmedContent && !attachments.length) return;

    const params = { id: parseInt(routeId), content: trimmedContent };
    const formData = new FormData();

    formData.append('id', routeId);
    trimmedContent && formData.append('content', trimmedContent);
    attachments.forEach((attachment) =>
      formData.append('attachments', attachment.file)
    );

    try {
      selectedType === 'private'
        ? await createMessage(routeId, formData)
        : await postGroupMessage(params);
      setContent('');
      dispatch(removeAllAttachments());
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
