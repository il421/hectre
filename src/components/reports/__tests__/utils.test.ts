import { DateTime } from "luxon";

import { harvest as harvestTestData } from "../../../../testData/harvest";
import { varieties } from "../../../../testData/varieties";
import { refDataToMap } from "../../../common/utils";
import { Harvest } from "../../../models/Harvest";
import { filterHarvest, getStatistics, getTotals } from "../utils";

const harvest = harvestTestData.map(h => new Harvest(h));
test("getTotals should return correct data", () => {
  const result = getTotals(harvest);
  expect(result.varieties).toBe(2);
  expect(result.staff).toBe(3);
  expect(result.workingHours).toBe(24.594363);
  expect(result.rate).toBe(24.594363);
  expect(result.bins).toBe(12);
  expect(result.laborCosts).toBe(201.62756379192302);
});

test("getStatistics should return correct data", () => {
  const result = getStatistics({
    harvest,
    refData: refDataToMap(varieties),
    key: "varietyId"
  });

  expect(result.length).toBe(2);
  expect(result[0].production).toBe(4);
  expect(result[1].production).toBe(8);

  expect(result[0].cost).toBe(67.20918793064101);
  expect(result[1].cost).toBe(134.41837586128202);
});

test("filterHarvest should filter harvest correctly", () => {
  const orchard: string[] = ["4eb58296-5eda-49a1-9831-5838e52bc4dd"];
  const from: DateTime = DateTime.fromISO("2021-10-09T00:00:00");
  const result = filterHarvest(harvest, { orchard, from, to: null });
  expect(result.length).toBe(1);
});
