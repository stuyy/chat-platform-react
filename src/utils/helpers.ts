import {
  ArrowCycle,
  ChatDots,
  Crown,
  Minus,
  Person,
  PersonCross,
  Gear,
} from 'akar-icons';
import {
  IoIosPerson,
  IoIosNotifications,
  IoIosLock,
  IoMdInfinite,
  IoMdColorPalette,
} from 'react-icons/io';
import {
  Conversation,
  Group,
  SettingsSidebarRouteType,
  User,
  UserContextMenuActionType,
  UserSidebarRouteType,
} from './types';

export const getRecipientFromConversation = (
  conversation?: Conversation,
  user?: User
) => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};

export const getUserContextMenuIcon = (type: UserContextMenuActionType) => {
  switch (type) {
    case 'kick':
      return { icon: PersonCross, color: '#ff0000' };
    case 'transfer_owner':
      return { icon: Crown, color: '#FFB800' };
    default:
      return { icon: Minus, color: '#7c7c7c' };
  }
};

export const isGroupOwner = (user?: User, group?: Group) =>
  user?.id === group?.owner.id;

export const getUserSidebarIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case 'conversations':
      return ChatDots;
    case 'friends':
      return Person;
    case 'connections':
      return ArrowCycle;
    case 'settings':
      return Gear;
    default:
      return ChatDots;
  }
};

export const getSettingSidebarIcon = (id: SettingsSidebarRouteType) => {
  switch (id) {
    case 'profile':
      return IoIosPerson;
    case 'security':
      return IoIosLock;
    case 'notifications':
      return IoIosNotifications;
    case 'integrations':
      return IoMdInfinite;
    case 'appearance':
      return IoMdColorPalette;
  }
};

