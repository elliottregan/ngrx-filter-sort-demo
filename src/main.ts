import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { testDataReducer } from './app/store/testData';
import { routes } from './app.routes';
import { App } from './app.component';
import { CustomRouterStateSerializer } from './app/store/router/router-state-serializer';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({
      name: 'tableData',
      reducer: testDataReducer,
    }),
    provideState({
      name: 'router',
      reducer: routerReducer,
    }),
    provideRouterStore({ serializer: CustomRouterStateSerializer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
