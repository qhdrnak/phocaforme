import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  user: {
    id: '1234',
    name: '제노예요',
    location: '',
  },
};

const loginUserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    getLocation: (state, action) => {
      state.user.location = action.payload;
    },
  },
});

export const { loginUser, logoutUser, getLocation } = loginUserSlice.actions;
export default loginUserSlice.reducer;
