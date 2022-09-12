import { settingsItems } from '../../../utils/constants';
import {
  SettingsSidebarHeader,
  SettingsSidebarItemContainer,
  SettingsSidebarStyle,
} from '../../../utils/styles/settings';
import { SettingsSidebarItem } from '../items/SettingsSidebarItem';

export const SettingsSidebar = () => {
  return (
    <SettingsSidebarStyle>
      <SettingsSidebarHeader>
        <span>Settings</span>
      </SettingsSidebarHeader>
      <SettingsSidebarItemContainer>
        {settingsItems.map((item) => (
          <SettingsSidebarItem key={item.id} item={item} />
        ))}
      </SettingsSidebarItemContainer>
    </SettingsSidebarStyle>
  );
};
