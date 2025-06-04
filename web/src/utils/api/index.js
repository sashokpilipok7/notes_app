class ApiClient {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
  }

  _request({ method, url, data, config = {} }) {
    return new Promise((resolve, reject) => {
      let payload = {
        method,
        headers: {
          ...config.headers,
        },
        ...config,
      };

      if (method === "POST" || method === "PUT") {
        payload.body = JSON.stringify(data);
        payload.headers["Content-Type"] = "application/json";
      }

      fetch(this.baseUrl + url, payload)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          //   toast.error(err); FIXME
          reject(err);
        });
    });
  }

  get(url, config) {
    return this._request({
      method: "GET",
      url,
      config,
    });
  }
  post(url, data, config) {
    return this._request({
      method: "POST",
      url,
      data,
      config,
    });
  }
  put(url, data, config) {
    return this._request({
      method: "PUT",
      url,
      data,
      config,
    });
  }
  delete(url, config) {
    return this._request({
      method: "DELETE",
      url,
      config,
    });
  }
}

const singletonApiClient = new ApiClient();
export default singletonApiClient;
