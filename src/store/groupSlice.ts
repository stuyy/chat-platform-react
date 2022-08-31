import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGroups as fetchGroupsAPI } from '../utils/api';
import { Group } from '../utils/types';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
  return fetchGroupsAPI();
});

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.groups = action.payload.data;
      console.log(state.groups);
    });
  },
});

export const {} = groupsSlice.actions;

export default groupsSlice.reducer;
