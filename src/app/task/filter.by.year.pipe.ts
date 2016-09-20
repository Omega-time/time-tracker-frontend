import {Pipe, PipeTransform} from '@angular/core';
import {Task} from "./task";

/**
 * YearPipe class that implements the PipeTransform.
 * It is used to filter the existing tasks of a project by a selected year.
 */
@Pipe({ name: 'YearPipe' })
export class YearPipe implements PipeTransform {
    transform(tasks: Task[], args: any) {
        let year = args;
        if (year == '') {
            return tasks;
        } else {
            return tasks.filter(task => { return task.date.getFullYear() == year });
        }
    }
}