import {Component, OnInit} from "@angular/core";
import {Project} from "./project";
import {ProjectService} from "./project.service";
import {ProjectComponent} from "./project.component";

/**
 * Renders a list of projects provided from {@link ProjectService}.
 * Uses dependency injection to load the service.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'project-list',
    templateUrl: 'project-list.component.html',
    directives: [ProjectComponent],
    providers: [ProjectService]
})
export class ProjectListComponent implements OnInit{
    projects: Project[];

    constructor(private projectService: ProjectService) {
    }

    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. We use the
     * provided service to load all projects.
     */
    ngOnInit() {
        this.projectService.getAllProjects()
            .then(projects => this.projects = projects)
            .catch(err=>console.error(err));
    }
}