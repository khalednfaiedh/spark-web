import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { FactureClientModel } from './Facture.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  url = PagesComponent.urlConfigVente + '/factures';

  url2 = PagesComponent.urlConfigVente + '/commande';
  url3 = PagesComponent.urlConfigVente + '/clients';

  url4 = PagesComponent.urlConfigVente + '/products';
  
  constructor(protected httpClient: HttpClient) { }

  getAllFactures(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getFactureById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addFacture(facture): Observable<any> {
    return this.httpClient.post(this.url, facture);
  }
  deleteFacture(idFacture) {
    return this.httpClient.delete(this.url + '/' + idFacture);
  }
  getFactureByCommande(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + '/' + id + '/facture/');
  }
  updateFacture(facture: FactureClientModel, id: number): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, facture);
  }

   

   

}