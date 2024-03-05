import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterState>
{
  serialize = (state: RouterStateSnapshot): RouterState => ({
    url: state.url,
    params: mergeRouteParams(state.root, ({ params }) => params),
    queryParams: mergeRouteParams(state.root, ({ queryParams }) => queryParams),
  });
}

const mergeRouteParams = (
  route: ActivatedRouteSnapshot,
  getter: (activatedRoute: ActivatedRouteSnapshot) => Params
): Params =>
  !route
    ? {}
    : {
        ...getter(route),
        ...mergeRouteParams(
          (route.children.find(({ outlet }) => outlet === 'primary') ||
            route.firstChild) as ActivatedRouteSnapshot,
          getter
        ),
      };
