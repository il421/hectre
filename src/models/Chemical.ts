import { ChemicalDto } from "../api/chemicals";

export class Chemical {
  constructor(private dto: ChemicalDto) {}

  get chemicalType() {
    return this.dto.chemicalType ?? "";
  }

  get activeIngredient() {
    return this.dto.activeIngredient ?? "";
  }

  get name() {
    return this.dto.name ?? "";
  }

  get phi() {
    return this.dto.phi ?? "";
  }
}
