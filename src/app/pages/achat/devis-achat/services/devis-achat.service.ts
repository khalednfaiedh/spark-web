import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class DevisAchatService {

  url= PagesComponent.urlConfigAchat + '/deviss';
  url1= PagesComponent.urlConfigAchat + '/demandeFournisseur';
  constructor(protected httpClient: HttpClient) { }
  getAllDevis():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getDevis(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  getDevisByDemanndeFournisseur(idDemandeFournisseur: number):Observable<any> {
    return this.httpClient.get(this.url1 + '/' + idDemandeFournisseur + '/deviss');
  }
  addDevis(demandePrix):Observable<any>  {
    return this.httpClient.post(this.url, demandePrix);
  }
  updateDevis(demandePrix : any) {
    return this.httpClient.put(this.url + '/' + demandePrix.iddp, demandePrix);
  }
  deleteDevis(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }



}
