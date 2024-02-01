import { createSlice } from '@reduxjs/toolkit';

const initialChatListState = {
  // 임의의 값 넣어놓음
  chatList: [ {
    chatRoomId: 1,
    owner: '제노예요',
    visiter: '아궁빵뎡',
    lastMessage: '안녕하세요! 거래 희망합니다',
    lastMessageTime: '2024-02-01 10:33',
    isOver: false,
    uncheckedCount: 1,
  }, 
   ],
};

const chatListSlice = createSlice({
  name: 'chatList',
  initialState: initialChatListState,
  reducers: {
    addChatList: (state, action) => {
      state.chatList = [...state.chatList, action.payload];
    },
  },
});

export const { addChatList, } = chatListSlice.actions;
export default chatListSlice.reducer;
