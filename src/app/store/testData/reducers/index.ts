import { createReducer, on } from '@ngrx/store';
import {
  setTestData,
} from '../actions';
import { initialState } from '../state';

export const testDataReducer = createReducer(
  initialState.testData,
  on(setTestData, (state, { testData }) => testData)
);
