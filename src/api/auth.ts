import axios from "axios";
import { stringify } from "query-string";

import { Urls } from "./base";
import { config } from "./config";

export type Token = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
};

export const baseURL =
  "https://hectre-code-challenge.auth.ap-southeast-2.amazoncognito.com/oauth2/";

const instance = axios.create({
  baseURL,
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  }
});

interface GetTokenArgs {
  code: string;
}

export const fetchToken = (arg: GetTokenArgs) => {
  const { client_id, redirect_uri, grant_type } = config;
  const query = stringify({
    ...arg,
    client_id,
    redirect_uri,
    grant_type
  });

  return instance.post(Urls.token, query).then(res => res.data);
};
