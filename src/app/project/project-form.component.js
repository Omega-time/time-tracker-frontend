"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var project_1 = require("./project");
var project_service_1 = require("./project.service");
/**
 * Represents a form which sends a new project to
 * the {@link ProjectService} for storage.
 * Uses dependency injection for the service providers.
 * @class
 */
var ProjectFormComponent = (function () {
    function ProjectFormComponent(projectService, router) {
        this.projectService = projectService;
        this.router = router;
    }
    /**
     * Implemented method from {@link OnInit} interface which
     * is called after the constructor of the class. Here
     * we instantiate the projectToBeCreated with an empty
     * Project object.
     */
    ProjectFormComponent.prototype.ngOnInit = function () {
        this.projectToBeCreated = project_1.Project.createEmptyProject();
    };
    /**
     * EventHandler method which is called when the Add new project
     * button is clicked. The method calls the service to store
     * the projectToBeCreated object.
     */
    ProjectFormComponent.prototype.addProject = function () {
        var _this = this;
        this.projectService.saveProject(this.projectToBeCreated)
            .then(function (newProjectId) { return _this.router.navigateByUrl("/projects"); });
    };
    ProjectFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-form',
            templateUrl: 'project-form.component.html',
            providers: [project_service_1.ProjectService]
        })
    ], ProjectFormComponent);
    return ProjectFormComponent;
}());
exports.ProjectFormComponent = ProjectFormComponent;
//# sourceMappingURL=project-form.component.js.map