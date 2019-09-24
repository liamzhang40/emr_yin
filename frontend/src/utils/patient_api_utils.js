import { myFetch } from './fetch_api_utils';

export const createPatient = patient => (
  myFetch({
    url: 'api/patients/',
    method: 'POST',
    data: { patient },
  })
);

export const deletePatients = patientIds => (
  myFetch({
    url: `api/patients/${patientIds.join(',')}`,
    method: 'DELETE',
  })
);

export const fetchAllPatients = () => (
  myFetch({
    url: 'api/patients',
    method: 'GET',
  })
);

export const fetchPatient = patientId => (
  myFetch({
    url: `api/patients/${patientId}`,
    method: 'GET',
  })
);

export const updatePatient = patient => (
  myFetch({
    url: `api/patients/${patient.id}`,
    method: 'PATCH',
    data: { patient },
  })
);
