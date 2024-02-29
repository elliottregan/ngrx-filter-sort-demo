import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { map } from "rxjs/operators";
import { selectSortedTestData, setTestData } from "../../store/testData";
import { AppState } from "../../store/state";
import { generateTestData } from "../../../lib/generate-data";
import { filterBy, pageData } from "../../../lib/data-ultils";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <form [formGroup]="form">
      <input type="number" formControlName="pageIndex" />
      <input
        type="search"
        formControlName="filterQuery"
        placeholder="Search by title..."
      />
    </form>
    <table>
      <thead>
        <tr>
          <th>
            <a
              [routerLink]="[]"
              [queryParams]="getSortParams(0)"
              queryParamsHandling="merge"
              >Title</a
            >
          </th>
          <th>
            <a
              [routerLink]="[]"
              [queryParams]="getSortParams(1)"
              queryParamsHandling="merge"
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
  form: FormGroup = new FormGroup({
    filterQuery: new FormControl(""),
    pageIndex: new FormControl(0),
    pageSize: new FormControl(20),
    sortCol: new FormControl(0),
    sortDir: new FormControl("des"),
  });

  testData$ = this.store.select(selectSortedTestData).pipe(
    map((data) => filterBy(data, "title", this.form.get("filterQuery")?.value)),
    map((data) =>
      pageData(
        data,
        this.form.get("pageSize")?.value,
        this.form.get("pageIndex")?.value,
      ),
    ),
  );

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscribeToFormChanges();
    this.subscribeToQueryParams();
  }

  ngOnInit(): void {
    const testData = generateTestData(1000);
    this.store.dispatch(setTestData({ testData }));
  }

  getSortParams(column: number) {
    const currentSortCol = this.form.get("sortCol")?.value;
    const currentSortDir = this.form.get("sortDir")?.value;
    let newSortDir = "asc";

    if (currentSortCol === column && currentSortDir === "asc") {
      newSortDir = "des";
    }

    return {
      sortCol: column,
      sortDir: newSortDir,
    };
  }

  private subscribeToFormChanges() {
    this.form.valueChanges.subscribe((formValues) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: formValues,
        queryParamsHandling: "merge",
      });
    });
  }

  private subscribeToQueryParams() {
    this.route.queryParams.subscribe(
      ({ filterQuery, pageIndex, sortCol, pageSize, sortDir }) => {
        console.log(+pageIndex);
        this.form.patchValue(
          {
            filterQuery: filterQuery || "",
            pageIndex: +pageIndex || 0,
            pageSize: +pageSize || 20,
            sortCol: +sortCol || 0,
            sortDir: sortDir,
          },
          { emitEvent: false }, // Prevents infinite loop
        );
      },
    );
  }
}
