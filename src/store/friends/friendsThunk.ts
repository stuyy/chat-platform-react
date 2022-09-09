import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFriends as fetchFriendsAPI } from '../../utils/api';

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', () =>
  fetchFriendsAPI()
);
