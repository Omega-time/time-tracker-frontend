import {Component, OnInit, Input, Output} from "@angular/core";
import {FileService} from "./file.service";
import{FileComponent} from "./file.component"
import{FileUploadFormComponent} from "./file-upload-form.component"
import {Router, ActivatedRoute } from "@angular/router";


@Component({
    moduleId: module.id,
    selector: 'file-list',
    templateUrl: 'file-list.component.html',
    providers: [FileService],
    directives: [ FileComponent, FileUploadFormComponent]
})
export class FileListComponent implements OnInit {
    fileNames: String[];
    projectId: number;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private fileService: FileService) {
    }

    ngOnInit() {
        this.getProjectFileNames();
    }

    
    getProjectFileNames() {
         this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.projectId = id;
            this.fileService.getAllFileNamesByProjectId(id)
                .then(fileNames => this.fileNames = fileNames)
                .catch(err => console.error(err));
        });
    }
}