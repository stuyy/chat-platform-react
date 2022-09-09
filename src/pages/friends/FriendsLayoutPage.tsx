import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { friendsNavbarItems } from '../../utils/constants';
import { Button } from '../../utils/styles/button';
import {
  FriendsNavbar,
  FriendsNavbarItem,
  FriendsPageStyle,
} from '../../utils/styles/friends';
import { FriendsPage } from './FriendsPage';
import { AiOutlineUserAdd } from 'react-icons/ai';

export const FriendsLayoutPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <FriendsPageStyle>
      <FriendsNavbar>
        <div className="navLinks">
          {friendsNavbarItems.map((item) => (
            <FriendsNavbarItem
              key={item.id}
              active={pathname === item.pathname}
              onClick={() => navigate(item.pathname)}
            >
              {item.label}
            </FriendsNavbarItem>
          ))}
        </div>
        <Button size="sm" flex={true} variant="primary">
          <AiOutlineUserAdd size={24} />
          <span>Add Friend</span>
        </Button>
      </FriendsNavbar>
      {pathname === '/friends' && <FriendsPage />}
      <Outlet />
    </FriendsPageStyle>
  );
};
