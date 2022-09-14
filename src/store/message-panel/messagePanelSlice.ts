import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attachment } from '../../utils/types';

export interface MessagePanelState {
  attachments: Attachment[];
  attachmentCounter: number;
}

const initialState: MessagePanelState = {
  attachments: [],
  attachmentCounter: 0,
};

export const messagePanelSlice = createSlice({
  name: 'messagePanel',
  initialState,
  reducers: {
    addAttachment: (state, action: PayloadAction<Attachment>) => {
      state.attachments.push(action.payload);
    },
    removeAttachment: (state, action: PayloadAction<Attachment>) => {
      state.attachments = state.attachments.filter(
        (file) => file.id !== action.payload.id
      );
    },
    incrementAttachmentCounter: (state) => {
      state.attachmentCounter++;
    },
    removeAllAttachments: (state) => {
      state.attachments = [];
    },
  },
});

export const {
  addAttachment,
  removeAttachment,
  incrementAttachmentCounter,
  removeAllAttachments,
} = messagePanelSlice.actions;

export default messagePanelSlice.reducer;
