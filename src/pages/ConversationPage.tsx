import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { getAuthUser, getConversations } from '../utils/api';
import { Page } from '../utils/styles';
import { ConversationType } from '../utils/types';

export const ConversationPage = () => {
  const { id } = useParams();
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    getConversations()
      .then(({ data }) => {
        setConversations(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
