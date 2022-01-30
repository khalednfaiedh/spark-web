import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DevisClientModel } from './devis-client.model';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { ProductModel } from '../../admin/product/product.model';
@Injectable({
  providedIn: 'root'
})
export class DevisClientService {

  url = PagesComponent.urlConfigVente + '/devis';
  url2 = PagesComponent.urlConfigVente + '/demandePrix/'
  url3 = PagesComponent.urlConfigVente + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }
  getAllDevis(id: number): Observable<any> {
    return this.httpClient.get(this.url3 + id + '/devis');
  }
  getDevisById(id_devis: number) {
    return this.httpClient.get<DevisClientModel>(this.url + '/' + id_devis);
  }

  addDevis(devis: DevisClientModel, id: number): Observable<any> {
    return this.httpClient.post(this.url2 + id + '/devis', devis);
  }
  updateDeviss(devis: DevisClientModel): Observable<any> {
    return this.httpClient.put(this.url + '/' + devis.id_devis, devis);
  }
  deleteDeviss(id_devis) {
    return this.httpClient.delete(this.url + '/' + id_devis);
  }
  getDeVisByDMD(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + id + '/devis')
  }
  findProductByCode(code: string) {
    return this.httpClient.get<ProductModel>(this.url + '/' + code);
  }
}
