import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../utils/types';
import { DataConnection, MediaConnection, Peer } from 'peerjs';

export interface CallState {
  isCalling: boolean;
  isCallInProgress: boolean;
  caller?: User;
  peer?: Peer;
  call?: MediaConnection;
  connection?: DataConnection;
  isReceivingCall: boolean;
  remoteStream?: MediaStream;
  localStream?: MediaStream;
  activeConversationId?: number;
}

const initialState: CallState = {
  isCalling: false,
  isCallInProgress: false,
  isReceivingCall: false,
};

export const callSlice = createSlice({
  name: 'callSlice',
  initialState,
  reducers: {
    setIsCalling: (state, action: PayloadAction<boolean>) => {
      state.isCalling = action.payload;
    },
    setPeer: (state, action: PayloadAction<Peer>) => {
      state.peer = action.payload;
    },
    setCall: (state, action: PayloadAction<MediaConnection>) => {
      state.call = action.payload;
    },
    setConnection: (state, action: PayloadAction<DataConnection>) => {
      state.connection = action.payload;
    },
    setIsReceivingCall: (state, action: PayloadAction<boolean>) => {
      state.isReceivingCall = action.payload;
    },
    setCaller: (state, action: PayloadAction<User>) => {
      state.caller = action.payload;
    },
    setRemoteStream: (state, action: PayloadAction<MediaStream>) => {
      state.remoteStream = action.payload;
    },
    setLocalStream: (state, action: PayloadAction<MediaStream>) => {
      state.localStream = action.payload;
    },
    setIsCallInProgress: (state, action: PayloadAction<boolean>) => {
      state.isCallInProgress = action.payload;
      state.isCalling = false;
    },
    setActiveConversationId: (state, action: PayloadAction<number>) => {
      state.activeConversationId = action.payload;
    },
    resetState: (state) => {
      state.caller = undefined;
      state.isCallInProgress = false;
      state.isCalling = false;
      state.activeConversationId = undefined;
      state.localStream = undefined;
      state.remoteStream = undefined;
      state.connection = undefined;
      state.isReceivingCall = false;
    },
  },
});

export const {
  setIsCalling,
  setPeer,
  setCall,
  setConnection,
  setIsReceivingCall,
  setCaller,
  setRemoteStream,
  setLocalStream,
  setIsCallInProgress,
  setActiveConversationId,
  resetState,
} = callSlice.actions;
export default callSlice.reducer;
