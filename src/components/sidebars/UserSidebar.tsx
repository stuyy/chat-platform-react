import { useState, useContext } from 'react';
import { UserAvatar, UserSidebarStyle } from '../../utils/styles';
import styles from './index.module.scss';
import avatar from '../../__assets__/default_avatar.jpg';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { CDN_URL, userSidebarItems } from '../../utils/constants';
import { UserSidebarItem } from './items/UserSidebarItem';
import { AuthContext } from '../../utils/context/AuthContext';

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserAvatar
          src={
            user?.profile?.avatar
              ? CDN_URL.BASE.concat(user?.profile.avatar)
              : avatar
          }
          alt="avatar"
          width="55px"
        />
        <hr className={styles.hr} />
        {userSidebarItems.map((item) => (
          <UserSidebarItem item={item} />
        ))}
      </UserSidebarStyle>
    </>
  );
};
