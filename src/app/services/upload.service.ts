import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }
  upload(file: File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  const req = new HttpRequest('POST', `${this.baseUrl}/api/v1/cv`, formData, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}
  getFiles(): Observable<any> {
  return this.http.get(`${this.baseUrl}/files`);
}
create(data: any,idfile : any): Observable<any> {
  return this.http.post(`${this.baseUrl}/add-candidat/${idfile}`, data);
}

}
