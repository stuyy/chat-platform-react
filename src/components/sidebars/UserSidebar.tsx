import {
  UserAvatar,
  UserSidebarBottom,
  UserSidebarStyle,
  UserSidebarTop,
  UserSidebarTopIcons,
} from '../../utils/styles';
import styles from './index.module.scss';
import { ChatAdd, Person, SignOut } from 'akar-icons';
import avatar from '../../__assets__/avatar_1.png';

export const UserSidebar = () => {
  return (
    <UserSidebarStyle>
      <UserSidebarTop>
        <UserAvatar src={avatar} width="55px" />
        <hr className={styles.hr} />
        <UserSidebarTopIcons>
          <ChatAdd size={38} />
          <Person size={38} />
        </UserSidebarTopIcons>
      </UserSidebarTop>
      <UserSidebarBottom>
        <SignOut size={38} />
      </UserSidebarBottom>
    </UserSidebarStyle>
  );
};
