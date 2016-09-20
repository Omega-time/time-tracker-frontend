import {provideRouter, RouterConfig} from '@angular/router';
import {ProjectFormComponent} from "./project/project-form.component";
import {ProjectListComponent} from "./project/project-list.component";
import {ProjectComponent} from "./project/project.component";
import {PageNotFoundComponent} from "./pagenotfound.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth/auth-guard.service";

/**
 * Defined routes for our Router.
 */
const routes: RouterConfig = [
    {path: '', redirectTo:'/home', pathMatch: 'full'},
    {path: 'home', component: LoginComponent },
    {path: 'projects', component: ProjectListComponent, canActivate: [AuthGuard]},
    {path: 'projects/create', component: ProjectFormComponent, canActivate: [AuthGuard]},
    {path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard]},
    {path: '**', component: PageNotFoundComponent}
    
    ];

/**
 * Exports a service provider for our router
 */
export const appRouterProviders = [
    provideRouter(routes)
];