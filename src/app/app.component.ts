import { Component } from '@angular/core';
import {ProjectListComponent} from "./project/project-list.component";
import {ROUTER_DIRECTIVES} from "@angular/router";

/**
 * Represents the main class from where the Angular App starts.
 * @class
 */
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ProjectListComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {
}
