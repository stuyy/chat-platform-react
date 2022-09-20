import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CallInitiatePayload, CallType, User } from '../../utils/types';
import { DataConnection, MediaConnection, Peer } from 'peerjs';

export interface CallState {
  isCalling: boolean;
  isCallInProgress: boolean;
  caller?: User;
  receiver?: User;
  peer?: Peer;
  call?: MediaConnection;
  connection?: DataConnection;
  isReceivingCall: boolean;
  remoteStream?: MediaStream;
  localStream?: MediaStream;
  activeConversationId?: number;
  callType?: CallType;
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
    setReceiver: (state, action: PayloadAction<User>) => {
      state.receiver = action.payload;
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
    setCallType: (state, action: PayloadAction<CallType>) => {
      state.callType = action.payload;
    },
    resetState: (state) => {
      state.isCalling = false;
      state.isCallInProgress = false;
      state.caller = undefined;
      state.call = undefined;
      state.connection = undefined;
      state.isReceivingCall = false;
      state.remoteStream = undefined;
      state.localStream = undefined;
      state.activeConversationId = undefined;
      state.receiver = undefined;
      state.callType = undefined;
    },
    initiateCallState: (state, action: PayloadAction<CallInitiatePayload>) => ({
      ...state,
      ...action.payload,
    }),
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
  setReceiver,
  initiateCallState,
  setCallType,
} = callSlice.actions;
export default callSlice.reducer;
