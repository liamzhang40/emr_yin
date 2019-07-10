import { myFetch } from './fetch_api_utils';
import moment from 'moment';

export const signup = formData => (
  myFetch({
    url: 'api/users',
    method: 'POST',
    data: {user: formData},
  })
);

export const login = formData => (
  myFetch({
    url: 'api/auth/login',
    method: 'POST',
    data: {user: formData},
  })
);

export const fetchCurrentUser = () => (
  myFetch({
    url: 'api/auth/profile',
    method: 'GET',
  })
);

export const hasCurrentUser = () => {
  const exp = localStorage.getItem("emr_yin:sessionTokenExpiration");
  const token = localStorage.getItem("emr_yin:sessionToken");
  return token && exp && moment().isBefore(moment(exp));
};