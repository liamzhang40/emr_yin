import axios from 'axios';

export const myFetch = ({
  url,
  method,
  data,
}) => (
  axios
    .request({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        // will be set with default
        "Authorization": `Bearer ${localStorage.getItem("emr_yin:sessionToken")}`
      },
      data: JSON.stringify(data),
    })
);