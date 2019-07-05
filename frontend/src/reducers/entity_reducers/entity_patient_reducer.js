import { merge } from 'lodash';
// import {
//   RECEIVE_CURRENT_USER
// } from '../actions/session_actions';
import {
  RECEIVE_ALL_PATIENTS,
  RECEIVE_PATIENT,
  REMOVE_PATIENT,
} from '../../actions/patient_actions';

const entityUsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_PATIENTS:
      return action.payload.rows;
    case RECEIVE_PATIENT:
      return merge({}, state, { [action.payload.patient.id]: action.payload.patient }); 
    case REMOVE_PATIENT:
      let newState = merge({}, state);
      action.patientIds.forEach(id => {
        delete newState[id];
      });
      return newState;
    default:
      return state;
  }
};

export default entityUsersReducer;