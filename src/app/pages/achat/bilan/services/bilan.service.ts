import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class BilanService {

  url= PagesComponent.urlConfigAchat + '/bilans';
  constructor(protected httpClient: HttpClient) { }

  getAllBilans():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getBilan(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addBilan(bilan){
    return this.httpClient.post(this.url,bilan);
  }
  deleteBilan(idBilan){
    return this.httpClient.delete(this.url + '/' + idBilan);
  }
  updateBilan(bilan: any) {
    return this.httpClient.put(this.url + '/' + bilan.idBilan, bilan);
  }
}
