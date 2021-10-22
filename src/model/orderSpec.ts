import { CargoSpec } from "./cargoSpec";
export interface OrderSpec {
  code: string;
  priority: number;
  cargospecs: CargoSpec[];
}
