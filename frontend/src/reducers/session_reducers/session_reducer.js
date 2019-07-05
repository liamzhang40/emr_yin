import {
  RECEIVE_CURRENT_SESSION,
  CLEAR_CURRENT_SESSION,
  // LOGOUT_CURRENT_USER
} from '../../actions/session_actions';

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
};

const sessionReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_SESSION:
      return Object.assign({}, { 
        firstName: action.user.first_name,
        lastName: action.user.last_name,
      });
    case CLEAR_CURRENT_SESSION:
      return INITIAL_STATE;
    // case LOGOUT_CURRENT_USER:
    //   return Object.assign({}, { id: null });
    default:
      return state;
  }
};

export default sessionReducer;
