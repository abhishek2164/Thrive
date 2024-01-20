import axios from 'axios';
import { Alert, SectionListComponent } from 'react-native';
import { cacheProductData, getCachedProductData } from '../localStorage/Storage';
export const GET_NEWS_FEED = 'GET_NEWS_FEED';
export const UPDATE_SHOW_NEWS='UPDATE_SHOW_NEWS';
export const DELETE_NEWS='DELETE_NEWS';
export const PINNED_NEWS='PINNED_NEWS';
export const UNPINNED_NEWS='UNPINNED_NEWS';
export const SET_LOCAL_DATA='SET_LOCAL_DATA';
export const SHOW_LOADER='SHOW_LOADER'
export const setLocalData=(data:any)=> async (dispatch: Function) => {
  dispatch({
    type: SET_LOCAL_DATA,
    payload: data,
  });
}
export const getNewsFeed = (page: any) => async (dispatch: Function) => {
  try {
    const res = await axios.get(
      'https://newsapi.org/v2/everything?q=tesla',
      {
        params:{
          q:"tesla",
          apiKey:"c448929fe8e145d39297029b95e35051",
          page,
          pageSize:100
        }
      }
    );
    if (res.status === 200) {
      cacheProductData(res?.data?.articles)
      dispatch({
        type: GET_NEWS_FEED,
        payload: res?.data?.articles,
      });
    } else {
      console.warn('Something went wrong');
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      const data = await getCachedProductData();
      dispatch(setLocalData(data));
      alert(error?.response?.data?.message)
  }
  }
};
export const updateShowNews=() => async (dispatch: Function) => {
  dispatch({
    type: UPDATE_SHOW_NEWS
  });
};
export const deleteNews=(item:any)=>async (dispatch: Function) => {
  console.log("delete called")
  dispatch({
    type: DELETE_NEWS,
    payload:item
  });
};
export const pinnedNews=(item:any)=>async (dispatch: Function) => {
  console.log("pinned called")
  dispatch({
    type: PINNED_NEWS,
    payload:item
  });
};
export const unPinnedNews=(item:any)=>async (dispatch: Function) => {
  dispatch({
    type: UNPINNED_NEWS,
    payload:item
  });
};
export const showLoader=()=>async (dispatch:Function)=>{
  dispatch({
    type:SHOW_LOADER
  })
}