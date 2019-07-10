import { myFetch } from './fetch_api_utils';

export const createVisit = visit => (
  myFetch({
    url: 'api/visits/',
    method: 'POST',
    data: { visit },
  })
);

export const deleteVisits = visitIds => (
  myFetch({
    url: `api/visits/${visitIds.join(',')}`,
    method: 'DELETE',
  })
);


export const fetchAllVisits = patientId => (
  myFetch({
    url: `api/visits/${patientId}`,
    method: 'GET',
  })
);

export const fetchVisit = visitId => (
  myFetch({
    url: `api/visits/${visitId}`,
    method: 'GET',
  })
);

export const updateVisit = visit => (
  myFetch({
    url: `api/visits/${visit.id}`,
    method: 'PATCH',
    data: { visit },
  })
);
