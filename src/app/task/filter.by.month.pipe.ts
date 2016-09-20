import {Pipe, PipeTransform} from '@angular/core';
import {Task} from "./task";

/**
 * MonthPipe class that implements the PipeTransform.
 * It is used to filter the existing tasks of a project by a selected month.
 */
@Pipe({ name: 'MonthPipe' })
export class MonthPipe implements PipeTransform {
  transform(tasks: Task[], args: any) {
    let month = args;
    if (month == '') {
      return tasks;
    } else {
      return tasks.filter(task => { return task.date.getMonth() == month - 1 });
    }
  }
}