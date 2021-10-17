import stringToColor from "string-to-color";

import { unique } from "../../common/utils";
import { Harvest } from "../../models/Harvest";

export type Totals = {
  bins: number;
  varieties: number;
  staff: number;
  workingHours: number;
  rate: number;
  laborCosts: number;
};

export type Statistics = {
  key: string;
  production: number;
  cost: number;
  title: string;
  color: string;
};

export enum StatisticsId {
  production = "production",
  cost = "cost"
}

export enum StatisticsType {
  varieties = "varieties",
  orchards = "orchards"
}

export const getTotals = (harvest: Harvest[]): Totals => {
  // get unique data
  const staff = unique(harvest.map(harvest => harvest.userId)).length;
  const varieties = unique(harvest.map(harvest => harvest.varietyId)).length;

  return harvest.reduce(
    (acc: Totals, item: Harvest) => {
      return {
        bins: acc.bins + item.numberOfBins,
        varieties: acc.varieties,
        staff: acc.staff,
        workingHours: acc.workingHours + item.hoursWorked,
        rate: acc.rate + item.payRatePerHour,
        laborCosts: acc.laborCosts + item.payRate
      };
    },
    {
      bins: 0,
      varieties,
      staff,
      workingHours: 0,
      rate: 0,
      laborCosts: 0
    }
  );
};

export const getStatistics = (options: {
  harvest: Harvest[];
  refData: Map<string, string>;
  key: "varietyId" | "orchardId";
}) => {
  const { refData, harvest, key } = options;
  const defaultAcc: Statistics[] = Array.from(refData.keys()).map(key => ({
    key,
    production: 0,
    cost: 0,
    title: refData.get(key) ?? "",
    color: stringToColor(key)
  }));

  return (
    harvest
      .reduce((acc: Statistics[], har: Harvest) => {
        const index = acc.findIndex(i => i.key === har[key]);
        if (index >= 0) {
          acc[index].production += har.numberOfBins;
          acc[index].cost += har.payRate;
        }
        return acc;
      }, defaultAcc)
      // excluded elements with no data
      .filter(stat => stat.cost > 0 && stat.production > 0)
  );
};

export const getStatisticsTotal = (
  stat: Statistics[],
  key: StatisticsId
): number =>
  stat.reduce((acc, s) => {
    acc += s[key];
    return acc;
  }, 0);
