import * as firebase from 'firebase/app';

export const GET_TODOLIST_REQUEST = 'profile/GET_TODOLIST_REQUEST';
export const GET_TODOLIST_SUCCESS = 'profile/GET_TODOLIST_SUCCESS';

export function getTodoListRequest() {
  return {
    type: GET_TODOLIST_REQUEST,
  };
}
export function getTodoListSuccess(todoList) {
  return {
    type: GET_TODOLIST_SUCCESS,
    todoList,
  };
}

const initialState = {
  loading: false,
  todoList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODOLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TODOLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        todoList: action.todoList,
      };
    default:
      return state;
  }
}

export const fetchTodoList = () => async dispath => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    const { uid } = currentUser;
    dispath(getTodoListRequest());
    const snapshot = await firebase
      .database()
      .ref(`users/${uid}/todos`)
      .once('value');
    const todoListObj = snapshot.val();
    const todoList = Object.entries(todoListObj);
    dispath(getTodoListSuccess(todoList));
  }
};
