import styled from 'styled-components';
import { SidebarItemProps } from './styleTypes';

export const UserSidebarStyle = styled.div`
  height: 100%;
  background-color: #0b0b0b;
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  flex-direction: column;
`;

export const ConversationSidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  background-color: #111111;
`;

export const ConversationSidebarHeader = styled.header`
  height: 90px;
  padding: 10px 30px;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid #22222256;
  box-shadow: 5px 0 5px 1px #000;
  display: flex;
  align-items: center;
`;

export const ConversationsScrollableContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConversationSearchbar = styled.input`
  background-color: #1a1a1a;
  color: #e1e1e1;
  width: 100%;
  padding: 10px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: 'Inter';
  border-radius: 5px;
  box-sizing: border-box;
`;

export const ConversationTabContainer = styled.div``;

export const UserSidebarItem = styled.div<SidebarItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  box-sizing: border-box;
  background-color: ${({ active }) => active && '#1e1e1e'};
`;
