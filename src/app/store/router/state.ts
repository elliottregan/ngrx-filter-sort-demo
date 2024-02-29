export enum SortOptions {
  ASCENDING = 'asc',
  DESCENDING = 'des',
}

export interface AppParamsState {
  params: {
    sortDir: SortOptions;
    sortCol: number;
    pageIndex: number;
    pageSize: number;
  };
}

export const initialState: AppParamsState = {
  params: {
    sortDir: SortOptions.DESCENDING,
    sortCol: 0,
    pageIndex: 0,
    pageSize: 500000,
  },
};
