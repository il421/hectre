import { instance, Urls } from "./base";

export type ChemicalDto = {
  chemicalType?: string;
  activeIngredient?: string;
  name?: string;
  phi?: string;
};

export const getChemicals = () => {
  return instance.get<ChemicalDto>(Urls.chemicals).then(res => res.data);
};
