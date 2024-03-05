import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterState } from './router-state-serializer';

export const selectRouter =
  createFeatureSelector<RouterReducerState<RouterState>>('router');

export const selectQueryParams = createSelector(
  selectRouter,
  (router) => router.state.queryParams,
);
