import {
  RECEIVE_VISIT,
  RECEIVE_VISIT_ERRORS,
  CLEAR_VISIT_ERRORS,
} from '../../actions/visit_actions';

const errorVisitErrorReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VISIT_ERRORS:
      return action.errors;
    case CLEAR_VISIT_ERRORS:
    case RECEIVE_VISIT:
      return {};
    default:
      return state;
  }
};

export default errorVisitErrorReducer;