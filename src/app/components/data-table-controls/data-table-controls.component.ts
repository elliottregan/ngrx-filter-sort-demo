import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-data-table-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <div class="form-control">
        <label for="pageIndex">Page Index</label>
        <input type="number" formControlName="pageIndex" id="pageIndex" />
      </div>

      <div class="form-control">
        <label for="filterQuery">Search by Title</label>
        <input
          type="search"
          formControlName="filterQuery"
          id="filterQuery"
          placeholder="Search by title..."
        />
      </div>
    </form>
  `,
  styleUrls: ["./data-table-controls.component.scss"],
})
export class DataTableFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    filterQuery: new FormControl(""),
    pageIndex: new FormControl(0),
    pageSize: new FormControl(20),
    sortCol: new FormControl(0),
    sortDir: new FormControl("des"),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((values) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: values,
        queryParamsHandling: "merge",
      });
    });
  }
}
