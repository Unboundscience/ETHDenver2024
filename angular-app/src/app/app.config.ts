import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {allIcons} from "angular-feather/icons";
import { FeatherModule } from 'angular-feather';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideAnimations(),
              importProvidersFrom(FeatherModule.pick(allIcons)),
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'YYYY MMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY MMM',
        },
      },
    },]
};
