import {
  combineReducers
} from 'redux';
import entities from './entity_reducers/entity_reducer';
import session from './session_reducers/session_reducer';
import errors from './error_reducers/error_reducer';
// import ui from './ui_reducer/ui_reducer';

const rootReducer = combineReducers({
  entities,
  session,
  errors,
  // ui
});

export default rootReducer;