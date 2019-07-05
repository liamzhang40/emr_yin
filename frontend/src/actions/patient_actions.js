import * as patientAPIUtil from '../utils/patient_api_utils';
export const RECEIVE_ALL_PATIENTS = 'RECEIVE_ALL_PATIENTS';
export const RECEIVE_PATIENT_ERRORS = 'RECEIVE_PATIENT_ERRORS';
export const CLEAR_PATIENT_ERRORS = 'CLEAR_PATIENT_ERRORS';
export const RECEIVE_PATIENT = 'RECEIVE_PATIENT';
export const REMOVE_PATIENT = 'REMOVE_PATIENT';

const removePatients = patientIds => {
  return {
    type: REMOVE_PATIENT,
    patientIds
  };
};

const receiveAllPatients = payload => {
  return {
    type: RECEIVE_ALL_PATIENTS,
    payload
  };
};

const receivePatient = payload => {
  return {
    type: RECEIVE_PATIENT,
    payload
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_PATIENT_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_PATIENT_ERRORS,
  };
};

export const createPatient = patient => dispatch => {
  return patientAPIUtil.createPatient(patient).then(res => {
    return dispatch(receivePatient(res));
  }).catch(err => {
    return err.then((errMessages) => {
      dispatch(receiveErrors(errMessages));

      // stop next then for now
      return false;
    });
  });
};

export const deletePatients = patientIds => dispatch => {
  return patientAPIUtil.deletePatients(patientIds).then(() => {
    return dispatch(removePatients(patientIds));
  }).catch(err => {
    return err.then((errMessages) => {
      dispatch(receiveErrors(errMessages));

      // stop next then for now
      return false;
    });
  });
};

export const fetchAllPatients = () => dispatch => {
  return patientAPIUtil.fetchAllPatients().then(res => {
    return dispatch(receiveAllPatients(res));
  }).catch(err => {
    return err.then((errMessages) => {
      dispatch(receiveErrors(errMessages));

      // stop next then for now
      return false;
    });
  });
};

export const fetchPatient = patientId => dispatch => {
  return patientAPIUtil.fetchPatient(patientId).then(res => {
    return dispatch(receivePatient(res));
  }).catch(err => {
    return err.then((errMessages) => {
      dispatch(receiveErrors(errMessages));

      // stop next then for now
      return false;
    });
  });
};

export const updatePatient = patient => dispatch => {
  return patientAPIUtil.updatePatient(patient).then(res => {
    return dispatch(receivePatient(res));
  }).catch(err => {
    return err.then((errMessages) => {
      dispatch(receiveErrors(errMessages));

      // stop next then for now
      return false;
    });
  });
};