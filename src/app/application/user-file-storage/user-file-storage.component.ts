import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {AppService} from '../../../service/app.service';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {Http, HttpModule} from '@angular/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UploadService} from '../../../service/upload.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-file-storage',
  templateUrl: './user-file-storage.component.html',
  styleUrls: ['./user-file-storage.component.css']
})
export class UserFileStorageComponent implements OnInit {


  private url = 'http://localhost:8082/spring-security-oauth-resource/post';
  private urlPrefix = 'application/';
  private urlSufix = '/files';

  headers;
  public files: UploadFile[] = [];

  constructor(private loader: LoadingBarService,
              private userService: UserService,
              private appService: AppService,
              private upload: UploadService,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    this.appService.checkCredentials(this.urlPrefix, Cookie.get('login'), this.urlSufix);
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
  }

  onDropFile(event: DragEvent) {
    event.preventDefault();
    /*this.dialog.open(width: '250px',
      data: {name: this.name, animal: this.animal});*/
    this.uploadFile(event.dataTransfer.files);
  }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log('No file selected!');
      return;

    }
    let file: File = files[0];

    this.upload.uploadFile('http://localhost:8082/spring-security-oauth-resource/post', file, this.headers)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log('Upload Error:', err);
        }, () => {
          console.log('Upload done');
        }
      );
  }


}

