import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { FILE_UPLOAD_DIRECTIVES, FileUploader, FileSelectDirective} from 'ng2-file-upload';

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const DOCX_FILE_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

@Component({
    selector: 'file-upload-form',
    templateUrl: 'app/file/file-upload-form.component.html',
    directives: [FILE_UPLOAD_DIRECTIVES]
})
export class FileUploadFormComponent implements OnInit {
    private fileUploadURL = 'http://localhost:8080/api/project';
    public uploader: FileUploader;
    isFileSizeTooLarge: boolean;
    isFileTypeInvalid: boolean;
    private fileItem: any;

    @Input() projectId: number;
    @Output() newFileAdded = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
        this.initFileUploader();
    }

    private initFileUploader() {
        this.fileUploadURL = this.fileUploadURL + '/' + this.projectId + '/files';
        this.uploader = new FileUploader({ url: this.fileUploadURL });

        this.uploader.onBeforeUploadItem = (fileItem: any) => {
            fileItem.method = 'POST';
        }
        this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
            this.isFileSizeTooLarge = !this.uploader._fileSizeFilter(item);
            // this.isFileTypeInvalid = !this.uploader._mimeTypeFilter(item);
        }

        this.uploader.onAfterAddingFile = (fileItem: any) => {
            this.fileItem = fileItem;
            console.log(this.projectId);
        }

        this.uploader.onSuccessItem = (fileItem: any) => {
            this.fileItem = null;
            this.newFileAdded.emit(true);
        }
    }
}