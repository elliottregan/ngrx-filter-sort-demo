import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { combineLatestWith, map } from "rxjs/operators";
import { selectSortedTestData } from "../../store/testData";
import { AppState } from "../../store/state";
import { filterBy, pageData } from "../../../lib/data-ultils";
import { DataTableFormComponent } from "../data-table-controls/data-table-controls.component";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [CommonModule, RouterModule, DataTableFormComponent],
  templateUrl: "./data-table.component.html",
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
    private route: ActivatedRoute,
  ) {}

  toggleSortDirection(column: number) {
    this.sortDir =
      this.sortCol === column && this.sortDir === "asc" ? "des" : "asc";
    this.sortCol = column;
  }
}
