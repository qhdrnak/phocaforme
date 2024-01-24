import { combineReducers } from 'redux';

const navigationReducer = (state = { activeTab: 'Home' }, action) => {
  switch (action.type) {
    case 'CHANGE_TAB':
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  navigation: navigationReducer,
});

export default rootReducer;
