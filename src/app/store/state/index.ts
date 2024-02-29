export enum ConnectionState {
  Open,
  Closed,
  Error,
}

export interface TestData {
  title: string;
  status: ConnectionState;
  junk1: any;
  junk2: any;
}
export enum SortOptions {
  ASCENDING = 'asc',
  DESCENDING = 'des',
}

export interface AppState {
  params: {
    sortDir: SortOptions;
    sortCol: number;
    pageIndex: number;
    pageSize: number;
  };
  testData: TestData[];
}

export const initialState: AppState = {
  params: {
    sortDir: SortOptions.DESCENDING,
    sortCol: 0,
    pageIndex: 0,
    pageSize: 500000,
  },
  testData: [],
};
