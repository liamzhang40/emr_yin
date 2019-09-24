import * as visitAPIUtil from '../utils/visit_api_utils';
export const RECEIVE_ALL_VISITS = 'RECEIVE_ALL_VISITS';
export const RECEIVE_VISIT_ERRORS = 'RECEIVE_VISIT_ERRORS';
export const CLEAR_VISIT_ERRORS = 'CLEAR_VISIT_ERRORS';
export const RECEIVE_VISIT = 'RECEIVE_VISIT';
export const REMOVE_VISIT = 'REMOVE_VISIT';

const removeVisits = visitIds => {
  return {
    type: REMOVE_VISIT,
    visitIds
  };
};

const receiveAllVisits = payload => {
  return {
    type: RECEIVE_ALL_VISITS,
    payload
  };
};

const receiveVisit = payload => {
  return {
    type: RECEIVE_VISIT,
    payload
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_VISIT_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_VISIT_ERRORS,
  };
};

export const createVisit = visit => dispatch => {
  return visitAPIUtil.createVisit(visit).then(({
    data
  }) => {
    dispatch(receiveVisit(data));
  }).catch(err => {
    dispatch(receiveErrors(err.response.data));

    throw err;
  });
};

export const deleteVisits = visitIds => dispatch => {
  return visitAPIUtil.deleteVisits(visitIds).then(() => {
    dispatch(removeVisits(visitIds));
  }).catch(err => {
    console.log(err);
  });
};

export const fetchAllVisits = patientId => dispatch => {
  return visitAPIUtil.fetchAllVisits(patientId).then(({
    data
  }) => {
    dispatch(receiveAllVisits(data));
  }).catch(err => {
    console.log(err.response);
  });
};

export const fetchVisit = visitId => dispatch => {
  return visitAPIUtil.fetchVisit(visitId).then(({
    data
  }) => {
    dispatch(receiveVisit(data));
  }).catch(err => {
    console.log(err);
  });
};

export const updateVisit = visit => dispatch => {
  return visitAPIUtil.updateVisit(visit).then(({
    data
  }) => {
    dispatch(receiveVisit(data));
  }).catch(err => {
    dispatch(receiveErrors(err.response.data));

    throw err;
  });
};