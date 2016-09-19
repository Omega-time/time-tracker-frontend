import {Component, Input, Output, EventEmitter, OnInit, ElementRef} from "@angular/core";
import {FileService} from "./file.service";
import {DocFile} from "./docfile";
import 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'tr.special',
    templateUrl: 'file.component.html',
    host: {
        '(document:click)': 'handleClick($event)'
    }
})
export class FileComponent implements OnInit {
    @Input() docFile: DocFile;
    @Input() projectId: number;
    @Output() fileDeleted = new EventEmitter<boolean>();
    fileUrl: String;
    confirmDelete = false;
    public elementRef;


    constructor(private fileService: FileService,
        private myElement: ElementRef) {
        this.elementRef = myElement;
    }

    ngOnInit() {
        this.fileUrl = "http://localhost:8080/api/project/" + this.projectId + "/" + this.docFile.name;
    }

    onClickDelete(event: any) {
        this.fileService
            .deleteFileByNameAndProjectId(this.docFile.name, this.projectId)
            .then(resp => (this.fileDeleted.emit(true)))
            .catch(error => console.log(error));
        this.confirmDelete = false;
    }
    confirmDeletion(event: any) {
        this.confirmDelete = true;
    }

    getFile(event: any) {
        this.fileService.getFileByNameAndProjectId(this.docFile, this.projectId);
    }

    handleClick(event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.confirmDelete = false;
        }
    }
}