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
  tableData: {
    testData: TestData[];
  }
}

export const initialState: AppState = {
  tableData: {
    testData: [],
  },
};
