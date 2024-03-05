import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSortedTestData } from './selectors';
import { AppState, TestData } from './state';

@Injectable({
  providedIn: 'root',
})
export class TableDataFacadeService {
  constructor(private readonly store: Store<AppState>) {}

  readonly getTableData$: Observable<TestData[]> =
    this.store.select(selectSortedTestData);
}
