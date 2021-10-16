import { harvest } from "../../../testData/harvest";
import { Harvest } from "../Harvest";

test("should create Harvest model from dto", () => {
  const model = new Harvest(harvest[0]);
  expect(model.hoursWorked).toBe(harvest[0].hoursWorked);
  expect(model.id).toBe(harvest[0].id);
  expect(model.numberOfBins).toBe(harvest[0].numberOfBins);
  expect(model.orchardId).toBe(harvest[0].orchardId);
  expect(model.payRate).toBe(67.20918793064101);
  expect(model.payRatePerHour).toBe(harvest[0].payRatePerHour);
  expect(model.varietyId).toBe(harvest[0].varietyId);
});
