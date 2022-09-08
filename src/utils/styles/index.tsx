import styled, { css } from 'styled-components';
import { fadeInUpwards } from './keyframes';
import {
  ContextMenuProps,
  ConversationSelectedProps,
  InputContainerProps,
  MessageItemContentProps,
  PageProps,
  SidebarItemProps,
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

export const RecipientChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  border-radius: 10px;
  gap: 4px 10px;
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
  &:disabled {
    background-color: #4937bc7c;
    color: #878787a2;
    cursor: not-allowed;
  }
`;

export const Page = styled.div<PageProps>`
  background-color: #1a1a1a;
  height: 100%;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  width: 100%;
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
  background-color: #000000e3;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

type ModalProps = Partial<{
  showModal: boolean;
}>;

export const ModalContainerStyle = styled.div<ModalProps>`
  position: relative;
  background-color: #121212;
  width: 650px;
  box-sizing: border-box;
  border-radius: 10px;
  animation: ${fadeInUpwards} 500ms ease;
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

export const MessagePanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #141414;
`;

export const MessagePanelHeaderStyle = styled.header`
  height: 90px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessagePanelBody = styled.div`
  padding: 32px 32px 0 32px;
  padding-top: 0;
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
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

export const MessagePanelFooter = styled.footer`
  padding: 0 32px 10px 32px;
  margin-top: 0;
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
  word-break: break-word;
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

export const ContextMenu = styled.ul<ContextMenuProps>`
  border-radius: 8px;
  box-sizing: border-box;
  position: fixed;
  width: 220px;
  background-color: #1a1a1a;
  ${(props) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}
  list-style-type: none;
  margin: 0;
  padding: 10px;
`;

export const ContextMenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  margin: 6px 0;
  &:hover {
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
  margin: 10px 0;
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

export const ConversationTabStyle = styled.section`
  display: flex;
  gap: 20px;
  margin: 14px 18px;
`;

export const ConversationTabItemStyle = styled.section<ConversationSelectedProps>`
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 500;
  background-color: #1f1f1f;
  text-transform: uppercase;
  padding: 8px 18px;
  border-radius: 5px;
  ${({ selected }) =>
    selected &&
    css`
      background-color: #383838;
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

export const RecipientResultContainerStyle = styled.div`
  position: absolute;
  background-color: #161616;
  right: 0;
  left: 0;
  margin: 4px 24px;
`;

export const RecipientScrollableItemContainer = styled.div`
  max-height: 200px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RecipientBottomSection = styled.div`
  border-top: 1px solid #fff;
  margin: 4px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 0;
`;

export const RecipientResultItem = styled.div`
  padding: 20px 28px;
  transition: 100ms background-color ease;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    background-color: #0c0c0c;
  }
`;

export const SelectedRecipientPillStyle = styled.div`
  border: 2px solid #323232b0;
  border-radius: 14px;
  width: fit-content;
  padding: 6px 18px;
  font-size: 14px;
  & .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }
  & .icon {
    margin-left: 10px;
    color: #656565;
    cursor: pointer;
    transition: 300ms color ease;
    :hover {
      color: #c62d2d;
    }
  }
`;

export const LayoutPage = styled.div`
  height: 100%;
  display: flex;
`;

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
  flex: 0 0 auto;
`;

export const ConversationSidebarHeader = styled.header`
  height: 90px;
  padding: 10px 30px;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  gap: 20px;
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

export const ConversationCreateButton = styled.div`
  background-color: #1a1a1a;
  padding: 10px;
  box-sizing: border-box;
`;

export const GroupRecipientsSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 350px;
  background-color: #111111;
  flex: 0 0 auto;
`;

export const GroupRecipientsSidebarHeader = styled.div`
  height: 90px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  display: flex;
  align-items: center;
  gap: 20px;
  & span {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const GroupRecipientSidebarItemContainer = styled.div`
  padding: 30px 0 0 30px;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GroupRecipientSidebarItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
`;

export const GroupHeaderIcons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const TestContextMenu = styled.div<ContextMenuProps>`
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}

  width: 200px;
  background-color: #000;
`;
