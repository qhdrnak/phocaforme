import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post';
import searchReducer from './search';
import loginUserReducer from './loginUser';

const store = configureStore({
  reducer: {
    post: postReducer,
    search: searchReducer,
    user: loginUserReducer,
  },

});

export default store;