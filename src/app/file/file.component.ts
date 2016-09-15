import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {FileService} from "./file.service";
import {DocFile} from "./docfile";

@Component({
    moduleId: module.id,
    selector: 'file',
    templateUrl: 'file.component.html'
})
export class FileComponent implements OnInit {
    @Input() docFile: DocFile;
    @Input() projectId: number;
    @Output() fileDeleted = new EventEmitter<boolean>();
    fileUrl: String;

    constructor(private fileService: FileService) {
    }

    ngOnInit() {
        this.fileUrl = "http://localhost:8080/api/project/" + this.projectId + "/" + this.docFile.name;
    }

    onClickDelete(event: any) {
        let deleteFlag: boolean = confirm("Are you sure you want to delete this file?");
        if (deleteFlag == true) {
            this.fileService
                .deleteFileByNameAndProjectId(this.docFile.name, this.projectId)
                .then(resp => (this.fileDeleted.emit(true)))
                .catch(error => console.log(error));
        }
    }
}