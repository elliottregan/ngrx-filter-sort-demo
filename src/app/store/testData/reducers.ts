import { createReducer, on } from '@ngrx/store';
import {
  setTestData,
} from './actions';
import { initialState } from './state';

export const testDataReducer = createReducer(
  initialState,
  on(setTestData, (state, { testData }) => {
    return { ...state, testData }
  })
);
