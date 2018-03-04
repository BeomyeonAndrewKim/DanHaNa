import { combineReducers } from 'redux';

import main from './main';
import profile from './profile';
import mission from './mission';
import calendar from './calendar';

const reducers = combineReducers({
  main,
  profile,
  mission,
  calendar,
});

export default reducers;
