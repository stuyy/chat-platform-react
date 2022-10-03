import { useState, useContext } from 'react';
import {
  UserSidebarFooter,
  UserSidebarHeader,
  UserSidebarScrollableContainer,
  UserSidebarStyle,
} from '../../utils/styles';
import { userSidebarItems } from '../../utils/constants';
import { UserSidebarItem } from './items/UserSidebarItem';
import { AuthContext } from '../../utils/context/AuthContext';
import { UpdatePresenceStatusModal } from '../modals/UpdatePresenceStatusModal';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { UserAvatar } from '../users/UserAvatar';
import { logoutUser as logoutUserAPI } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    logoutUserAPI().finally(() => navigate('/login', { replace: true }));
  };

  return (
    <>
      {showModal && <UpdatePresenceStatusModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserSidebarHeader>
          <UserAvatar user={user!} onClick={() => setShowModal(true)} />
        </UserSidebarHeader>
        <UserSidebarScrollableContainer>
          {userSidebarItems.map((item) => (
            <UserSidebarItem item={item} />
          ))}
        </UserSidebarScrollableContainer>

        <UserSidebarFooter>
          <RiLogoutCircleLine size={30} onClick={() => logoutUser()} />
        </UserSidebarFooter>
      </UserSidebarStyle>
    </>
  );
};
