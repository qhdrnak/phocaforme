import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post.js';

const store = configureStore({
	reducer: { post: postReducer },
});

export default store;