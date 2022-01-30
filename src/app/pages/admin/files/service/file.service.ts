import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { PagesComponent } from '../../../pages.component';
import {Http, ResponseContentType} from '@angular/http';
import {HttpResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class FileService {
  url = PagesComponent.urlConfigAdmin + '/files';

  url2 = PagesComponent.urlComptabliteConfig  + '/testPDF';



  constructor(private http: HttpClient) { }
  private formatErrors (error: any) {
    return  throwError(error.error);
  }


  /*-pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', file);     
    return this.http.post(this.url,formdata); 
  }*/
  upload(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.url, formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);
  }


  downloadFile( nameFile :  string):Observable<Blob> {

    return this.http.get(this.url+'/'+nameFile,{responseType:'blob'  }) .pipe(catchError(this.formatErrors));;
  }

  downloadFileWidthJasper():Observable<Blob> {

    return this.http.get(this.url2,{responseType:'blob'  }) .pipe(catchError(this.formatErrors));;
  }

  downloadFile2( nameFile :  string):Observable<Blob> {

    return this.http.get(this.url+'/'+nameFile,{responseType:'blob'  }) .pipe(catchError(this.formatErrors));;
  }

  public downloadPDF( nameFile :  string): any {
    var mediaType = 'application/pdf';
    this.http.post(this.url+'/'+nameFile, {location: "report.pdf"}, { responseType: 'blob' }).subscribe(
        (response) => {
            var blob = new Blob([response], { type: mediaType });
            saveAs(blob, 'report.pdf');
        },
        e => { throwError(e); }
    );
}
   

 
/// service 

printInvoice(): any {
  const httpOptions = {
    responseType: 'arraybuffer' as 'json'
    // 'responseType'  : 'blob' as 'json'        //This also worked
  };
  
  return this.http.get<any>(this.url2, httpOptions);
   }
  

  
}
