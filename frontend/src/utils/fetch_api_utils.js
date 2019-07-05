export const myFetch = ({
  url,
  method,
  data,
}) => (
  fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("emr_yin:sessionToken")}`
    }
  }).then(res => {
    if (!res.ok) throw res.json();
    return res.json();
  })
);