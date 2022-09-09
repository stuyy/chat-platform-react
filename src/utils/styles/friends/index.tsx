import styled, { css } from 'styled-components';
import { FriendsNavbarItemProps } from '../styleTypes';

export const FriendsPageStyle = styled.div`
  background-color: #101010;
  height: 100%;
  width: 100%;
`;

export const FriendsNavbar = styled.nav`
  display: flex;
  align-items: center;
  gap: 80px;
  font-size: 20px;
  padding: 48px 60px;
  border-bottom: 1px solid #30303035;
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
