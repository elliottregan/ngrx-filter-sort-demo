import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { combineLatestWith, map } from "rxjs/operators";
import { filterBy, pageData } from "../../../lib/data-ultils";
import { DataTableFormComponent } from "../data-table-controls/data-table-controls.component";
import { TableDataFacadeService } from "../../store/testData/facade";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [CommonModule, RouterModule, DataTableFormComponent],
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent {
  testData$ = this.facade.getTableData$.pipe(
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
  // TODO: use the real model
  sortDir: "des" | "asc" = "des";

  constructor(
    private route: ActivatedRoute,
    private facade: TableDataFacadeService,
  ) {}

  toggleSortDirection(column: number) {
    this.sortDir =
      this.sortCol === column && this.sortDir === "asc" ? "des" : "asc";
    this.sortCol = column;
  }
}
