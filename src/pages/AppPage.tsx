import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ConversationSidebar } from '../components/sidebars/ConversationSidebar';
import { UserSidebar } from '../components/sidebars/UserSidebar';
import { AppDispatch } from '../store';
import { fetchConversationsThunk } from '../store/conversationSlice';
import { fetchGroupsThunk } from '../store/groupSlice';
import { Page } from '../utils/styles';

export const AppPage = () => {
  return (
    <Page>
      <UserSidebar />
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
};
