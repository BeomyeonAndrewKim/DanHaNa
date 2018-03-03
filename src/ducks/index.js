import { combineReducers } from 'redux';

import main from './main';
import profile from './profile';
import mission from './mission';

const reducers = combineReducers({
  main,
  profile,
  mission,
});

export default reducers;
