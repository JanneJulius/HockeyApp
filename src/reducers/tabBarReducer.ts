import { SHOW_TABBAR, HIDE_TABBAR } from './actions';

const initialState = {
  isVisible: true,
};

const tabBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TABBAR:
      return { ...state, isVisible: true };
    case HIDE_TABBAR:
      return { ...state, isVisible: false };
    default:
      return state;
  }
};

export default tabBarReducer;