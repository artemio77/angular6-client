import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UploadService {

  constructor(private http: HttpClient) {
  }

  // file from event.target.files[0]
  uploadFile(url: string, file: File, headers: HttpHeaders): Observable<HttpEvent<any>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      headers: headers,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
