import { createSlice } from '@reduxjs/toolkit';

const initialPostState = {
	posts: [],
}

const postSlice = createSlice({
	name: 'post',
	initialState: initialPostState,
	reducers: {
		addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
		
	}
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
