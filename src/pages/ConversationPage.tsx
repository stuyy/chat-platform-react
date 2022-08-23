import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { AppDispatch, RootState } from '../store';
import { fetchConversationsThunk } from '../store/conversationSlice';
import { Page } from '../utils/styles';
import { ConversationType } from '../utils/types';

export const ConversationPage = () => {
  const { id } = useParams();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const conversationsState = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  useEffect(() => {
    console.log('Fetching Conversations in ConversationPage');
    console.log(conversationsState.find((c) => c.id === 15));
    dispatch(fetchConversationsThunk());
  }, []);

  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
