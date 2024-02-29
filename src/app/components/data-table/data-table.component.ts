import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectQueryParams } from '../../store/router';
import { selectPagedTestData } from '../../store/testData';
import { AppState, TestData } from '../../store/state';
import { generateTestData } from '../../../lib/generate-data';
import { setPageIndex, setSortColumn } from '../../store/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { setTestData } from '../../store/testData';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <pre>queryParams: {{ queryParams$ | async | json }}</pre>
    <input type="number" [ngModel]="pageQuery" (ngModelChange)="changePage($event)" />
    <input type="search" [ngModel]="filterQuery" (ngModelChange)="filterQuerySubject.next($event)" placeholder="Search by title..." />
    <table>
      <thead>
        <tr>
          <th (click)="changeSortColumn(0)">Title</th>
          <th (click)="changeSortColumn(1)">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of testData$ | async">
          <td>{{ data.title }}</td>
          <td>{{ data.status }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  filterQuerySubject = new BehaviorSubject<string>('');
  pageQuerySubject = new BehaviorSubject<number>(0);

  filterQuery = ''; // To be used with ngModel for the filter input
  pageQuery = 0; // To be used with ngModel for the page input

  testData$ = combineLatest([
    this.store.select(selectPagedTestData),
    this.filterQuerySubject.asObservable(),
  ]).pipe(map(([data, query]) => this.filterData(data, query)));

  queryParams$ = this.store.select(selectQueryParams);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const testData = generateTestData(10000);
    this.store.dispatch(setTestData({ testData }));
  }

  filterData(data: TestData[], query: string) {
    return data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  changeSortColumn(newSortCol: number): void {
    this.store.dispatch(setSortColumn({ sortCol: newSortCol }));
  }

  changePage(newPageIndex: number): void {
    this.pageQuery = newPageIndex; // Update the pageQuery for ngModel binding
    this.store.dispatch(setPageIndex({ pageIndex: newPageIndex }));
  }
}
