

export function post(path, payload) {
  return fetch(path,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
    });
}

export function get(path) {
  return fetch(path,
    {
      headers: { 'Accept': 'application/json' },
      method: "GET"
    });
}

export function put(path, payload) {
  return fetch(path,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(payload)
    });
}

export function patch(path, payload) {
  return fetch(path,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PATCH",
      body: JSON.stringify(payload)
    });
}
