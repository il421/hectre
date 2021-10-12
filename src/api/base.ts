import axios from "axios";

enum Urls {
  chemicals = "chemicals",
  varieties = "varieties",
  orchards = "orchards",
  harvest = "harvest"
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
