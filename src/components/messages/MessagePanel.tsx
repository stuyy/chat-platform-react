import React, { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { postNewMessage } from '../../utils/api';
import { AuthContext } from '../../utils/context/AuthContext';
import { getRecipientFromConversation } from '../../utils/helpers';
import {
  MessagePanelBody,
  MessagePanelStyle,
  MessageTypingStatus,
} from '../../utils/styles';
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
  const [content, setContent] = useState('');
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const recipient = getRecipientFromConversation(conversation, user);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    const conversationId = parseInt(id);
    try {
      await postNewMessage(conversationId, { content });
      setContent('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <MessagePanelHeader />
      <MessagePanelStyle>
        <MessagePanelBody>
          <MessageContainer />
          <div>
            <MessageInputField
              content={content}
              setContent={setContent}
              sendMessage={sendMessage}
              sendTypingStatus={sendTypingStatus}
            />
            <MessageTypingStatus>
              {isRecipientTyping ? `${recipient?.firstName} is typing...` : ''}
            </MessageTypingStatus>
          </div>
        </MessagePanelBody>
      </MessagePanelStyle>
    </>
  );
};
