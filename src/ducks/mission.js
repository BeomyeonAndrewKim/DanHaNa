import * as firebase from 'firebase/app';
import * as moment from 'moment';

const LOADING = 'mission/LOADING';
const LOADED_THIS_WEEK = 'mission/LOADED_THIS_WEEK';
const LOADED_NEXT_WEEK = 'mission/LOADED_NEXT_WEEK';

const THIS_WEEK = moment()
  .isoWeekday(1)
  .format('YYYY-[W]ww');
const NEXT_WEEK = moment()
  .isoWeekday(1)
  .add(1, 'weeks')
  .format('YYYY-[W]ww');

export function loading() {
  return {
    type: LOADING,
  };
}

export function loadedThisWeek(thisWeek) {
  return {
    type: LOADED_THIS_WEEK,
    thisWeek,
  };
}

export function loadedNextWeek(nextWeek) {
  return {
    type: LOADED_NEXT_WEEK,
    nextWeek,
  };
}

const initialState = {
  loading: false,
  thisWeek: {},
  nextWeek: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOADED_THIS_WEEK:
      return {
        ...state,
        loading: false,
        thisWeek: action.thisWeek,
      };
    case LOADED_NEXT_WEEK:
      return {
        ...state,
        loading: false,
        nextWeek: action.nextWeek,
      };
    default:
      return state;
  }
}

export const fetchThisWeek = () => async dispatch => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    return;
  }
  const { uid } = currentUser;
  dispatch(loading());
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}/todos/${THIS_WEEK}`)
    .once('value');
  const thisWeek = snapshot.val();
  if (thisWeek) dispatch(loadedThisWeek(thisWeek));
  else dispatch(loadedThisWeek({}));
};

export const fetchNextWeek = () => async dispatch => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    return;
  }
  const { uid } = currentUser;
  dispatch(loading());
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}/todos/${NEXT_WEEK}`)
    .once('value');
  const nextWeek = snapshot.val();
  if (nextWeek) dispatch(loadedNextWeek(nextWeek));
  else dispatch(loadedNextWeek({}));
};
