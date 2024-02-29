import { createSelector } from "@ngrx/store";
import { AppState } from "../state";
import { selectQueryParams } from "../../router";
import { sortTestData } from "../../../../lib/data-ultils";

export const selectTestData = (state: AppState) => state.testData;

export const selectSortedTestData = createSelector(
    selectTestData,
    selectQueryParams,
    sortTestData,
);
