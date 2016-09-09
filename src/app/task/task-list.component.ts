import {Component, OnInit} from "@angular/core";
import {Task} from "./task";
//import {TaskService} from "./task.service";
import {TaskComponent} from "./task.component";

/**
 * Renders a list of tasks provided from {@link TaskService}.
 * Uses dependency injection to load the service.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    directives: [TaskComponent],
    // providers: [TaskService]
})
export class TaskListComponent implements OnInit{
    tasks: Task[];

    constructor(/*private taskService: TaskService,*/) {
    }

    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. We use the
     * provided service to load all tasks.
     */
    ngOnInit() {
        // should call TaskService.getAllTasks() and set them in the tasks variable;
    }
}