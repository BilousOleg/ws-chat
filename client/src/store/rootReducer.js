import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice';
import notificationReducer from './slices/notificationSlice';

const rootReducer = combineReducers({
  chat: messagesReducer,
  notification: notificationReducer,
});

export default rootReducer;
