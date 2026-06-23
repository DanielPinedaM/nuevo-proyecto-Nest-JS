/**
type de query params */
export type TQueryParams = Record<
  string,
  string | number | boolean | (string | number | boolean)[]
>;
