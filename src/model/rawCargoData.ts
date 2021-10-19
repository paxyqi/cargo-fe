import { Orientation } from "./orientation";
export interface RawCargo {
    code: string;
    name: string;
    dimension: {
      a: number;
      b: number;
      c: number;
    };
    mass: number;
    availableorientations: Orientation[];
  }
  