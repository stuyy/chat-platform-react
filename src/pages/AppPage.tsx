import { Outlet } from 'react-router-dom';
import { ConversationSidebar } from '../components/sidebars/ConversationSidebar';
import { UserSidebar } from '../components/sidebars/UserSidebar';
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
