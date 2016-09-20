import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { appRouterProviders  } from './app/app.routing';
import { disableDeprecatedForms, provideForms} from '@angular/forms';
import { AuthGuard } from './app/auth/auth-guard.service';
import { AuthService } from './app/auth/auth.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';


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
    OAuthService,
    AuthService,
    AuthGuard,
    disableDeprecatedForms(),
    provideForms()
]).catch(error => console.error(error));
