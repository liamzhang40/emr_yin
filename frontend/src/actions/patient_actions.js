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
  return patientAPIUtil.createPatient(patient).then(({ data }) => {
    dispatch(receivePatient(data));
  }).catch(err => {
    dispatch(receiveErrors(err.response.data));

    throw err;
  });
};

export const deletePatients = patientIds => dispatch => {
  return patientAPIUtil.deletePatients(patientIds).then(() => {
    dispatch(removePatients(patientIds));
  }).catch(err => {
    console.log(err);
  });
};

export const fetchAllPatients = () => dispatch => {
  return patientAPIUtil.fetchAllPatients().then(({ data }) => {
    dispatch(receiveAllPatients(data));
  }).catch(err => {
    console.log(err);
  });
};

export const fetchPatient = patientId => dispatch => {
  return patientAPIUtil.fetchPatient(patientId).then(({ data }) => {
    dispatch(receivePatient(data));
  }).catch(err => {
    console.log(err);
  });
};

export const updatePatient = patient => dispatch => {
  return patientAPIUtil.updatePatient(patient).then(({ data }) => {
    dispatch(receivePatient(data));
  }).catch(err => {
    dispatch(receiveErrors(err.response.data));

    throw err;
  });
};