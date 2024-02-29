import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
          placeholder="Search by title..." />
      </div>
    </form>
  `,
  styleUrls: ['./data-table-controls.component.scss'],
})
export class DataTableFormComponent implements OnInit {
  @Output() formValuesChange = new EventEmitter<any>();

  form: FormGroup = new FormGroup({
    filterQuery: new FormControl(''),
    pageIndex: new FormControl(0),
    pageSize: new FormControl(20),
    sortCol: new FormControl(0),
    sortDir: new FormControl('des'),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((values) => {
      this.formValuesChange.emit(values);
    });
  }
}
