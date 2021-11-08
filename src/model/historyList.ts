import { Truckschemes } from "./truckschemes";

export interface IHistoryList {
  id: number;
  taskid: string;
  timecost: number;
  truckschemes: Truckschemes[];
}
