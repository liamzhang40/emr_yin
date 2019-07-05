import {
  RECEIVE_CURRENT_SESSION,
  RECEIVE_SESSION_ERRORS,
  CLEAR_SESSION_ERRORS,
} from '../../actions/session_actions';

const errorSessionErrorReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case CLEAR_SESSION_ERRORS:
    case RECEIVE_CURRENT_SESSION:
      return [];
    default:
      return state;
  }
};

export default errorSessionErrorReducer;