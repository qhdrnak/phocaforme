import { createSlice } from '@reduxjs/toolkit';

// 쿠키에서 userId 및 nickname을 읽어오는 함수
const getDecodedCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

// 쿠키에서 userId 및 nickname을 디코딩하여 초기 상태에 추가
const initialUserState = {
  user: {
    userId: getDecodedCookie('userId') || null,
    nickname: getDecodedCookie('nickname') || null,
    location: null, // 현재 위치 정보
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
