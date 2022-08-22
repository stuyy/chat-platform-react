import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../components/messages/MessagePanel';
import { getConversationMessages } from '../utils/api';
import { AuthContext } from '../utils/context/AuthContext';
import { ConversationChannelPageStyle } from '../utils/styles';
import { MessageType } from '../utils/types';

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then(({ data }) => {
        console.log(data);
        setMessages(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
