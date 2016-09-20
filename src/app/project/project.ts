/**
 * Represents a Project model class
 * @class
 */
export class Project{
  constructor(public id:number,
              public name:string,
              public lastTaskName: string,
              public dateOfCreation:Date,
              public dateLastChanged: Date
              ) {
  }

  /**
   * Parses anonymous object to an instance of Project class.
   * Called when parsing JSON string from http request in order
   * to map JS anonymous object to Project.
   * @param obj the anonymous project
   * @returns {Project} the parsed object
   */
  public static parseInputObjectToProject(obj) {
    return new Project(obj.id, obj.name, obj.lastTaskName, obj.dateOfCreation, obj.dateLastChanged);
  }

  /**
   * Creates an empty Project class instance.
   * Used for two-way-binding in forms.
   * @returns {Project} the empty Project
   */
  public static createEmptyProject() {
    return new Project(null, null, null, null, null);
  }
}
