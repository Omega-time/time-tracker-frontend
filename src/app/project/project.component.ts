import {Component, Input} from "@angular/core";
import {Project} from "./project";
import {TaskListComponent} from "../task/task-list.component";
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
    selector: 'project',
    templateUrl: 'project.component.html',
    directives: [TaskListComponent]
})
export class ProjectComponent {
    projectId: number;
    constructor(private router: Router) {

    }
    @Input() project: Project;

    ngOnInit() {

    }
    goToTaskList() {
        this.router.navigate(['/project', this.project.id]);
    }
}