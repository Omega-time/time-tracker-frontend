import {Injectable} from "@angular/core";
import { Http } from "@angular/http";
import {Project} from "./project";
import 'rxjs/Rx';

/**
 * Class which handles all HTTP requests to the
 * business layer. It stores and retrieves {@link Project}
 * objects. Uses map method to parse JSON strings to Project
 * instances.
 * @class
 */
@Injectable()
export class ProjectService {
    private serviceUrl = 'http://localhost:8080/projects';

    constructor(private http: Http) {
    }

    /**
     * Retrieves all projects from the business layer.
     * @returns {Promise<Project[]>} a promise which holds an array of Project objects
     */
    getAllProjects(): Promise<Project[]> {
        return this.http.get(this.serviceUrl)
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
        return this.http.get(this.serviceUrl + `/${id}`)
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
        return this.http.delete(this.serviceUrl + `/${id}`)
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
        return this.http.post(this.serviceUrl, project)
            .map(response => response.json())
            .toPromise();
    }
}