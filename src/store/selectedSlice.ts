import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { ConversationType } from '../utils/types';
import { deleteGroupMessageThunk } from './groupMessageSlice';

export interface SelectedTypeState {
  type: ConversationType;
}

const initialState: SelectedTypeState = {
  type: 'private',
};

export const selectedTypeSlice = createSlice({
  name: 'selectedType',
  initialState,
  reducers: {
    updateType: (state, action: PayloadAction<ConversationType>) => {
      state.type = action.payload;
    },
  },
});

export const selectType = (state: RootState) =>
  state.selectedConversationType.type;

export const { updateType } = selectedTypeSlice.actions;

export default selectedTypeSlice.reducer;
