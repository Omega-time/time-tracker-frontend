/**
 * Represents a Task model class
 * @class
 */
export class Task {
    constructor(public id: number,
        public name: string,
        public duration: number,
        public comment: string) {
    }

    /**
     * Gets anonymous object's duration hours and duration minutes,
     * and sets the totalDuration for object of type Task.
     * @param obj the anonymous task object
     * @return {number} total duration
     */
    public setTotalDuration(obj) {
        this.duration = (Number(obj.hours) * 60) + Number(obj.minutes);
    }

    /**
     * Parses anonymous object to an instance of Task class.
     * Called when parsing JSON string from http request in order
     * to map JS anonymous object to Task.
     * @param obj the anonymous task
     * @returns {Task} the parsed object
     */
    public static parseInputObjectToTask(obj) {
        return new Task(obj.id, obj.name, obj.duration, obj.comment);
    }

    /**
     * Creates an empty Task class instance.
     * Used for two-way-binding in forms.
     * @returns {Task} the empty Task
     */
    public static createEmptyTask() {
        return new Task(null, null, null, null);
    }
}