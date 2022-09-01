import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../utils/types';

export interface MessageContainerState {
  selectedMessage?: MessageType;
  messageBeingEdited?: MessageType;
  isEditingMessage: boolean;
}

const initialState: MessageContainerState = {
  isEditingMessage: false,
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
      if (state.messageBeingEdited)
        state.messageBeingEdited.content = action.payload;
    },
    resetMessageContainer: (state) => {
      state.isEditingMessage = false;
      state.messageBeingEdited = undefined;
      state.selectedMessage = undefined;
    },
  },
});

export const {
  setIsEditing,
  setMessageBeingEdited,
  setSelectedMessage,
  editMessageContent,
  resetMessageContainer,
} = messageContainerSlice.actions;

export default messageContainerSlice.reducer;
