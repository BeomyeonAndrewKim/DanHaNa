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
  const { currentUser } = firebase.auth();
  if (currentUser) {
    dispatch(loadingMenu());
    const { uid } = currentUser;
    const snapshot = await firebase
      .database()
      .ref(`users/${uid}`)
      .once('value');
    const profileObj = snapshot.val();
    const { profileInfo } = profileObj;
    dispatch(loadedMenu(profileInfo));
  }
};
