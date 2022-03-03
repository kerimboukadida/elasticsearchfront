import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import { UploadService } from '../services/upload.service';
import { Candidat } from '../models/candidat.model';
import * as $ from 'jquery'


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  pdfSrc :any;
  added?:[];


  candidat : Candidat = {
    id: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    skills : [],
    idfile:''
  }
  hidden:boolean = false;
  hiddenII:boolean = false;
  hiddenIII:boolean=false;

  constructor(private router : Router, private uploadService: UploadService) { }

  ngOnInit(): void {
    console.log(this.candidat.id);
  }

  saveCv(): void {
    const data = {
      firstname: this.candidat.firstname,
      lastname: this.candidat.lastname,
      phone: this.candidat.phone,
      email: this.candidat.email,
      skills: this.candidat.skills
    };
    this.uploadService.create(data,this.candidat.idfile)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate([`/application-sent`]);
        },
        error: (e) => console.error(e)
      });
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event2) => {

      this.pdfSrc = reader.result;
      this.hidden = true;

    };
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
              console.log(event.body);
              this.candidat.firstname = event.body.firstname;
              this.candidat.lastname = event.body.lastname;
              this.candidat.phone = event.body.phone;
              this.candidat.email = event.body.email;
              this.candidat.skills = event.body.skills;
              this.candidat.idfile = event.body.idfile;
              this.hiddenII=true;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      }
      this.selectedFiles = undefined;
    }


}
  ngAfterViewInit(){
  ($('#carouselExampleCaptions')as any).carousel()
  }
  addSkillinput():void{
    this.hiddenIII=true;
  }
  addSkill():void{
    this.candidat.skills?.push(this.added);
  }

}
