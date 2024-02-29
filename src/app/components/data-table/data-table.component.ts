import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { combineLatestWith, map } from "rxjs/operators";
import { selectSortedTestData, setTestData } from "../../store/testData";
import { AppState } from "../../store/state";
import { generateTestData } from "../../../lib/generate-data";
import { filterBy, pageData } from "../../../lib/data-ultils";
import { DataTableFormComponent } from "../data-table-controls/data-table-controls.component";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [CommonModule, RouterModule, DataTableFormComponent],
  template: `
    <app-data-table-form
      (formValuesChange)="onFormValuesChange($event)"
    ></app-data-table-form>
    <table>
      <thead>
        <tr>
          <th>
            <a
              [routerLink]="[]"
              [queryParams]="{ sortDir, sortCol: 0 }"
              queryParamsHandling="merge"
              (click)="toggleSortDirection(0)"
              >Title</a
            >
          </th>
          <th>
            <a
              [routerLink]="[]"
              [queryParams]="{ sortDir, sortCol: 1 }"
              queryParamsHandling="merge"
              (click)="toggleSortDirection(1)"
              >Status</a
            >
          </th>
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
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent {
  testData$ = this.store.select(selectSortedTestData).pipe(
    combineLatestWith(this.route.queryParams),
    map(([data, params]) => {
      const filteredData = filterBy(data, "title", params["filterQuery"]);
      return pageData(
        filteredData,
        Number(params["pageSize"]) || 20,
        Number(params["pageIndex"]) || 0,
      );
    }),
  );

  sortCol: number = 0;
  sortDir: "des" | "asc" = "des";

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const testData = generateTestData(2200);
    this.store.dispatch(setTestData({ testData }));
  }

  toggleSortDirection(column: number) {
    this.sortDir =
      this.sortCol === column && this.sortDir === "asc" ? "des" : "asc";
    this.sortCol = column;
  }

  onFormValuesChange(formValues: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: formValues,
      queryParamsHandling: "merge",
    });
  }
}
