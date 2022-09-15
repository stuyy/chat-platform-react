import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SystemMessageType } from '../../utils/types';

export interface SystemMessageState {
  messages: SystemMessageType[];
  messageCounter: number;
}

const initialState: SystemMessageState = {
  messages: [],
  messageCounter: 0,
};

export const systemMessagesSlice = createSlice({
  name: 'systemMessages',
  initialState,
  reducers: {
    addSystemMessage: (state, action: PayloadAction<SystemMessageType>) => {
      state.messageCounter++;
      state.messages.push(action.payload);
    },
    clearAllMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addSystemMessage, clearAllMessages } = systemMessagesSlice.actions;

export default systemMessagesSlice.reducer;
