import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TaxeModel } from '../Taxe.Model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class TaxeService {

  url = PagesComponent.urlConfigAdmin + '/taxes';

  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }

  getAllTaxes(id: number): Observable<any> {
    return this.httpClient.get<TaxeModel[]>(this.url2 + id + '/taxes');
  }
  addTaxe(taxe: TaxeModel, id: number) {
    return this.httpClient.post<TaxeModel>(this.url2 + id + '/taxes', taxe);
  }
  deleteTaxe(idTaxe: number) {
    return this.httpClient.delete(this.url + '/' + idTaxe);
  }
  updateTaxe(taxe: TaxeModel) {
    return this.httpClient.put(this.url + '/' + taxe.idT, taxe);
  }
  getTaxebyId(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  existTaxe() {
    return this.httpClient.get(this.url + '/exist');
  }
}