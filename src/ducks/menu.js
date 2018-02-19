import * as firebase from 'firebase';

export const LOADING = 'menu/LOADING';
export const LOADED = 'menu/LOADED';

export function loadingMenu() {
  return {
    type: LOADING,
  };
}

export function loadedMenu(profileInfo) {
  return {
    type: LOADED,
    profileInfo,
  };
}

const initialState = {
  loading: false,
  profileInfo: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOADED:
      return {
        ...state,
        loading: false,
        profileInfo: action.profileInfo,
      };
    default:
      return state;
  }
}

export const fetchMenuList = () => async dispatch => {
  dispatch(loadingMenu());
  const uid = 'user1'; // 데이터베이스 구축 후 재설정
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}`)
    .once('value');
  const profileObj = snapshot.val();
  const userInfo = profileObj.profileInfo;
  dispatch(loadedMenu(userInfo));
};
