import { useState, useContext } from 'react';
import { UserAvatar, UserSidebarStyle } from '../../utils/styles';
import styles from './index.module.scss';
import avatar from '../../__assets__/default_avatar.jpg';
import { CDN_URL, userSidebarItems } from '../../utils/constants';
import { UserSidebarItem } from './items/UserSidebarItem';
import { AuthContext } from '../../utils/context/AuthContext';
import { UpdatePresenceStatusModal } from '../modals/UpdatePresenceStatusModal';

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      {showModal && <UpdatePresenceStatusModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserAvatar
          src={
            user?.profile?.avatar
              ? CDN_URL.BASE.concat(user?.profile.avatar)
              : avatar
          }
          alt="avatar"
          width="55px"
          onClick={() => setShowModal(true)}
        />
        <hr className={styles.hr} />
        {userSidebarItems.map((item) => (
          <UserSidebarItem item={item} />
        ))}
      </UserSidebarStyle>
    </>
  );
};
