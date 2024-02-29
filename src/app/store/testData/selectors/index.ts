import { createSelector } from '@ngrx/store';
import { AppState, TestData, SortOptions } from '../state';
import { selectQueryParams } from '../../router/selectors';

export const selectTestData = (state: AppState) => state.testData;

export const selectTestDataLength = createSelector(
  selectTestData,
  (data) => data.length
);

export const selectSortedTestData = createSelector(
  selectTestData,
  selectQueryParams,
  (data, params) => {
    return sortTestData(data, params['sortDir'], params['sortCol']);
  }
);

export const selectPagedTestData = createSelector(
  selectSortedTestData,
  selectQueryParams,
  (testData, params) => {
    const pageSize = params['pageSize'] || 20;
    const pageIndex = params['pageIndex'] || 0;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return testData.slice(startIndex, endIndex);
  }
);

function sortTestData(
  data: TestData[],
  sortDir: SortOptions = SortOptions.ASCENDING,
  sortCol: number = 0
): TestData[] {
  return [...data].sort((a, b) => {
    const colKeys = Object.keys(a) as Array<keyof TestData>;
    const colKey = colKeys[sortCol];

    const propA = a[colKey].toLowerCase();
    const propB = b[colKey].toLowerCase();

    if (sortDir === SortOptions.ASCENDING) {
      return propA < propB ? -1 : propA > propB ? 1 : 0;
    } else {
      return propA > propB ? -1 : propA < propB ? 1 : 0;
    }
  });
}
