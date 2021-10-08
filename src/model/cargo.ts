export interface ICargoItem {
  key?: number;
  code: string;
  name: string;
  dimension: [number, number, number];
  maxLoad: number;
  quantity: number;
}
