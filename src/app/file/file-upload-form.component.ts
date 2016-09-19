import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import { FILE_UPLOAD_DIRECTIVES, FileUploader, FileSelectDirective} from 'ng2-file-upload';
import { Http, Headers } from "@angular/http";
import {AuthService} from "../auth/auth.service";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const DOCX_FILE_MIME_TYPE = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'image/jpeg', 'image/png', 'text/plain', 'application/pdf'];


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

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.initFileUploader();
    }

    private initFileUploader() {
        this.fileUploadURL = this.fileUploadURL + '/' + this.projectId + '/files';
        this.uploader = new FileUploader({ url: this.fileUploadURL, authToken: this.authService.getAccessToken() });
        this.uploader.options.allowedMimeType = DOCX_FILE_MIME_TYPE;
        this.uploader.options.maxFileSize = MAX_FILE_SIZE;

        this.uploader.onBeforeUploadItem = (fileItem: any) => {
            fileItem.method = 'POST';
        }
        this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
            this.isFileSizeTooLarge = !this.uploader._fileSizeFilter(item);
            this.isFileTypeInvalid = !this.uploader._mimeTypeFilter(item);

        }

        this.uploader.onAfterAddingFile = (fileItem: any) => {
            this.fileItem = fileItem;
            console.log(this.fileItem.file.name);
        }

        this.uploader.onSuccessItem = (fileItem: any) => {
            this.fileItem = null;
            this.newFileAdded.emit(true);
        }
    }

    createAuthorizationHeader(headers?: Headers): Headers {
        let authHeaders = headers || new Headers();
        authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
        return authHeaders;
    }

    resetFileForm(event: any) {
        this.fileItem = null;
    }
}