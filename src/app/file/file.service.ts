import {Injectable} from "@angular/core";
import { Http, Headers } from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {DocFile} from "./docfile";
import 'rxjs/Rx';

@Injectable()
export class FileService {
    private serviceUrl = 'http://localhost:8080/api/project';

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

    createAuthorizationHeader(headers?: Headers): Headers {
        let authHeaders = headers || new Headers();
        authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
        return authHeaders;
    }

}