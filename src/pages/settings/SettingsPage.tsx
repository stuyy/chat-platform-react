import { Outlet } from 'react-router-dom';
import { SettingsSidebar } from '../../components/sidebars/settings/SettingsSidebar';

export const SettingsPage = () => {
  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  );
};
