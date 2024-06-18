export const _fetch = (method, url, body = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      body &&
      (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT")
    ) {
      options.body = JSON.stringify(body);
    }

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
