import {Component, Input, OnInit} from "@angular/core";
import {Project} from "./project";
import {TaskListComponent} from "../task/task-list.component";
import {FileListComponent} from "../file/file-list.component"
import {ActivatedRoute} from "@angular/router";

/**
 * Represents a component which renders a single Project.
 * The project to be render is passed by a property binding
 * from the parent component {@link ProjectListComponent} to
 * the Input field project.
 * @class
 */
@Component ({
    moduleId: module.id,
    selector: 'project',
    templateUrl: 'project.component.html',
    directives: [TaskListComponent, FileListComponent]
})
export class ProjectComponent implements OnInit{
    projectId: number;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(){
          this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.projectId = id;
        });
    }
}