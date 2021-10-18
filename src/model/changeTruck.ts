export interface IChangeTruckForm {
  key: number;
  dimension: {
    length: number;
    width: number;
    hight: number;
  };
  maxLoad: number;
  quantity: number;
}
