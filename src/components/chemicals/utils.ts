import { Chemical } from "../../models/Chemical";

export const filteredChemicals = (
  chemicals: Chemical[],
  show: number,
  page: number
): Chemical[] => {
  // return initial data if integers are not valid or no items
  if (!chemicals.length || show <= 0 || page < 1) return chemicals;

  const tempChemicals = [...chemicals];
  // get chunks number
  let chunks: number = Math.ceil(chemicals.length / show);
  const portions: Chemical[][] = [];

  while (chunks > 0) {
    portions.push(tempChemicals.splice(0, show));
    chunks -= 1;
  }

  // return a portion of chemical by page
  return portions[page - 1];
};
