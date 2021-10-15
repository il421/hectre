import { HarvestDto, HarvestRefData } from "../api/harvest";

export class Harvest {
  constructor(private dto: HarvestDto, private refData?: HarvestRefData) {}

  get id() {
    return this.dto.id;
  }

  get userId() {
    return this.dto.userId;
  }

  get varietyId() {
    return this.dto.varietyId;
  }

  get varietyName() {
    return this.refData?.variety.get(this.dto.varietyId);
  }

  get orchardId() {
    return this.dto.orchardId;
  }

  get orchardName() {
    return this.refData?.orchards.get(this.dto.orchardId);
  }

  get pickingDate() {
    return this.dto.pickingDate;
  }

  get numberOfBins() {
    return this.dto.numberOfBins;
  }

  get hoursWorked() {
    return this.dto.hoursWorked;
  }

  get payRatePerHour() {
    return this.dto.payRatePerHour;
  }

  get payRate() {
    return this.dto.hoursWorked * this.dto.payRatePerHour;
  }
}
