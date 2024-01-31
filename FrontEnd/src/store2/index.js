import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post';
import searchReducer from './search';

const store = configureStore({
  reducer: {
    post: postReducer,
    search: searchReducer,
  },

});

export default store;