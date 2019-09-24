import {
  combineReducers
} from 'redux';
import session from './error_session_error_reducer';
import patient from './error_patient_error_reducer';
import visit from './error_visit_error_reducer';

const errorReducer = combineReducers({
  session,
  patient,
  visit,
});

export default errorReducer;