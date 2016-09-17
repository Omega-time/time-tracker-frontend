import { Pipe, PipeTransform} from '@angular/core';

/**
 * DurationPipe will be used to transform duration of Task object.
 * This pipe will help us to display the duration of Task in 
 * format H:M. (hours and minutes)
 */
@Pipe({
    name: 'durationPipe'
})
export class DurationPipe implements PipeTransform {
    
    /**
     * This method will transform duration of Task object without modifying it.
     * To display duration in the hours field in tasks lits, we need to set the
     * parameter isHoursField to true, and respectively to false if we want to
     * display the minutes of the task in the (@see {@link task.component.html})
     * 
     * @param {number} total duration of the Task object in minutes
     * @param {boolean} defines if the field which will display the 
     *                  duration is hours or minutes.
     */
    transform(totalDuration: number, isHoursField: boolean): number {
        if (isHoursField) {
            return Math.floor(totalDuration / 60);
        }
        return totalDuration % 60;
    }
}