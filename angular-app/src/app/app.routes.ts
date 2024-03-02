import { Routes } from '@angular/router';
import {JsonpocComponent} from "./features/jsonpoc/jsonpoc.component";

import {ProfileComponent} from "./features/profile/profile.component";
import {ProposalsPageComponent} from "./features/proposals/page/page.component";
import {LandingPgComponent} from "./features/landing-pg/landing-pg.component";
import {SignUpFlowComponent} from "./features/sign-up-flow/sign-up-flow.component";
import {DaoApproveComponent} from "./features/dao-approve/dao-approve.component";

export const routes: Routes = [
  { path: 'json-poc', component: JsonpocComponent},
  { path: 'proposals', component: ProposalsPageComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'landing-pg', component: LandingPgComponent},
  { path: 'sign-up', component: SignUpFlowComponent},
  { path: 'dao-approve', component: DaoApproveComponent},
  {
    path: 'dashboard',
    loadChildren: () =>
        import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE),
  },
  { path: '', component: LandingPgComponent},
];
