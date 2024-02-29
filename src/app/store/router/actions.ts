import { createAction, props } from '@ngrx/store';

export const setSortDirectionAsc = createAction(
  '[Params] Set Sort Direction Asc'
);

export const setSortDirectionDes = createAction(
  '[Params] Set Sort Direction Des'
);

export const setSortColumn = createAction(
  '[Params] Set Sort Column',
  props<{ sortCol: number }>()
);

export const setPageIndex = createAction(
  '[Data Table] Set Page Index',
  props<{ pageIndex: number }>()
);
