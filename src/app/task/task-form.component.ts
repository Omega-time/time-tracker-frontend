import {Component, OnInit, EventEmitter, Output, Input} from "@angular/core";
import {Task} from "./task";
import {TaskService} from "./task.service";

/**
 * Represents a form which sends a new task to
 * the {@link TaskService} for storage.
 * Uses dependency injection for the service providers.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'task-form',
    templateUrl: 'task-form.component.html',
    providers: [TaskService],

})

export class TaskFormComponent implements OnInit {
    taskToBeCreated: Task;
    @Input() projectId: number;
    duration = {
        hours: null,
        minutes: null
    }
    @Output() newTaskAdded = new EventEmitter<boolean>();
    active = true;

    constructor(private taskService: TaskService) {
    }

    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. Here
     * we instantiate the taskToBeCreated with an empty
     * Task object through the {@link formReset}.
     */
    ngOnInit() {
        this.formReset();
    }

    /**
     * EventHandler method which is called when the Add new task
     * button is clicked. The method calls the service to store
     * the taskToBeCreated object.
     */
    addTask() {
        this.taskToBeCreated.setTotalDuration(this.duration);
        this.taskService.saveTask(this.taskToBeCreated, this.projectId)
            .then(resp => {
                this.newTaskAdded.emit(true);
                this.formReset();
            })
            .catch(err => console.log(err));
    }

    /**
     * Resets the Add Task form by giving taskToBeCreated an empty Task object. 
     */
    formReset() {
        this.duration.hours = null;
        this.duration.minutes = null;
        this.taskToBeCreated = Task.createEmptyTask();
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }
}
