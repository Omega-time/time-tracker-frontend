import { Component } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    constructor(private oAuthService: OAuthService) {
    }

    public login() {
        this.oAuthService.initImplicitFlow();
    }

    public logoff() {
        this.oAuthService.logOut();
    }

    public get name() {
        let claims = this.oAuthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims.given_name;
    }
}
