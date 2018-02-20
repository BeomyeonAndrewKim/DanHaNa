import { combineReducers } from 'redux';

import menu from './menu';
import profile from './profile';

const reducers = combineReducers({
  menu,
  profile,
});

export default reducers;
