import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { friendsNavbarItems } from '../../utils/constants';
import {
  FriendsNavbar,
  FriendsNavbarItem,
  FriendsPageStyle,
} from '../../utils/styles/friends';
import { FriendsPage } from './FriendsPage';

export const FriendsLayoutPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <FriendsPageStyle>
      <FriendsNavbar>
        {friendsNavbarItems.map((item) => (
          <FriendsNavbarItem
            key={item.id}
            active={pathname === item.pathname}
            onClick={() => navigate(item.pathname)}
          >
            {item.label}
          </FriendsNavbarItem>
        ))}
      </FriendsNavbar>
      {pathname === '/friends' && <FriendsPage />}
      <Outlet />
    </FriendsPageStyle>
  );
};
