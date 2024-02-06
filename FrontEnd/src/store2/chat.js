import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import getCurrentTime from "../utils/currentTime";

const initialChatState = {
  // 임의의 값 넣어놓음
  chat: [ 
  // {
  //   chatId: 1,
  //   chatRoomId : 1,
  //   sender: '아궁빵뎡',
  //   message: '안녕하세요! 거래 희망합니다',
  //   imgCode: '',
  //   sendTime : getCurrentTime(),
  //   isPay: false,
  // }, 
   ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    sendChat: (state, action) => {
      state.chat = [...state.chat, action.payload];
    },
    initChat: async (state, action) => {
      const roomId = action.payload;
      // state.chat = [{chatRoomId:1,userEmail:"b1fec529-d473-40a0-8024-fc4850885f8d",message:"ㅇㄴㅇ",imgCode:null,createdAt:"2024-02-05T15:35:43.425057"},]
      try {
        const res = await axios.get(`http://localhost:8080/chats/${roomId}`);
        console.log(res);
        state.chat = res.data; 
      } catch (err) {
        console.log("채팅 로드 에러", err);
        alert("채팅 로드에 실패했습니다.");
      }
    },
    
  },
});

export const { sendChat, initChat } = chatSlice.actions;
export default chatSlice.reducer;
