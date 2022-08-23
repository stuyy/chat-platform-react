import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../components/messages/MessagePanel';
import { getConversationMessages } from '../utils/api';
import { AuthContext } from '../utils/context/AuthContext';
import { SocketContext } from '../utils/context/SocketContext';
import { ConversationChannelPageStyle } from '../utils/styles';
import { MessageEventPayload, MessageType } from '../utils/types';

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    socket.on('connected', () => console.log('Connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      console.log('Message Received');
      const { conversation, ...message } = payload;
      setMessages((prev) => [message, ...prev]);
    });
    return () => {
      socket.off('connected');
      socket.off('onMessage');
    };
  }, []);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
