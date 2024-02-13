import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import getCurrentTime from "../utils/currentTime";

const initialChatState = {
  chat: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    sendChat: (state, action) => {
      state.chat = [...state.chat, action.payload];
      console.log(state.chat);
    },
    initChat: async (state, action) => {
      const roomId = action.payload;
      // state.chat = [{chatRoomId:1,userEmail:"b1fec529-d473-40a0-8024-fc4850885f8d",message:"ㅇㄴㅇ",imgCode:null,createdAt:"2024-02-05T15:35:43.425057"},]
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + `chats/${roomId}`);
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
