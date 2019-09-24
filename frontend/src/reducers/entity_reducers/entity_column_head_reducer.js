import {
  merge
} from 'lodash';
import {
  RECEIVE_ALL_PATIENTS,
  RECEIVE_PATIENT,
} from '../../actions/patient_actions';
import {
  RECEIVE_ALL_VISITS,
  RECEIVE_VISIT,
} from '../../actions/visit_actions';

const INITIAL_STATE = {
  patient: [],
  visit: [],
};

const entityColumnHeadReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_PATIENTS:
    case RECEIVE_PATIENT:
      return Object.assign({}, state, {
        patient: action.payload.column_heads
      });
    case RECEIVE_ALL_VISITS:
    case RECEIVE_VISIT:
      return Object.assign({}, state, {
        visit: action.payload.column_heads.sort()
      });
    default:
      return state;
  }
};

export default entityColumnHeadReducer;