import { RefData } from "../api/harvest";

/**
 * Returns unit elements of an array
 * @param items
 */
export const unique = <T>(items: T[]): T[] => {
  return Array.from(new Set(items));
};

/**
 * Converts an object to array where the first element is object key and the last one is its value
 * @param obj
 */
export const toArray = <T extends object>(obj: T) =>
  Object.keys(obj).map(key => [key, obj[key]]);

/**
 * Converts refData to Map
 * @param arr
 */
export const refDataToMap = (arr: RefData[]): Map<string, string> =>
  new Map(arr.map((dto: RefData) => [dto.id, dto.name]));

/**
 * Generate random color code
 */
export const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

/**
 * Returns rounded number
 */
export const toLocalRound = (num: Number, fraction?: number) =>
  Number(num.toFixed(fraction ?? 2)).toLocaleString();

/**
 * Converts Map to refData
 * @param map
 */
export const refDataToObj = (map: Map<string, string>): RefData[] =>
  Array.from(map.keys()).map(key => ({ id: key, name: map.get(key)! }));

/**
 * Capitalize first string letter
 * @param value
 */
export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
};
