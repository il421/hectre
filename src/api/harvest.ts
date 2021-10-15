import { instance, Urls } from "./base";

export type RefData = {
  id: string;
  name: string;
};

export type HarvestRefData = {
  orchards: Map<string, RefData["name"][]>;
  variety: Map<string, RefData["name"][]>;
};

export type OrchardDto = RefData[];
export type VarietyDto = RefData[];

export type HarvestDto = {
  id: string;
  userId: string;
  varietyId: string;
  orchardId: string;
  pickingDate: Date;
  numberOfBins: number;
  hoursWorked: number;
  payRatePerHour: number;
};

export const fetchHarvest = () => {
  return instance.get<HarvestDto>(Urls.harvest).then(res => res.data);
};

export const fetchOrchardRefData = () => {
  return instance.get<OrchardDto>(Urls.orchards).then(res => res.data);
};

export const fetchVarietyRefData = () => {
  return instance.get<VarietyDto>(Urls.varieties).then(res => res.data);
};
