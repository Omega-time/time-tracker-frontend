import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Project} from "./project";
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";

/**
 * Class which handles all HTTP requests to the
 * business layer. It stores and retrieves {@link Project}
 * objects. Uses map method to parse JSON strings to Project
 * instances.
 * @class
 */
@Injectable()
export class ProjectService {
    private baseUrl = 'http://localhost:8080';
    private projectsServiceUrl = this.baseUrl + '/api/projects';


    constructor(private http: Http, private authService: AuthService) {
    }

    createAuthorizationHeader(headers?: Headers): Headers {
      let authHeaders = headers || new Headers();
      authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
      return authHeaders;
    }

    /**
     * Retrieves all projects from the business layer.
     * @returns {Promise<Project[]>} a promise which holds an array of Project objects
     */
    getAllProjects(): Promise<Project[]> {
        return this.http.get(this.projectsServiceUrl, {
              headers: this.createAuthorizationHeader()
            })
            .map(response => response.json())
            .map(projects => projects.map(
                project => Project.parseInputObjectToProject(project)
            ))
            .toPromise();
    }

    /**
     * Retrieves a single project object by a given id.
     * @param id the id by which it searches
     * @returns {Promise<Project>} a promise which holds a single project object
     */
    getProjectById(id: number): Promise<Project> {
        return this.http.get(this.projectsServiceUrl + `/${id}`, {
              headers: this.createAuthorizationHeader()
            })
            .map(response => response.json())
            .map(project => Project.parseInputObjectToProject(project))
            .toPromise();
    }

    /**
     * Deletes a single project object by a given id.
     * Deletes the tasks of the project as well.
     * @param id the id by which it deletes the project and its tasks
     * @returns {Promise<Object>} a promise which holds an anonymous object
     *                            which holds a response.
     */
    deleteProjectById(id: number): Promise<Object> {
        return this.http.delete(this.projectsServiceUrl + `/${id}`, {
              headers: this.createAuthorizationHeader()
            })
            .map(response => response.json())
            .toPromise();
    }

    /**
     * Stores a project in the business layer.
     * @param project the project to be stored
     * @returns {Promise<Object>} a promise which holds an anonymous object
     *                            which holds the new project id
     */
    saveProject(project: Project): Promise<Object> {
        return this.http.post(this.projectsServiceUrl, project, {
              headers: this.createAuthorizationHeader()
            })
            .map(response => response.json())
            .toPromise();
    }
}
