// import {
//   merge
// } from 'lodash';
// import {
//   RECEIVE_CURRENT_USER
// } from '../actions/session_actions';
import {
  RECEIVE_ALL_PATIENTS,
  RECEIVE_PATIENT,
} from '../../actions/patient_actions';

const entityColumnHeadReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_PATIENTS:
    case RECEIVE_PATIENT:
      return action.payload.column_heads;
    default:
      return state;
  }
};

export default entityColumnHeadReducer;