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
      return {
        ...state,
        chat: [...state.chat, action.payload],
      };
    },
    
    initChat: (state, action) => {
      return {
        ...state,
        chat: action.payload,
      };
    }
  },
});

export const { sendChat, initChat } = chatSlice.actions;
export default chatSlice.reducer;
