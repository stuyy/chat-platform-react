import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import messageReducer from './messages/messageSlice';
import selectedTypeReducer from './selectedSlice';
import groupsReducer from './groupSlice';
import groupMessagesReducer from './groupMessageSlice';
import messageContainerReducer from './messageContainerSlice';
import groupSidebarReducer from './groupRecipientsSidebarSlice';
import friendsReducer from './friends/friendsSlice';
import rateLimitReducer from './rate-limit/rateLimitSlice';
import messagePanelReducer from './message-panel/messagePanelSlice';
import systemMessageReducer from './system-messages/systemMessagesSlice';
import settingsReducer from './settings/settingsSlice';
import callReducer from './call/callSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    messages: messageReducer,
    selectedConversationType: selectedTypeReducer,
    friends: friendsReducer,
    groups: groupsReducer,
    groupMessages: groupMessagesReducer,
    messageContainer: messageContainerReducer,
    groupSidebar: groupSidebarReducer,
    rateLimit: rateLimitReducer,
    messagePanel: messagePanelReducer,
    systemMessages: systemMessageReducer,
    settings: settingsReducer,
    call: callReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
