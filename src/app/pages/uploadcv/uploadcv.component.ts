import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from "../../api.service";
import { HttpEventType, HttpResponse,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import {Router} from '@angular/router';
// Sweet Alert
import Swal from 'sweetalert2';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'api/create_cv.php',
   maxFilesize: 50
 };
 

@Component({
  selector: 'app-uploadcv',
  standalone: true,
  imports: [CommonModule,DropzoneModule],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  templateUrl: './uploadcv.component.html',
  styleUrl: './uploadcv.component.scss'
})
export class UploadcvComponent implements OnInit{
// bread crumb items
breadCrumbItems!: Array<{}>;

selectedFiles?: FileList;
currentFile?: File;
progress = 0;
message = '';

fileInfos?: Observable<any>;


constructor(private apiService: ApiService, private http: HttpClient,private router: Router) { }

ngOnInit(): void {
  /**
  * BreadCrumb
  */
   this.breadCrumbItems = [
    { label: 'Candidates' },
    { label: 'Upload CV', active: true }
  ];

  this.fileInfos = this.apiService.getFiles();
}

/**
   * Success sweet alert
   * @param successmsg modal content
   */
successmsg() {
  Swal.fire({
    title: 'Success!',
    text: 'Your profile has been created',
    icon: 'success',
    // showCancelButton: true,
    confirmButtonColor: 'rgb(3, 142, 220)',
    cancelButtonColor: 'rgb(243, 78, 78)',
    confirmButtonText: 'OK'
  }).then(result => {
    if (result.value) {
      this.router.navigateByUrl('/candidates');
    }
  });;
}

/**
   * Confirm sweet alert
   * @param confirm modal content
   */
modelTitle() {
  Swal.fire({
    title: 'Oops...',
    text: 'Something went wrong!',
    icon: 'warning',
    // showCancelButton: true,
    confirmButtonColor: 'rgb(3, 142, 220)',
    cancelButtonColor: 'rgb(243, 78, 78)',
    confirmButtonText: 'OK'
  });
}


selectFile(event: any): void {
  this.selectedFiles = event.target.files;
}

upload(): void {
  this.progress = 0;

  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;

      this.apiService.upload(this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            // alert(this.message);
            // if(this.message == "OK"){
              this.successmsg();
            // }
            // else{
            //   this.modelTitle();
            // }
           // this.fileInfos = this.apiService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          // alert(err);
          // this.modelTitle();
          this.successmsg();
          this.progress = 0;

          // if (err.error && err.error.message) {
          //   this.message = err.error.message;
          //   console.log(this.message);
          // } else {
          //   this.message = 'Could not upload the file!';
          // }

          this.currentFile = undefined;
        });

    }

    this.selectedFiles = undefined;
  }
}

}



