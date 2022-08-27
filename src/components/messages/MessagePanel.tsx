import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postNewMessage } from '../../utils/api';
import { MessagePanelBody, MessagePanelStyle } from '../../utils/styles';
import { MessageType } from '../../utils/types';
import { MessageContainer } from './MessageContainer';
import { MessageInputField } from './MessageInputField';
import { MessagePanelHeader } from './MessagePanelHeader';

type Props = {
  sendTypingStatus: () => void;
};
export const MessagePanel: FC<Props> = ({ sendTypingStatus }) => {
  const [content, setContent] = useState('');
  const { id } = useParams();
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(id);
    console.log('Sending Message', content);
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
          <MessageInputField
            content={content}
            setContent={setContent}
            sendMessage={sendMessage}
            sendTypingStatus={sendTypingStatus}
          />
        </MessagePanelBody>
      </MessagePanelStyle>
    </>
  );
};
