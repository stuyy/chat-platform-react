import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType, Points } from '../utils/types';

export interface MessageContainerState {
  selectedMessage?: MessageType;
  messageBeingEdited?: MessageType;
  isEditingMessage: boolean;
  showContextMenu: boolean;
  points: Points;
}

const initialState: MessageContainerState = {
  isEditingMessage: false,
  showContextMenu: false,
  points: { x: 0, y: 0 },
};

export const messageContainerSlice = createSlice({
  name: 'messageContainer',
  initialState,
  reducers: {
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;
    },
    setMessageBeingEdited: (state, action) => {
      state.messageBeingEdited = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditingMessage = action.payload;
    },
    editMessageContent: (state, action) => {
      if (state.messageBeingEdited) state.messageBeingEdited.content = action.payload;
    },
    resetMessageContainer: (state) => {
      state.isEditingMessage = false;
      state.messageBeingEdited = undefined;
      state.selectedMessage = undefined;
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showContextMenu = action.payload;
    },
    setContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
    },
  },
});

export const {
  setIsEditing,
  setMessageBeingEdited,
  setSelectedMessage,
  editMessageContent,
  resetMessageContainer,
  toggleContextMenu,
  setContextMenuLocation,
} = messageContainerSlice.actions;

export default messageContainerSlice.reducer;
