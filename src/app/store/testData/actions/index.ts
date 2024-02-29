import { createAction, props } from '@ngrx/store';
import { TestData } from '../state';

export const setTestData = createAction(
  '[Test Data] Set',
  props<{ testData: TestData[] }>()
);
