import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { generateTestData } from "./lib/generate-data";
import { setTestData } from "./app/store/testData";
import { Store } from "@ngrx/store";
import { AppState } from "./app/store/state";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Sort & Filter Demo</h1>
    <router-outlet></router-outlet>
  `,
})
export class App implements OnInit {
  name = "Angular";

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const testData = generateTestData(2200);
    this.store.dispatch(setTestData({ testData }));
  }
}
