import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {}

export const initialState: ModalState = {};
export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {},
});

export const {} = modalSlice.actions;
export default modalSlice.reducer;
