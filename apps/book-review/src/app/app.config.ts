import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';

import { provideTrpcClient } from '../trpc-client';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideContent(withMarkdownRenderer()),
    provideTrpcClient(),
  ],
};
