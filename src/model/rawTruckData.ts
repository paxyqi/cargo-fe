export interface RawTruck {
  code: string;
  name: string;
  dimension: {
    a: number;
    b: number;
    c: number;
  };
  maxload: number;
}
