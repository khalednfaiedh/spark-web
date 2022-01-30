import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuantityProductModel } from '../model/demande-achat-of-product.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class QuantityProductService {

  url = PagesComponent.urlConfigAchat + '/quantityproducts';
  constructor(protected httpClient: HttpClient) { }
  getAllQuantityProduct(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getQuantityProductById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addQuantityProduct(quantityproduct: QuantityProductModel): Observable<any> {
    return this.httpClient.post<QuantityProductModel>(this.url, quantityproduct);
  }

  deleteQuantityProduct(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
