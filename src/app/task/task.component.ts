import {Component, Input} from "@angular/core";
import {Task} from "./task";

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
    templateUrl: 'task.component.html'
})
export class TaskComponent {
    @Input() task: Task;
}