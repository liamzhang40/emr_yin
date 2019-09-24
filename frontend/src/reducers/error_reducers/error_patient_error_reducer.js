import {
  RECEIVE_PATIENT,
  RECEIVE_PATIENT_ERRORS,
  CLEAR_PATIENT_ERRORS,
} from '../../actions/patient_actions';

const errorPatientErrorReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PATIENT_ERRORS:
      return action.errors;
    case CLEAR_PATIENT_ERRORS:
    case RECEIVE_PATIENT:
      return {};
    default:
      return state;
  }
};

export default errorPatientErrorReducer;