import {Component, OnInit} from "@angular/core";
import {Project} from "./project";
import {ProjectService} from "./project.service";
import {ProjectButtonComponent} from "./project-button.component";
import {ProjectFormComponent} from "./project-form.component";
import {Accordion, AccordionGroup} from '../accordion';


/**
 * Renders a list of projects provided from {@link ProjectService}.
 * Uses dependency injection to load the service.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'project-list',
    templateUrl: 'project-list.component.html',
    directives: [ProjectButtonComponent, ProjectFormComponent , Accordion, AccordionGroup],
    providers: [ProjectService]
})
export class ProjectListComponent implements OnInit {
    projects: Project[];
    clientProjects: Project[];
    noProjects: boolean;
    noClientProjects: boolean;
    collapsed = true;
    isGroupOpen = false;

    constructor(private projectService: ProjectService) {
    }

    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. We use the
     * provided service to load all projects.
     */
    ngOnInit() {
        //removes the fragment from the url
        history.pushState("", document.title, window.location.pathname);
        this.getAllProjects();
    }

    /**
     * Gets all projects for the current user.
     */
    getAllProjects() {
        this.clientProjects = [];
        this.projectService.getAllProjects()
            .then(projects => {
              this.projects = projects.filter(p=> {
                var result = true;
                p.clients.forEach(client=> {
                  var clientId = JSON.parse(sessionStorage.getItem("id_token_claims_obj")).sub;
                  if(clientId === client["user_id"]) {
                    result = false;
                    this.clientProjects.push(p);
                  }
                });
                this.noClientProjects = this.isEmpty(this.clientProjects);
                return result;
              })
              this.noProjects = this.isEmpty(this.projects);
            })
            .catch(err => console.error(err));
    }
    collapse() {
        this.collapsed = !this.collapsed;
    }

    isEmpty(array: any){
        if(array.lenght == 0){
            return true;
        }
        return false;
    }
}

