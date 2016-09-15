/**
 * Represents a File model class
 * @class
 */
export class DocFile {
    constructor(public name: string,
        public size: number,
        public type: string) {
    }

    /**
     * Parses anonymous object to an instance of File class.
     * Called when parsing JSON string from http request in order
     * to map JS anonymous object to File.
     * @param obj the anonymous project
     * @returns {File} the parsed object
     */
    public static parseInputObjectToDocFile(obj) {
        return new DocFile(obj.name, obj.size, obj.type);
    }
}
