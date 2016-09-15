import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {FileService} from "./file.service"

@Component({
    moduleId: module.id,
    selector: 'file',
    templateUrl: 'file.component.html'
})
export class FileComponent implements OnInit {
    @Input() fileName: String;
    @Input() projectId: number;
    @Output() fileDeleted = new EventEmitter<boolean>();
    fileUrl: String;

    constructor(private fileService: FileService) {
    }

    ngOnInit() {
        this.fileUrl = "http://localhost:8080/api/project/" + this.projectId + "/" + this.fileName;
    }

    onClickDelete(taskId: number, event: any) {
        let deleteFlag: boolean = confirm("Are you sure you want to delete this file?");
        if (deleteFlag == true) {
            this.fileService
                .deleteFileByNameAndProjectId(this.fileName, this.projectId)
                .then(resp => (this.fileDeleted.emit(true)))
                .catch(error => console.log(error));
        }
    }
}