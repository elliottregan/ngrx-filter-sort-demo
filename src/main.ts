import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { testDataReducer } from './app/store/testData';
import { paramsReducer } from './app/store/router';
import { routes } from './app.routes';
import { App } from './app.component';
import { CustomRouterStateSerializer } from './app/store/router/router-state-serializer';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideStore({
      params: paramsReducer,
      testData: testDataReducer,
      router: routerReducer,
    }),
    provideRouterStore({ serializer: CustomRouterStateSerializer }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
});