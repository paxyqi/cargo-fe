export interface IChangeCargoItem {
  dimension: {
    length: number;
    width: number;
    hight: number;
  };
  maxLoad: number;
  quantity: number;
}
