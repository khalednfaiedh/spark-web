import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  url= PagesComponent.urlConfigAchat +'/contrats';
  constructor(protected httpClient: HttpClient) { }
  getAllContrat():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getContratById(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addContrat(contrat: any) {
    return this.httpClient.post<any>(this.url, contrat);
  }
  updateContrat(contrat: any) {
    return this.httpClient.put(this.url + '/' + contrat.idContrat, contrat);
  }
  deleteContrat(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
