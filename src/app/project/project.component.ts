import {Component, Input} from "@angular/core";
import {Project} from "./project";

/**
 * Represents a component which renders a single Project.
 * The project to be render is passed by a property binding
 * from the parent component {@link ProjectListComponent} to
 * the Input field project.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'project',
    templateUrl: 'project.component.html'
})
export class ProjectComponent {
    @Input() project: Project;
}