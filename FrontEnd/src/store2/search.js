import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = {
  searchs: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    addSearchData: (state, action) => {
      state.searchs = action.payload;
    },
    clearSearchData: (state) => {
      state.searchs = null;
    },
    
  },
});

export const { addSearchData, clearSearchData } = searchSlice.actions;
export default searchSlice.reducer;
