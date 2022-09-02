import styled, { css } from 'styled-components';
import {
  ContextMenuProps,
  ConversationSelectedProps,
  InputContainerProps,
  MessageItemContentProps,
  PageProps,
} from './styleTypes';

export const SIDEBAR_WIDTH = 400;

export const InputField = styled.input`
  font-family: 'Inter';
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
`;

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${(prop) => prop.backgroundColor || '#131313'};
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  outline: none;
  border: none;
  font-family: 'Inter';
  font-size: 16px;
  background-color: #2b09ff;
  color: #fff;
  border-radius: 10px;
  padding: 25px 0;
  font-weight: 500;
  transition: 250ms background-color ease;
  &:hover {
    cursor: pointer;
    background-color: #3415ff;
  }
  &:active {
    background-color: #3a1cff;
  }
`;

export const Page = styled.div<PageProps>`
  background-color: #1a1a1a;
  height: 100%;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationSidebarStyle = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #1a1a1a;
  border-right: 1px solid #5454543d;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    /* width: 10px;
    height: 5px; */
  }
  /* &::-webkit-scrollbar-thumb {
    background-color: #2d2d2d;
  } */
`;

export const ConversationSidebarHeader = styled.header`
  position: fixed;
  width: ${SIDEBAR_WIDTH}px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  background-color: #151515;
  height: 100px;
  border-bottom: 1px solid #5454543d;
  & h1 {
    font-weight: 400;
  }
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH + 90}px;
`;

export const ConversationSidebarContainer = styled.div`
  margin-top: 100px;
`;

export const ConversationSidebarItemStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000c4;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContainerStyle = styled.div`
  position: relative;
  background-color: #121212;
  width: 650px;
  box-sizing: border-box;
  border-radius: 10px;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  & h2 {
    font-weight: 500;
    margin: 0;
  }
`;

export const ModalContentBodyStyle = styled.div`
  padding: 24px;
  position: relative;
`;

export const TextField = styled.textarea`
  font-family: 'Inter';
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessagePanelHeaderStyle = styled.header`
  background-color: #141414;
  border-bottom: 1px solid #5454543d;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
`;

export const MessagePanelStyle = styled.div`
  position: relative;
  background: #151515;
  height: calc(100% - 90px);
  box-sizing: border-box;
  border-left: 1px solid #5454543d;
`;

export const MessagePanelBody = styled.div`
  height: calc(100%);
  display: flex;
  flex-direction: column;
  padding: 32px 32px 10px 32px;
  padding-top: 0;
  box-sizing: border-box;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageInputContainer = styled.div`
  box-sizing: border-box;
  background-color: #101010;
  border-radius: 5px;
  width: 100%;
  padding: 24px 32px;
`;

export const MessageInput = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  color: #454545;
  font-family: 'Inter';
  box-sizing: border-box;
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
  word-break: break-all;
`;

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #0094fd;
`;

export const MessageItemDetails = styled.div`
  flex: 1;
`;

export const MessageItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .time {
    color: #6d6d6d;
    font-size: 14px;
    font-weight: bold;
  }
  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MessageItemContent = styled.div<MessageItemContentProps>`
  padding: ${({ padding }) => padding};
  width: 100%;
`;

export const ContextMenuStyle = styled.div<ContextMenuProps>`
  border-radius: 8px;
  box-sizing: border-box;
  position: fixed;
  width: 200px;
  background-color: #252525;
  ${(props) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}

  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px;
  }

  ul li {
    padding: 14px 16px;
    border-radius: 8px;
  }

  ul li:hover {
    cursor: pointer;
    background-color: #1f1f1f;
  }
`;

export const MessageTypingStatus = styled.div`
  width: 100%;
  font-size: 15px;
  color: #adadad;
  box-sizing: border-box;
  margin-top: 10px;
  height: 20px;
`;

export const EditMessageInputField = styled.input`
  outline: none;
  border: none;
  background-color: #222;
  color: #bababa;
  font-family: 'Inter';
  box-sizing: border-box;
  font-size: 15px;
  padding: 18px 22px;
  border-radius: 5px;
  margin: 4px 0;
  width: 100%;
`;

export const EditMessageActionsContainer = styled.div`
  font-size: 12px;
  & span {
    color: #1d77ff;
  }
`;

export const ConversationSelectedStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 20px 32px;
  background-color: #0f0f0f;
  border-bottom: 1px solid #4343435f;
  box-sizing: border-box;
`;

export const ConversationSelectedItem = styled.div<ConversationSelectedProps>`
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  background-color: #212121;
  color: #f0f0f0;
  ${(props) =>
    props.selected &&
    css`
      background-color: #444444;
    `};
`;
export const UserAvatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background-color: #2727ff;
`;

export const UserSidebarStyle = styled.aside`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 90px;
  background-color: #121212;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
`;

export const UserSidebarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 20px 0;
`;

export const UserSidebarTopIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
  gap: 40px;
`;

export const UserSidebarBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConversationSidebarStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  margin-left: 90px;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #111111;
  border-right: 1px solid #5454543d;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    /* width: 10px;
    height: 5px; */
  }
`;
export const ConversationSidebarHeaderStyle = styled.header`
  padding: 24px 32px;
  box-sizing: border-box;
  position: fixed;
  width: ${SIDEBAR_WIDTH}px;
  top: 0;
  left: 90px;
  z-index: 9;
  background-color: inherit;
`;

export const ConversationSearchbar = styled.input`
  box-sizing: border-box;
  background-color: #202020;
  outline: none;
  border: none;
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  padding: 12px 18px;
  color: #6b6b6b;
  border-radius: 5px;
  width: 100%;
`;

export const ConversationTabStyle = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  border-top: 2px solid #2727275f;
  margin-top: 20px;
  padding-top: 20px;
`;

export const ConversationTabItemStyle = styled.section<ConversationSelectedProps>`
  background-color: #212121;
  padding: 10px 32px;
  font-size: 14px;
  border-radius: 5px;
  ${(props) =>
    props.selected &&
    css`
      background-color: #303030;
    `};
`;

export const SidebarContainerStyle = styled.div``;

export const SidebarContainerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 32px;
  margin: 18px 0;
`;

export const SidebarContainerItemContent = styled.div`
  & .name {
    display: block;
    font-size: 18px;
    font-weight: 600;
  }
  & .lastMessage {
    display: block;
    font-size: 16px;
    color: #797979;
    font-weight: 500;
  }
`;

export const RecipientResultContainer = styled.div`
  position: absolute;
  background-color: #161616;
  right: 0;
  left: 0;
  margin: 4px 24px;
  height: 190px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
