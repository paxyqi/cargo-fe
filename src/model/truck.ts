export interface ITruckItem {
  key: number;
  code: string;
  name: string;
  dimension: [number, number, number];
  maxLoad: number;
  quantity: number;
}
