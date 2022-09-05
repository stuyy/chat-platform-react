import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Points, User } from '../utils/types';

export interface GroupRecipientSidebarState {
  showSidebar: boolean;
  showUserContextMenu: boolean;
  selectedUser?: User;
  points: Points;
}

const initialState: GroupRecipientSidebarState = {
  showSidebar: true,
  showUserContextMenu: false,
  points: { x: 0, y: 0 },
};

export const groupRecipientSidebarSlice = createSlice({
  name: 'groupRecipientSidebarSlice',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showUserContextMenu = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
    },
  },
});

export const {
  setContextMenuLocation,
  setSelectedUser,
  toggleSidebar,
  toggleContextMenu,
} = groupRecipientSidebarSlice.actions;

export default groupRecipientSidebarSlice.reducer;
