import { Outlet } from 'react-router-dom';
import { UserSidebar } from '../components/sidebars/UserSidebar';
import { LayoutPage } from '../utils/styles';

export const AppPage = () => {
  return (
    <LayoutPage>
      <UserSidebar />
      <Outlet />
    </LayoutPage>
  );
};
