import {Component, Input} from "@angular/core";
import{Project} from "../project/project"
import {ProjectComponent} from "../project/project.component";
import {Router} from "@angular/router";

/**
 * Represents a component which renders a single Project.
 * The project to be render is passed by a property binding
 * from the parent component {@link ProjectListComponent} to
 * the Input field project.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'project-button',
    templateUrl: 'project-button.component.html',
    directives: [ProjectComponent]
})
export class ProjectButtonComponent {
    @Input() project: Project;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToProject() {
        this.router.navigate(['/project', this.project.id]);
    }
}