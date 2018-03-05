import { combineReducers } from 'redux';

import main from './main';
import profile from './profile';
import calendar from './calendar';
import mission from './mission';

const reducers = combineReducers({
  main,
  profile,
  calendar,
  mission,
});

export default reducers;
