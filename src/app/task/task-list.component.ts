import {Component, OnInit, Input, Pipe} from "@angular/core";
import {Task} from "./task";
import {TaskService} from "./task.service";
import {TaskComponent} from "./task.component";
import {TaskFormComponent} from "./task-form.component";
import {Router, ActivatedRoute } from "@angular/router";

import { YearPipe } from './filter.by.year.pipe';
import { MonthPipe } from './filter.by.month.pipe';
import { DayPipe } from './filter.by.day.pipe';

/**
 * Renders a list of tasks provided from {@link TaskService}.
 * Uses dependency injection to load the service.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'task-list',
    templateUrl: 'task-list.component.html',
    providers: [TaskService],
    directives: [TaskComponent, TaskFormComponent],
    pipes: [YearPipe, MonthPipe, DayPipe]
})
export class TaskListComponent implements OnInit {
    client: boolean;
    tasks: Task[];
    projectId: number;
    years: String[];
    months: String[];
    days: String[];
    yearFilter = '';
    monthFilter = '';
    dayFilter = '';

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
        this.client = sessionStorage.getItem("client") === "true";
        this.getProjectTasks();
    }

    /**
     * Gets all tasks for the current project. And populates the months and years
     * arrays in order to fill datalists to help us sort by them.
     */
    getProjectTasks() {
        this.years = [];
        this.months = [];
        this.days = [];
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.projectId = id;
            this.taskService.getAllTasksByProjectId(id)
                .then(tasks => {
                    this.tasks = tasks
                    if (this.tasks != null) {
                        this.tasks.forEach(task => {
                            task.date = new Date(task.date);
                            if (this.years.indexOf(task.date.getFullYear()) === -1) {
                                this.years.push(task.date.getFullYear());
                            }
                            if (this.months.indexOf(task.date.getMonth()) === -1) {
                                this.months.push(task.date.getMonth());
                            }
                            if (this.days.indexOf(task.date.getDate()) === -1) {
                                this.days.push(task.date.getDate());
                            }
                        });
                    }
                })
                .catch(err => console.error(err));
        });
    }
}
