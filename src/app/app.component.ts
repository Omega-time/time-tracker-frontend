import { Component, OnInit } from '@angular/core';
import {ProjectListComponent} from "./project/project-list.component";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from './auth/auth.service'

/**
 * Represents the main class from where the Angular App starts.
 * @class
 */
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ProjectListComponent, ROUTER_DIRECTIVES],
  providers: [AuthService]
})
export class AppComponent{

  constructor(private authService: AuthService) {
  }

}
