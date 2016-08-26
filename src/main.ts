import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { appRouterProviders  } from './app/app.routing';
import { disableDeprecatedForms, provideForms} from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

/**
 * Runs the angular 2 app by supplying
 * with the needed service providers
 * and declaring the start component
 */
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    appRouterProviders,
    disableDeprecatedForms(),
    provideForms()
]).catch(error => console.error(error));
