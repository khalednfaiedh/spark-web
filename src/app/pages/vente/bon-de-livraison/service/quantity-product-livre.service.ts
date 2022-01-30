import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { QuantityProductClientLivreModel } from '../quantity-product-livre-client-model';

@Injectable({
  providedIn: 'root'
})
export class QuantityProductLivreService {
  url = PagesComponent.urlConfigVente + '/quantityproductLivres'
  url2 = PagesComponent.urlConfigVente + '/bonLivraison'
  url3 = PagesComponent.urlConfigVente + '/product'
  constructor(private httpClient: HttpClient) { }
  public addQuantityProductLivre(quantityproductLivres: QuantityProductClientLivreModel): Observable<any> {
    return this.httpClient.post(this.url, quantityproductLivres)
  }
  public updateQuantityProductLivre(quantityproductLivres: QuantityProductClientLivreModel, id: number): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, quantityproductLivres)
  }
  public  getAllQuantityProductLivreBonDeLivraison(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + '/' + id + '/quantityproductLivres')
  }
  public countQuantiteLivre(id: number): Observable<any> {
    return this.httpClient.get(this.url3 + '/' + id + '/quantityproductLivres')
  }
}
