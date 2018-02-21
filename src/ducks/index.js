import { combineReducers } from 'redux';

import main from './main';
import profile from './profile';

const reducers = combineReducers({
  main,
  profile,
});

export default reducers;
