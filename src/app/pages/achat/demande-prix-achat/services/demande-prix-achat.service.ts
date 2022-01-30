import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';


@Injectable({
  providedIn: 'root'
})
export class DemandePrixAchatService {
  url = PagesComponent.urlConfigAchat + '/demandePrixs';
  constructor(protected httpClient: HttpClient) { }
  getAllDemandePrix(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getDemandePrixById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addDemandePrix(demandePrix): Observable<any> {
    return this.httpClient.post(this.url, demandePrix);
  }
  updateDemandePrix(demandePrix): Observable<any> {
    return this.httpClient.put(this.url + '/' + demandePrix.iddp, demandePrix);
  }
  deleteDemandePrix(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  getDemandePrixByProposition(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id + '/proposition');
  }
}