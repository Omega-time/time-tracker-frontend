import {Component, Input, Output, EventEmitter} from "@angular/core";
import {FileService} from "./file.service"

@Component({
    moduleId: module.id,
    selector: 'file',
    templateUrl: 'file.component.html'
})
export class FileComponent {
    @Input() fileName: String;
    @Input() projectId: number;
    @Output() fileDeleted = new EventEmitter<boolean>();

constructor(private fileService:FileService){
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