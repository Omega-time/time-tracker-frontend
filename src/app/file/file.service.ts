import {Injectable} from "@angular/core";
import { Http } from "@angular/http";

import 'rxjs/Rx';

@Injectable()
export class FileService {
    private serviceUrl = 'http://localhost:8080/api/project';

    constructor(private http: Http) {
    }

    getAllFileNamesByProjectId(projectId:number): Promise<String[]> {
       let getAllFilesUrl=this.serviceUrl+`/${projectId}`+'/files';
        return this.http.get(getAllFilesUrl)
           .map(response => response.json())
            .map(fileNames => fileNames.map(
                fileName => fileName
            ))
            .toPromise();
    }

    deleteFileByNameAndProjectId(fileName:String, projectId:number): Promise<Object>{
        let deleteFileUrl=this.serviceUrl+`/${projectId}`+`/${fileName}`;
        return this.http.delete(deleteFileUrl)
            .map(response => response.json())
            .toPromise();
    }

}