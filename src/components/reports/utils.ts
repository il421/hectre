import { DateTime } from "luxon";
import stringToColor from "string-to-color";

import { defaultDateFormat } from "../../common/dateFormats";
import { unique } from "../../common/utils";
import { Filter } from "../../contexts/HarvestContext";
import { Harvest } from "../../models/Harvest";
import { PieData } from "./Charts/Pie";

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
  startDate: DateTime;
  endTime: DateTime;
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
}): Statistics[] => {
  const { refData, harvest, key } = options;
  const defaultAcc: Statistics[] = Array.from(refData.keys()).map(key => ({
    key,
    production: 0,
    cost: 0,
    title: refData.get(key) ?? "",
    color: stringToColor(key),
    startDate: DateTime.now(),
    endTime: DateTime.now()
  }));

  return (
    harvest
      .reduce((acc: Statistics[], har: Harvest) => {
        const index = acc.findIndex(i => i.key === har[key]);
        if (index >= 0) {
          acc[index].production += har.numberOfBins;
          acc[index].cost += har.payRate;
          acc[index].startDate =
            acc[index].startDate < har.pickingDate
              ? acc[index].startDate
              : har.pickingDate;
          acc[index].endTime =
            acc[index].endTime > har.pickingDate
              ? acc[index].startDate
              : har.pickingDate;
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

export const filterHarvest = (harvest: Harvest[], filter: Filter) => {
  return harvest.filter(har => {
    const { to, from, orchard } = filter;
    const hasOrchard: boolean = !orchard.length
      ? true
      : filter.orchard.some(orch => orch === har.orchardId);

    const isInDateRange = !from
      ? true
      : from <= har.pickingDate && har.pickingDate <= (to ?? DateTime.now());

    return hasOrchard && isInDateRange;
  });
};

export const getPieData = (
  statistics: Statistics[],
  key: "production" | "cost"
): PieData[] =>
  statistics.map(stat => ({
    title: stat.title,
    value: stat[key],
    color: stat.color,
    dateRange: `${stat.startDate.toFormat(
      defaultDateFormat
    )} - ${stat.endTime.toFormat(defaultDateFormat)}`
  }));
