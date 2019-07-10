import * as sessionAPIUtil from '../utils/session_api_utils';
export const RECEIVE_CURRENT_SESSION = 'RECEIVE_CURRENT_SESSION';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';
export const CLEAR_CURRENT_SESSION = 'CLEAR_CURRENT_SESSION';

const receiveCurrentSession = user => {
  return {
    type: RECEIVE_CURRENT_SESSION,
    user
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

const clearSession = () => {
  return {
    type: CLEAR_CURRENT_SESSION
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS,
  };
};

export const logout = () => {
  localStorage.removeItem("emr_yin:sessionToken");
  localStorage.removeItem("emr_yin:sessionTokenExpiration");

  return clearSession();
};

export const signup = user => dispatch => {
  return sessionAPIUtil.signup(user).then(({ data }) => {
    localStorage.setItem("emr_yin:sessionToken", data.token);
    localStorage.setItem("emr_yin:sessionTokenExpiration", data.exp);
    dispatch(receiveCurrentSession(data));
  }).catch(err => {
    dispatch(receiveErrors(err.response.data));

    throw err;
  });
};

export const login = user => dispatch => {
  return sessionAPIUtil.login(user).then(({ data }) => {
    localStorage.setItem("emr_yin:sessionToken", data.token);
    localStorage.setItem("emr_yin:sessionTokenExpiration", data.exp);
    dispatch(receiveCurrentSession(data));
  }).catch(err => {
    dispatch(receiveErrors(err.response.data));

    throw err;
  });
};

export const fetchCurrentUser = () => dispatch => {
  return sessionAPIUtil.fetchCurrentUser().then(({ data }) => {
    dispatch(receiveCurrentSession(data));
  }).catch(err => {
    dispatch(clearSession());

    throw err;
  });
};