import { createSlice } from '@reduxjs/toolkit';

const initialPostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    addCards: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    // 다른 리듀서 추가...
  },
});

export const { addPost, addCards } = postSlice.actions;
export default postSlice.reducer;
