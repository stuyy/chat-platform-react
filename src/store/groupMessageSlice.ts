import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchGroupMessages as fetchGroupMessagesAPI } from '../utils/api';
import { GroupMessage, GroupMessageEventPayload } from '../utils/types';

export interface GroupMessagesState {
  messages: GroupMessage[];
}

const initialState: GroupMessagesState = {
  messages: [],
};

export const fetchGroupMessagesThunk = createAsyncThunk(
  'groupMessages/fetch',
  (id: number) => fetchGroupMessagesAPI(id)
);

export const groupMessagesSlice = createSlice({
  name: 'groupMessages',
  initialState,
  reducers: {
    addGroupMessage: (
      state,
      action: PayloadAction<GroupMessageEventPayload>
    ) => {
      const { group, message } = action.payload;
      const groupMessage = state.messages.find((gm) => gm.id === group.id);
      groupMessage?.messages.unshift(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      console.log('fetchGroupMessagesThunk.fulfilled');
      console.log(action.payload.data);
      const index = state.messages.findIndex((gm) => gm.id === id);
      const exists = state.messages.find((gm) => gm.id === id);
      exists
        ? (state.messages[index] = action.payload.data)
        : state.messages.push(action.payload.data);
    });
  },
});

const selectGroupMessages = (state: RootState) => state.groupMessages.messages;
const selectGroupMessageId = (state: RootState, id: number) => id;

export const selectGroupMessage = createSelector(
  [selectGroupMessages, selectGroupMessageId],
  (groupMessages, id) => groupMessages.find((gm) => gm.id === id)
);

export const { addGroupMessage } = groupMessagesSlice.actions;

export default groupMessagesSlice.reducer;
