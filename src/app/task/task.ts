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