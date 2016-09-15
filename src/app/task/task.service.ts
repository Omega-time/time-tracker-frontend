import {Injectable} from "@angular/core";
import { Http } from "@angular/http";
import {Task} from "./task";
import 'rxjs/Rx';

/**
 * Class which handles all HTTP requests to the
 * business layer. It stores and retrieves {@link Task}
 * objects. Uses map method to parse JSON strings to Task
 * instances.
 * @class
 */
@Injectable()
export class TaskService {
    private serviceUrl = 'http://localhost:8080/tasks';

    constructor(private http: Http) {
    }

    /**
     * Retrieves all tasks for a given project from the business layer.
     * @returns {Task<Task[]>} a promise which holds an array of Tasks objects
     */
    getAllTasksByProjectId(projectId: number): Promise<Task[]> {
        return this.http.get(this.serviceUrl + `/${projectId}`)
            .map(response => response.json())
            .map(tasks => tasks.map(
                task => Task.parseInputObjectToTask(task)
            ))
            .toPromise();
    }

    /**
     * Retrieves a single task object by a given id.
     * @param id the id by which it searches
     * @returns {Promise<Task>} a promise which holds a single task object
     */
    getTaskById(id: number): Promise<Task> {
        return this.http.get(this.serviceUrl + `/${id}`)
            .map(response => response.json())
            .map(task => Task.parseInputObjectToTask(task))
            .toPromise();
    }

    /**
     * Deletes a single task object by a given id.
     * @param id the id by which it deletes the task
     * @returns {Promise<Object>} a promise which holds an anonymous object
     *                            which holds a response.
     */
    deleteTaskById(id: number): Promise<Object> {
        return this.http.delete('http://localhost:8080/task' + `/${id}`)
            .map(response => response.json())
            .toPromise();
    }

    /**
     * Stores a task in the business layer.
     * @param task the task to be stored
     * @returns {Promise<Object>} a promise which holds an anonymous object
     *                            which holds the new task id
     */
    saveTask(task: Task, id: number): Promise<Object> {
        return this.http.post(this.serviceUrl + `/${id}`, task)
            .map(response => response.json())
            .toPromise();
    }
}