import { combineReducers } from 'redux';
import items from './items';
import groups from './groups';
import choices from './choices';
import general from './general';
import { cloneObject } from '../lib/utils';

const appReducer = combineReducers({
  items,
  groups,
  choices,
  general,
});

const rootReducer = (passedState, action) => {
  let state = passedState;
  // If we are clearing all items, groups and options we reassign
  // state and then pass that state to our proper reducer. This isn't
  // mutating our actual state
  // See: http://stackoverflow.com/a/35641992
  if (action.type === 'CLEAR_ALL') {
    state = undefined;
  } else if (action.type === 'RESET_TO') {
    return cloneObject(action.state);
  }

  return appReducer(state, action);
};

export default rootReducer;
