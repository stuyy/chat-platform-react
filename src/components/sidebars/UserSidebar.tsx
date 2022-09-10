import { useState } from 'react';
import { UserAvatar, UserSidebarStyle } from '../../utils/styles';
import styles from './index.module.scss';
import avatar from '../../__assets__/avatar_1.png';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { userSidebarItems } from '../../utils/constants';
import { UserSidebarItem } from './items/UserSidebarItem';

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserAvatar src={avatar} alt="avatar" width="55px" />
        <hr className={styles.hr} />
        {userSidebarItems.map((item) => (
          <UserSidebarItem item={item} />
        ))}
      </UserSidebarStyle>
    </>
  );
};
