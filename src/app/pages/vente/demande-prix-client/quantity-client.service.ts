import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuantityClientModel } from './quantity-client.model';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class QuantityClientService {

  url = PagesComponent.urlConfigVente + '/quantitys';
  url2 = PagesComponent.urlConfigVente + '/demandePrix/';
  url3 = PagesComponent.urlConfigVente + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }
  getAllQuantity(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getQuantityById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addQuantity(id: number, quantityproduct: QuantityClientModel) {
    return this.httpClient.post<QuantityClientModel>(this.url2 + id + '/quantitys', quantityproduct);
  }

  deleteQuantity(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  getAllbyDemandeDePrix(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + id + '/quantitys')
  }
  updateQuantityDemandePrix(quantity: QuantityClientModel, id: number): Observable<any> {
    return this.httpClient.put(this.url2 + id + '/quantitys' + '/' + quantity.id, quantity);
  }
  updateQuantity(quantity: QuantityClientModel, id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id)
  }
  getAllProduit(idE: number, id: number): Observable<any> {
    return this.httpClient.get(this.url3 + idE + '/products/' + id + '/quantitys')
  }

}
