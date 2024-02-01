import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post';
import searchReducer from './search';
import loginUserReducer from './loginUser';
import chatListReducer from './chatList';
import chatReducer from './chat';

const store = configureStore({
  reducer: {
    post: postReducer,
    search: searchReducer,
    user: loginUserReducer,
    chat: chatReducer,
    chatList: chatListReducer,
  },

});

export default store;