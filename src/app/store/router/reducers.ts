import { createReducer, on } from '@ngrx/store';
import {
  setSortDirectionAsc,
  setSortColumn,
  setSortDirectionDes,
  setPageIndex,
} from './actions';
import { SortOptions, initialState } from '../state';

export const paramsReducer = createReducer(
  initialState.params,
  on(setSortDirectionAsc, (params) => ({
    ...params,
    sortDir: SortOptions.ASCENDING,
  })),
  on(setSortDirectionDes, (params) => ({
    ...params,
    sortDir: SortOptions.DESCENDING,
  })),
  on(setSortColumn, (params, { sortCol }) => ({
    ...params,
    sortCol,
  })),
  on(setPageIndex, (params, { pageIndex }) => ({
    ...params,
    pageIndex,
  }))
);
