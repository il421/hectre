import { chemicals } from "../../../testData/chemicals";
import { Chemical } from "../Chemical";

test("should create Chemical model from dto", () => {
  const model = new Chemical(chemicals[0]);
  expect(model.phi).toBe(chemicals[0].phi);
  expect(model.name).toBe(chemicals[0].name);
  expect(model.activeIngredient).toBe(chemicals[0].activeIngredient);
  expect(model.chemicalType).toBe(chemicals[0].chemicalType);
});
