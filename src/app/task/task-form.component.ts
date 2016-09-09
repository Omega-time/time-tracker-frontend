import {Component, OnInit} from "@angular/core";
import {Task} from "./task";
//import {TaskService} from "./task.service";
import {Router} from "@angular/router";

/**
 * Represents a form which sends a new task to
 * the {@link TaskService} for storage.
 * Uses dependency injection for the service providers.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'task-form',
    templateUrl: 'task-form.component.html'
    // providers: [TaskService]
})
export class TaskFormComponent implements OnInit{
    taskToBeCreated: Task;

    constructor(/*private taskService: TaskService,*/ private router: Router) {
    }

    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. Here
     * we instantiate the taskToBeCreated with an empty
     * Task object.
     */
    ngOnInit() {
        this.taskToBeCreated = Task.createEmptyTask();
    }

    /**
     * EventHandler method which is called when the Add new task
     * button is clicked. The method calls the service to store
     * the taskToBeCreated object.
     */
    addTask() {
        // this.taskService.saveTask(this.taskToBeCreated)
        //     .then(newTaskId => this.router.navigateByUrl("/projects"));
    }
}
