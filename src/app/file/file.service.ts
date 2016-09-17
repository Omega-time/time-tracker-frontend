import {Injectable} from "@angular/core";
import { Http } from "@angular/http";
import {DocFile} from "./docfile";
import 'rxjs/Rx';

@Injectable()
export class FileService {
    private serviceUrl = 'http://localhost:8080/api/project';

    constructor(private http: Http) {
    }

    getAllFileNamesByProjectId(projectId:number): Promise<DocFile[]> {
       let getAllFilesUrl=this.serviceUrl+`/${projectId}`+'/files';
        return this.http.get(getAllFilesUrl)
           .map(response => response.json())
            .map(files => files.map(
                docFile => DocFile.parseInputObjectToDocFile(docFile)
            ))
            .toPromise();
    }

    deleteFileByNameAndProjectId(fileName:String, projectId:number): Promise<DocFile>{
        let deleteFileUrl=this.serviceUrl+`/${projectId}`+`/${fileName}`;
        return this.http.delete(deleteFileUrl)
            .map(response => response.json())
            .toPromise();
    }

}