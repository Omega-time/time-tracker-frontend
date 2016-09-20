import {Pipe, PipeTransform} from '@angular/core';
import {Task} from "./task";

/**
 * DayPipe class that implements the PipeTransform.
 * It is used to filter the existing tasks of a project by a selected day.
 */
@Pipe({ name: 'DayPipe' })
export class DayPipe implements PipeTransform {
    transform(tasks: Task[], args: any) {
        let day = args;
        if (day == '') {
            return tasks;
        } else {
            return tasks.filter(task => { return task.date.getDate() == day });
        }
    }
}