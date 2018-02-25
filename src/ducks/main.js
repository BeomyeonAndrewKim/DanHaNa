import * as firebase from 'firebase';
import moment from 'moment';

export const LOADING = 'main/LOADING';
export const LOADED_BOTH = 'main/LOADEDBOTH';
export const LOADED_USER = 'main/LOADEDUSER';
export const LOADED_TODO = 'main/LOADEDTODO';

const THIS_WEEK = moment()
  .isoWeekday(1)
  .format('YYYY-[W]ww-D');

export function loading() {
  return {
    type: LOADING,
  };
}

export function loadedBothInfo(userInfo, todoInfo) {
  return {
    type: LOADED_BOTH,
    userInfo,
    todoInfo,
  };
}

export function loadedUserInfo(userInfo) {
  return {
    type: LOADED_USER,
    userInfo,
  };
}

export function loadedTodoInfo(todoInfo) {
  return {
    type: LOADED_TODO,
    todoInfo,
  };
}

const initialState = {
  loading: false,
  userInfo: {},
  todoInfo: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOADED_BOTH:
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
        todoInfo: action.todoInfo,
      };
    case LOADED_USER:
      return {
        ...state,
        loading: false,
        userInfo: action.userInfo,
      };
    case LOADED_TODO:
      return {
        ...state,
        loading: false,
        todoInfo: action.todoInfo,
      };
    default:
      return state;
  }
}

export const fetchBothInfo = () => async dispatch => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    return;
  }
  const { uid } = currentUser;
  dispatch(loading());
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}`)
    .once('value');
  const userObj = snapshot.val();
  const userInfo = userObj.profileInfo;
  if (userObj.todos) {
    const todoInfo = userObj.todos[THIS_WEEK];
    dispatch(loadedBothInfo(userInfo, todoInfo));
  } else {
    dispatch(loadedBothInfo(userInfo, {}));
  }
};

export const fetchTodoInfo = () => async dispatch => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    return;
  }
  const { uid } = currentUser;
  dispatch(loading());
  const snapshot = await firebase
    .database()
    .ref(`users/${uid}`)
    .once('value');
  const userObj = snapshot.val();
  if (userObj.todos) {
    const todoInfo = userObj.todos[THIS_WEEK];
    dispatch(loadedTodoInfo(todoInfo));
  } else {
    dispatch(loadedTodoInfo({}));
  }
};
