import { Cargoblock } from "./cargoblock";

export interface Truckschemes {
  cargoblocks: Cargoblock[];
  truckdimension: {
    a: number;
    b: number;
    c: number;
  };
  trucktypecode: string;
}
