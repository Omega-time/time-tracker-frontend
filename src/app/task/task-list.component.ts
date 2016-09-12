import {Component, OnInit, Input} from "@angular/core";
import {Task} from "./task";
import {TaskService} from "./task.service";
import {TaskComponent} from "./task.component";
import {TaskFormComponent} from "./task-form.component";
import {Router, ActivatedRoute } from "@angular/router";

/**
 * Renders a list of tasks provided from {@link TaskService}.
 * Uses dependency injection to load the service.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    directives: [TaskComponent , TaskFormComponent],
    providers: [TaskService]
})
export class TaskListComponent implements OnInit {
    tasks: Task[];
    projectId: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private taskService: TaskService) {
    }

    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. We use the
     * provided service to load all tasks.
     */
    ngOnInit() {
        this.getProjectTasks();
    }

    /**
     * Gets all tasks for the current project.
     */
    getProjectTasks() {
         this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.projectId = id;
            this.taskService.getAllTasksByProjectId(id)
                .then(tasks => this.tasks = tasks)
                .catch(err => console.error(err));
        });
    }
}