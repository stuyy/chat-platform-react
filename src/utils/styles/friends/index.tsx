import styled, { css } from 'styled-components';
import {
  FriendRequestItemIconProps,
  FriendsNavbarItemProps,
} from '../styleTypes';

export const FriendsPageStyle = styled.div`
  background-color: #101010;
  height: 100%;
  width: 100%;
`;

export const FriendsNavbar = styled.nav`
  display: flex;
  font-size: 20px;
  padding: 48px 60px;
  height: 150px;
  box-sizing: border-box;
  border-bottom: 1px solid #30303035;
  justify-content: space-between;
  & .navLinks {
    display: flex;
    align-items: center;
    gap: 80px;
  }
`;

export const FriendsNavbarItem = styled.span<FriendsNavbarItemProps>`
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      text-decoration: underline;
      text-underline-offset: 14px;
    `}
`;

export const FriendListContainer = styled.div`
  padding: 40px 60px;
  box-sizing: border-box;
  overflow-y: scroll;
  height: calc(100% - 150px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FriendListItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid #181818;
  & .avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #227eff;
  }
  &:last-child {
    border-bottom: unset;
  }
`;

export const FriendRequestItemContainer = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #1f1f1fbf;
  display: flex;
  justify-content: space-between;
  & .avatar {
    height: 50px;
    width: 50px;
    background-color: #227eff;
    border-radius: 50%;
  }

  & .user {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  & .name {
    display: flex;
    flex-direction: column;
    font-size: 20px;
  }

  & .status {
    font-size: 14px;
    font-style: italic;
    font-weight: 600;
    color: #626262;
  }

  & .icons {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  :last-child {
    border-bottom: unset;
  }
`;

export const FriendRequestItemIcon = styled.div<FriendRequestItemIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #171717;
  border-radius: 50%;
  padding: 10px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #161616;
    color: ${({ isAccept }) => (isAccept ? '#00ff04' : '#ff3a3a')};
  }
`;
