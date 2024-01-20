import { DELETE_NEWS, GET_NEWS_FEED, PINNED_NEWS, SET_LOCAL_DATA, SHOW_LOADER, UNPINNED_NEWS, UPDATE_SHOW_NEWS } from './actions';

const initialState = {
  newsFeed: [],
  showList: [],
  pinnedList: [],
  newsViewed:0,
  page: 1,
  loader:true
};

const feedReducer = (
  state = initialState,
  action: { type: String; payload: any },
) => {
  switch (action.type) {
    case GET_NEWS_FEED:
      return { ...state, page: state.page + 1, newsFeed: action.payload.slice(10), showList: action.payload.slice(0, 10), pinnedList: [],loader:false,newsViewed:10 };
    case SET_LOCAL_DATA:
      return { ...state, page: state.page + 1, newsFeed: action.payload.slice(10), showList: action.payload.slice(0, 10),loader:false,newsViewed:10 };
    case UPDATE_SHOW_NEWS:
      return { ...state, newsFeed: state.newsFeed.slice(5), showList: [...state.newsFeed.slice(0, 5), ...state.showList],newsViewed:state.newsViewed +5 };
    case DELETE_NEWS:
      return { ...state, showList: state.showList.filter((item, index) => index != action.payload) };
    case PINNED_NEWS:
      return { ...state, showList: state.showList.filter((item, index) => index != action.payload), pinnedList: [state.showList[action.payload], ...state.pinnedList] };
    case UNPINNED_NEWS:
      return { ...state, pinnedList: state.pinnedList.filter((item: any, index: any) => index != action.payload) };
    case SHOW_LOADER:
       return {...state,loader:true}
    default:
      return state;
  }
};
export default feedReducer;