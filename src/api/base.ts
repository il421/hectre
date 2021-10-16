import axios, { AxiosRequestConfig } from "axios";

import { Actions } from "../contexts/AuthorizationContext";
import { Token } from "./auth";

enum Urls {
  chemicals = "chemicals",
  varieties = "varieties",
  orchards = "orchards",
  harvest = "harvest",
  authorize = "authorize",
  token = "token"
}
const NoAuth = "x-no-auth";

const withAuthTokenInterceptor = () => {
  return (requestConfig: AxiosRequestConfig) => {
    if (
      typeof requestConfig.headers === "object" &&
      requestConfig.headers.hasOwnProperty(NoAuth)
    ) {
      delete requestConfig.headers[NoAuth];
      return requestConfig;
    }

    const token: string | null = localStorage.getItem(
      Actions.set_token.toString()
    );

    if (!token) throw new Error("Token is required.");
    const { access_token, token_type } = JSON.parse(token) as Token;

    requestConfig.headers!.Authorization = `${token_type} ${access_token}`;
    return requestConfig;
  };
};

const instance = axios.create({
  baseURL: "https://develop-spectre-data.hectre.com/api/"
});

instance.interceptors.request.use(withAuthTokenInterceptor());
export { instance, NoAuth, Urls };
