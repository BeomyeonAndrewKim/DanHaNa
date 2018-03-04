import { combineReducers } from 'redux';

import main from './main';
import profile from './profile';
import calendar from './calendar';

const reducers = combineReducers({
  main,
  profile,
  calendar,
});

export default reducers;
