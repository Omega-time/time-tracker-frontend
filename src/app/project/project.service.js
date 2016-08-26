"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var project_1 = require("./project");
require('rxjs/Rx');
/**
 * Class which handles all HTTP requests to the
 * business layer. It stores and retrieves {@link Project}
 * objects. Uses map method to parse JSON strings to Project
 * instances.
 * @class
 */
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        this.serviceUrl = '/projects';
    }
    /**
     * Retrieves all projects from the business layer.
     * @returns {Promise<Project[]>} a promise which holds an array of Project objects
     */
    ProjectService.prototype.getAllProjects = function () {
        return this.http.get(this.serviceUrl)
            .map(function (response) { return response.json(); })
            .map(function (projects) { return projects.map(function (project) { return project_1.Project.parseInputObjectToProject(project); }); })
            .toPromise();
    };
    /**
     * Retrieves a single project object by a given id.
     * @param id the id by which it searches
     * @returns {Promise<Project>} a promise which holds a single project object
     */
    ProjectService.prototype.getProjectById = function (id) {
        return this.http.get(this.serviceUrl + ("/" + id))
            .map(function (response) { return response.json(); })
            .map(function (project) { return project_1.Project.parseInputObjectToProject(project); })
            .toPromise();
    };
    /**
     * Stores a project in the business layer.
     * @param project the project to be stored
     * @returns {Promise<Object>} a promise which holds an anonymous object
     *                            which holds the new project id
     */
    ProjectService.prototype.saveProject = function (project) {
        return this.http.post(this.serviceUrl, project)
            .map(function (response) { return response.json(); })
            .toPromise();
    };
    ProjectService = __decorate([
        core_1.Injectable()
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map