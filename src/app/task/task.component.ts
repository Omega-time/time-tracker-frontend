import {Component, Input, Output, EventEmitter, ElementRef} from "@angular/core";
import {Task} from "./task";
import {TaskService} from "./task.service";

/**
 * Represents a component which renders a single Task.
 * The task to be render is passed by a property binding
 * from the parent component {@link TaskListComponent} to
 * the Input field project.
 * @class
 */
@Component({
    moduleId: module.id,
    selector: 'task',
    templateUrl: 'task.component.html',
    host: {
        '(document:click)': 'handleClick($event)'
    }
})
export class TaskComponent {
    @Input() task: Task;
    @Output() taskDeleted = new EventEmitter<boolean>();
    confirmDelete: boolean;
    public elementRef;

    constructor(private taskService: TaskService,
        private myElement: ElementRef) {
        this.elementRef = myElement;
    }

    /**
     * Initiates the deletion of a tasks. Displays the confirmation dialog for deletion.
     */
    onClickDelete(event: any) {
        this.confirmDelete = true;
    }

    /**
     * Deletes the task after user confirmation. 
     */
    deleteTask(taskId: number) {
        this.taskService
            .deleteTaskById(taskId)
            .then(resp => {
                this.taskDeleted.emit(true);
            })
            .catch(error => {
                console.error(error);
                this.taskDeleted.emit(true);
            });
    }

    /**
     * Listens for click events in and outside of this component.
     * We use it to hide the deletion dialog of current task.
     */
    handleClick(event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.confirmDelete = false;
        }
    }
}