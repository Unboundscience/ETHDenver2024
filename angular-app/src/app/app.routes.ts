import { Routes } from '@angular/router';
import {JsonpocComponent} from "./features/jsonpoc/jsonpoc.component";

import {ProfileComponent} from "./features/profile/profile.component";
import {ProposalsPageComponent} from "./features/proposals/page/page.component";
import {LandingPgComponent} from "./features/landing-pg/landing-pg.component";

export const routes: Routes = [
  { path: 'json-poc', component: JsonpocComponent},
  { path: 'proposals', component: ProposalsPageComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'landing-pg', component: LandingPgComponent},
];
