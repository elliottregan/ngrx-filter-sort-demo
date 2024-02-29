import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { selectParams, selectQueryParams } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class RouterFacadeService {
  constructor(private readonly store: Store) {}

  readonly getParams$: Observable<Params> = this.store.select(selectParams);

  readonly getQueryParams$: Observable<Params> =
    this.store.select(selectQueryParams);
}
