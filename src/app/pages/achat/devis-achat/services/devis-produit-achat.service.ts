import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class DevisProduitAchatService {

  url= PagesComponent.urlConfigAchat + '/devisProduits';
  url1= PagesComponent.urlConfigAchat + '/commande';
  
  constructor(protected httpClient: HttpClient) { }
  getAllDevisProduits():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getDevisProduits(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  getDevisProduitscommande(id: number):Observable<any> {
    return this.httpClient.get(this.url1 + '/' + id + '/devisProduits');
  }
  addDevisProduits(devisProduit):Observable<any>  {
    return this.httpClient.post(this.url, devisProduit);
  }
  updateDevisProduits(devisProduit : any) {
    return this.httpClient.put(this.url + '/' + devisProduit.idDevisP, devisProduit);
  }
  deleteDevisProduits(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }

}