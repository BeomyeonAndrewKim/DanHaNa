import * as firebase from 'firebase';

export const GET_PROFILEINFO_REQUEST = 'profile/GET_PROFILEINFO_REQUEST';
export const GET_PROFILEINFO_SUCCESS = 'profile/GET_PROFILEINFO_SUCCESS';

export function getProfileInfoRequest() {
  return {
    type: GET_PROFILEINFO_REQUEST,
  };
}
export function getProfileInfoSuccess(profileInfo) {
  return {
    type: GET_PROFILEINFO_SUCCESS,
    profileInfo,
  };
}
const initialState = {
  loading: false,
  profileInfo: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILEINFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILEINFO_SUCCESS:
      return {
        ...state,
        loading: false,
        profileInfo: action.profileInfo,
      };
    default:
      return state;
  }
}

export const fetchProfileInfo = () => async dispath => {
  const { currentUser } = firebase.auth();

  if (currentUser) {
    const { uid } = currentUser;
    dispath(getProfileInfoRequest());
    const snapshot = await firebase
      .database()
      .ref(`users/${uid}/profileInfo`)
      .once('value');
    const profileInfo = snapshot.val();
    dispath(getProfileInfoSuccess(profileInfo));
  }
};
