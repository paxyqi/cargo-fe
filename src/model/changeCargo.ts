import { Orientation } from "./orientation";
export interface IChangeCargoForm {
    key: number;
    dimension: {
      length: number;
      width: number;
      hight: number;
    };
    mass: number;
    quantity: number;
    availableOrientation: Orientation[];
}