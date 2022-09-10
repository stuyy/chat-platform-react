import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateRateLimitPayload } from '../../utils/types';

export interface RateLimitState {
  groupRateLimited: boolean;
  privateRateLimited: boolean;
}

const initialState: RateLimitState = {
  groupRateLimited: false,
  privateRateLimited: false,
};

export const rateLimitSlice = createSlice({
  name: 'rateLimit',
  initialState,
  reducers: {
    setRateLimitStatus: (
      state,
      action: PayloadAction<UpdateRateLimitPayload>
    ) => {
      switch (action.payload.type) {
        case 'group':
          state.groupRateLimited = action.payload.status;
          return;
        case 'private':
          state.privateRateLimited = action.payload.status;
          return;
      }
    },
  },
});

export const { setRateLimitStatus } = rateLimitSlice.actions;
export default rateLimitSlice.reducer;
