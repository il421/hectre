type OutputType =
  | "bins"
  | "varieties"
  | "staff"
  | "workingHours"
  | "rate"
  | "laborCosts";

interface OutputProps {
  title: OutputType;
  output: string;
  withCurrency?: boolean;
  currencyPrefix?: string;
  currencySign?: string;
}

export enum Titles {
  bins = "Total Bins",
  varieties = "Total Varieties",
  staff = "Total Staff",
  workingHours = "Total Working Hours",
  rate = "Average Rate",
  laborCosts = "Total Labor Cost"
}

export type { OutputProps, OutputType };
