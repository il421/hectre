import axios from "axios";

import { Urls } from "./base";

export type ChemicalDto = {
  chemicalType: string;
  activeIngredient: string;
  name: string;
  phi: string;
};

const instance = axios.create({
  baseURL:
    "https://hectre-code-challenge.auth.ap-southeast-2.amazoncognito.com/oauth2/"
});

export const getAuthorization = () => {
  return instance.get<any>(Urls.authorize).then(res => res.data);
};

export const getToken = () => {
  return instance.get<ChemicalDto>(Urls.token).then(res => res.data);
};
