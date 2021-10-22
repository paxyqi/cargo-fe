import { TruckSpec } from "./truckSpec";
import { OrderSpec } from "./orderspec";
export interface Task {
  userid: string; // 由于set-cookie有问题，暂时空下
  note: string; // 可为空，目前暂时为空，后续可以加
  truckspecs: TruckSpec[];
  orderspecs: OrderSpec[];
}
