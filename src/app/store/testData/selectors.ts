import { createSelector } from "@ngrx/store";
import { AppState, TestData } from "./state";
import { selectQueryParams } from "../router";
import { sortTestData } from "../../../lib/data-ultils";

export const selectTestData = (state: AppState): TestData[] => {
    return state.tableData.testData
};

export const selectSortedTestData = createSelector(
    selectTestData,
    selectQueryParams,
    // TODO: Why isn't this memoized?
    sortTestData,
);
