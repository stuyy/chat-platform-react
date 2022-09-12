export type PageProps = Partial<{
  display: string;
  justifyContent: string;
  alignItems: string;
}>;

export type InputContainerProps = Partial<{
  backgroundColor: string;
}>;

export type MessageItemContentProps = Partial<{
  padding: string;
}>;

export type ContextMenuProps = {
  top: number;
  left: number;
};

export type ConversationSelectedProps = {
  selected: boolean;
};

export type SidebarItemProps = Partial<{
  active: boolean;
}>;

export type CharacterLimitProps = {
  atMaxLength: boolean;
};

export type MessageInputContainerProps = {
  isMultiLine: boolean;
};

export type ConversationSidebarItemProps = {
  selected: boolean;
};

export type FriendsNavbarItemProps = {
  active: boolean;
};

export type FlexProps = Partial<{
  justifyContent: string;
  alignItems: string;
  flexDirection: string;
}>;

export type FriendRequestItemIconProps = Partial<{
  isAccept: boolean;
}>;

export type SettingsSidebarItemProps = {
  isActive: boolean;
};

export type UserBannerProps = Partial<{
  backgroundUrl: string;
  backgroundColor: string;
}>;
