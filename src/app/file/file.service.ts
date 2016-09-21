import {Injectable} from "@angular/core";
import { Http, Headers, Response, BrowserXhr } from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {DocFile} from "./docfile";
import 'rxjs/Rx';

declare var saveAs;

@Injectable()
export class FileService {
    private serviceUrl = 'http://localhost:8080/api/projects';

    constructor(private http: Http, private authService: AuthService) {
    }

    getAllFileNamesByProjectId(projectId: number): Promise<DocFile[]> {
        let getAllFilesUrl = this.serviceUrl + `/${projectId}` + '/files';
        return this.http.get(getAllFilesUrl, {
            headers: this.createAuthorizationHeader()
        })
            .map(response => response.json())
            .map(files => files.map(
                docFile => DocFile.parseInputObjectToDocFile(docFile)
            ))
            .toPromise();
    }

    deleteFileByNameAndProjectId(fileName: String, projectId: number): Promise<DocFile> {
        let deleteFileUrl = this.serviceUrl + `/${projectId}` + `/${fileName}`;
        return this.http.delete(deleteFileUrl, {
            headers: this.createAuthorizationHeader()
        })
            .map(response => response.json())
            .toPromise();
    }

    getFileByNameAndProjectId(docFile: DocFile, projectId: number) {

        // Xhr creates new context so we need to create reference to this
        let self = this;

        // Create the Xhr request object
        let xhr = new XMLHttpRequest();
        let url = this.serviceUrl + `/${projectId}` + `/${docFile.name}`;
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', docFile.type);
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.authService.getAccessToken());
        xhr.responseType = 'blob';

        // Xhr callback when we get a result back
        // We are not using arrow function because we need the 'this' context
        xhr.onreadystatechange = function () {
            // We use setTimeout to trigger change detection in Zones

            // If we get an HTTP status OK (200), save the file using fileSaver
            if (xhr.readyState === 4 && xhr.status === 200) {
                var blob = new Blob([this.response], { type: docFile.type });
                saveAs(blob, docFile.name);
            }
        };
        xhr.send("");
    }

    createAuthorizationHeader(headers?: Headers): Headers {
        let authHeaders = headers || new Headers();
        authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
        return authHeaders;
    }

}
