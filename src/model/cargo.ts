import { Orientation } from "./orientation";
export interface ICargoItem {
  key: number;
  code: string;
  name: string;
  length: number;
  width: number;
  hight: number;
  mass: number;
  quantity: number;
  availableOrientation: Orientation[];
}
