import { UserAvatar } from '../../utils/styles';
import styles from './index.module.scss';
import { ChatDots, Person, ArrowCycle } from 'akar-icons';
import avatar from '../../__assets__/avatar_1.png';
import { useState } from 'react';
import { CreateConversationModal } from '../modals/CreateConversationModal';
import { UserSidebarItem, UserSidebarStyle } from '../../utils/styles';

export const UserSidebar = () => {
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserAvatar src={avatar} alt="avatar" width="55px" />
        <hr className={styles.hr} />
        <UserSidebarItem>
          <ChatDots size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
        <UserSidebarItem active={true}>
          <Person size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
        <UserSidebarItem>
          <ArrowCycle size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        </UserSidebarItem>
      </UserSidebarStyle>
    </>
  );
};
