import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSettingSidebarIcon } from '../../../utils/helpers';
import { SettingsSidebarItemStyle } from '../../../utils/styles/settings';
import { SettingsItemType } from '../../../utils/types';

type Props = {
  item: SettingsItemType;
};

export const SettingsSidebarItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const Icon = getSettingSidebarIcon(item.id);
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;

  return (
    <SettingsSidebarItemStyle
      onClick={() => navigate(item.pathname)}
      isActive={item.pathname === pathname}
    >
      <div className="settingItem">
        <Icon size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        <span>{item.label}</span>
      </div>
    </SettingsSidebarItemStyle>
  );
};
