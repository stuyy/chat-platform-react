import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Friend, FriendRequest, Points } from '../../utils/types';
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  createFriendRequestThunk,
  fetchFriendRequestThunk,
  fetchFriendsThunk,
  rejectFriendRequestThunk,
  removeFriendThunk,
} from './friendsThunk';

export interface FriendsState {
  friends: Friend[];
  friendRequests: FriendRequest[];
  onlineFriends: Friend[];
  offlineFriends: Friend[];
  showContextMenu: boolean;
  selectedFriendContextMenu?: Friend;
  points: Points;
}

const initialState: FriendsState = {
  friends: [],
  friendRequests: [],
  onlineFriends: [],
  offlineFriends: [],
  showContextMenu: false,
  points: { x: 0, y: 0 },
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      state.friendRequests.push(action.payload);
    },
    removeFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      const { id } = action.payload;
      state.friendRequests = state.friendRequests.filter(
        (friendRequest) => friendRequest.id !== id
      );
    },
    removeFriend: (state, action: PayloadAction<Friend>) => {
      console.log('removeFriend reducer');
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload.id
      );
    },
    setOnlineFriends: (state, action: PayloadAction<Friend[]>) => {
      console.log('setFriends Reducer');
      state.onlineFriends = action.payload;
    },
    setOfflineFriends: (state) => {
      console.log('setOfflineFriends Reducer');
      console.log(state.onlineFriends);
      state.offlineFriends = state.friends.filter(
        (friend) =>
          !state.onlineFriends.find(
            (onlineFriend) => onlineFriend.id === friend.id
          )
      );
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showContextMenu = action.payload;
    },
    setSelectedFriend: (state, action: PayloadAction<Friend>) => {
      state.selectedFriendContextMenu = action.payload;
    },
    setContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        console.log('fetchFriendsThunk.fulfilled');
        console.log(action.payload.data);
        state.friends = action.payload.data;
      })
      .addCase(fetchFriendRequestThunk.fulfilled, (state, action) => {
        console.log('fetchFriendRequestsThunk.fulfilled');
        state.friendRequests = action.payload.data;
      })
      .addCase(createFriendRequestThunk.fulfilled, (state, action) => {
        console.log('createFriendRequestThunk.fulfilled');
        state.friendRequests.push(action.payload.data);
      })
      .addCase(createFriendRequestThunk.rejected, (state, action) => {
        console.log('createFriendRequestThunk.rejected');
      })
      .addCase(cancelFriendRequestThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      })
      .addCase(acceptFriendRequestThunk.fulfilled, (state, action) => {
        console.log('acceptFriendRequestThunk.fulfilled');
        const {
          friendRequest: { id },
        } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      })
      .addCase(rejectFriendRequestThunk.fulfilled, (state, action) => {
        console.log('rejectFriendRequestThunk.fulfilled');
        const { id } = action.payload.data;
        state.friendRequests = state.friendRequests.filter(
          (friendRequest) => friendRequest.id !== id
        );
      })
      .addCase(removeFriendThunk.fulfilled, (state, action) => {
        console.log('rejectFriendRequestThunk.fulfilled');
        state.friends = state.friends.filter(
          (friend) => friend.id !== action.payload.data.id
        );
      }),
});

export const {
  addFriendRequest,
  removeFriendRequest,
  setOnlineFriends,
  setOfflineFriends,
  toggleContextMenu,
  setContextMenuLocation,
  setSelectedFriend,
  removeFriend,
} = friendsSlice.actions;
export default friendsSlice.reducer;
