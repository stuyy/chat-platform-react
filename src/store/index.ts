import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import messageReducer from './messageSlice';
import selectedTypeReducer from './selectedSlice';
import groupsReducer from './groupSlice';
import groupMessagesReducer from './groupMessageSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    messages: messageReducer,
    selectedConversationType: selectedTypeReducer,
    groups: groupsReducer,
    groupMessages: groupMessagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
