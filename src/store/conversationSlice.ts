import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ConversationMessage, ConversationType } from '../utils/types';
import { getConversationMessages, getConversations } from '../utils/api';

export interface ConversationsState {
  conversations: ConversationType[];
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  messages: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  'conversations/fetch',
  async () => {
    return getConversations();
  }
);

export const fetchMessagesThunk = createAsyncThunk(
  'messages/fetch',
  async (id: number) => {
    return getConversationMessages(id);
  }
);

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log('addConversation');
      // state.conversations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id, messages } = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        const exists = state.messages.find((cm) => cm.id === id);
        if (exists) {
          console.log('exists');
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
      })
      .addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
