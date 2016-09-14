import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Project} from "./project";
import {ProjectService} from "./project.service";
import {Router} from "@angular/router";

/**
 * Represents a form which sends a new project to
 * the {@link ProjectService} for storage.
 * Uses dependency injection for the service providers.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'project-form',
    templateUrl: 'project-form.component.html',
    providers: [ProjectService]
})
export class ProjectFormComponent implements OnInit {
    projectToBeCreated: Project;
    @Output() newProjectAdded = new EventEmitter<boolean>();

    constructor(private projectService: ProjectService,
        private router: Router) {
    }

    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. Here
     * we instantiate the projectToBeCreated with an empty
     * Project object.
     */
    ngOnInit() {
        this.projectToBeCreated = Project.createEmptyProject();
    }

    /**
     * EventHandler method which is called when the Add new project
     * button is clicked. The method calls the service to store
     * the projectToBeCreated object.
     */
    addProject() {
        this.projectService.saveProject(this.projectToBeCreated)
            .then(newProjectId => {
                this.router.navigateByUrl("/projects");
                this.newProjectAdded.emit(true);
                this.formReset();
            });
    }

    formReset() {
        this.projectToBeCreated = Project.createEmptyProject();
    }
}
