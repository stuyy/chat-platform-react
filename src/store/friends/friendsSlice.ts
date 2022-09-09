import { createSlice } from '@reduxjs/toolkit';

import { Friend } from '../../utils/types';
import { fetchFriendsThunk } from './friendsThunk';

export interface FriendsState {
  friends: Friend[];
}

const initialState: FriendsState = {
  friends: [],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchFriendsThunk.fulfilled, (state, action) => {
      console.log('fetchFriendsThunk.fulfilled');
      console.log(action.payload.data);
      state.friends = action.payload.data;
    }),
});

export const {} = friendsSlice.actions;
export default friendsSlice.reducer;
