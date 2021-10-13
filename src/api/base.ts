import axios from "axios";

enum Urls {
  chemicals = "chemicals",
  varieties = "varieties",
  orchards = "orchards",
  harvest = "harvest",
  authorize = "authorize?response_type=code&client_id=57pfn3fjg8qfdd05qdgjeq1khd&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fcallback",
  // authorize = "authorize?response_type=code&client_id=57pfn3fjg8qfdd05qdgjeq1khd&redirect_uri=https%3A%2F%2Fdevelop-spectre-data.hectre.com%2Fswagger%2Foauth2-redirect.html",
  token = "token"
}

const instance = axios.create({
  baseURL: "https://develop-spectre-data.hectre.com/api/"
});

instance.interceptors.request.use(
  async config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export { instance, Urls };
