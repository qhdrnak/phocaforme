import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = {
  searchs: {},
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    addSearchData: (state, action) => {
      state.searchs = action.payload;
    },
    
  },
});

export const { addSearchData,  } = searchSlice.actions;
export default searchSlice.reducer;
