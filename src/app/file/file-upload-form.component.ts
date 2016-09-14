import {Component, OnInit, Input} from "@angular/core";
import { FILE_UPLOAD_DIRECTIVES, FileUploader, FileSelectDirective } from 'ng2-file-upload';


@Component({
    selector: 'file-upload-form',
    templateUrl: 'app/file/file-upload-form.component.html',
    directives: [FILE_UPLOAD_DIRECTIVES]
})
export class FileUploadFormComponent implements OnInit {
    private fileUploadURL = 'http://localhost:8080/api/project';
    public uploader: FileUploader;

    @Input() projectId:number;

     constructor() {
     }

    ngOnInit() {
        this.initFileUploader();
    }

    private initFileUploader() {
        this.fileUploadURL=this.fileUploadURL+'/'+this.projectId+'/files';
        this.uploader = new FileUploader({ url: this.fileUploadURL });

        this.uploader.onBeforeUploadItem = (fileItem: any) => {
            fileItem.method = 'POST';
        }

        this.uploader.onAfterAddingFile = (fileItem: any) => {
            fileItem.upload();
        }
    }

}