import {provideRouter, RouterConfig} from '@angular/router';
import {ProjectFormComponent} from "./project/project-form.component";
import {ProjectListComponent} from "./project/project-list.component";
import {PageNotFoundComponent} from "./pagenotfound.component";

/**
 * Defined routes for our Router.
 */
const routes: RouterConfig = [
    {path: '', redirectTo:'/projects', pathMatch: 'full'},
    {path: 'projects', component: ProjectListComponent},
    {path: 'projects/create', component: ProjectFormComponent},
    {path: '**', component: PageNotFoundComponent}
    ];

/**
 * Exports a service provider for our router
 */
export const appRouterProviders = [
    provideRouter(routes)
];