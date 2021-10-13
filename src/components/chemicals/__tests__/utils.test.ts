import { chemicals } from "../../../../testData/chemicals";
import { Chemical } from "../../../models/Chemical";
import { filteredChemicals } from "../utils";

const testData = new Array(27)
  .fill(new Chemical(chemicals[0]))
  .map((item, idx) => ({ ...item, phi: idx }));

test("should show correct number of items", () => {
  const result_1 = filteredChemicals(testData, 10, 1);
  expect(result_1.length).toBe(10);

  const result_2 = filteredChemicals(testData, 20, 1);
  expect(result_2.length).toBe(20);

  const result_3 = filteredChemicals(testData, 30, 1);
  expect(result_3.length).toBe(27);
});

test("should paginate correctly", () => {
  const result_1 = filteredChemicals(testData, 10, 1);
  expect(result_1[0].phi).toBe(0);
  expect(result_1[9].phi).toBe(9);

  const result_2 = filteredChemicals(testData, 10, 2);
  expect(result_2[0].phi).toBe(10);
  expect(result_2[9].phi).toBe(19);

  const result_3 = filteredChemicals(testData, 10, 3);
  expect(result_3[0].phi).toBe(20);
  expect(result_3[6].phi).toBe(26);
});
