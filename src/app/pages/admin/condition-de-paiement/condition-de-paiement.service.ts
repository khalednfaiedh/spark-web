import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConditionDePaiementModel } from './condition-de-paiement-model';
import { Observable } from 'rxjs';
import { Client } from '_debugger';
import { ListConditionDePaiementModel } from './list-condtion-de-paiement-model';

@Injectable({
  providedIn: 'root'
})
export class ConditionDePaiementService {
  url = PagesComponent.urlConfigAdmin + '/conditionPaiements'
  url2 = PagesComponent.urlConfigAdmin + '/listconditionPaiements'
  url3 = PagesComponent.urlConfigAdmin + '/entreprise/'
  constructor(private httpClient: HttpClient) { }

  addConditionDePaiements(conditonDePaiement: ConditionDePaiementModel, id: number): Observable<any> {
    return this.httpClient.post(this.url3 + id + '/conditionPaiements', conditonDePaiement)
  }
  getAllConditionDePaiement(id: number): Observable<any> {
    return this.httpClient.get(this.url3 + id + '/conditionPaiements');
  }
  deleteConditionDePaiement(id: number) {
    return this.httpClient.delete(this.url + '/' + id)
  }
  update(conditonDePaiement: ConditionDePaiementModel, idE: number): Observable<any> {
    return this.httpClient.put(this.url3 + idE + '/conditionPaiements/' + conditonDePaiement.id, conditonDePaiement)
  }
  getConditionById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id)
  }
  getAllConditionDePaiementbyTypeEcheancier(type, strategie): Observable<any> {
    let params = new HttpParams().set('type', type)
    let params2 = new HttpParams().set('strategie', strategie)
    return this.httpClient.get(this.url + '/type?' + params + '&' + params2);
  }
  addlistConditionDePaiements(listconditonDePaiement: ListConditionDePaiementModel, id: number): Observable<any> {
    return this.httpClient.post(this.url2 + '/' + id, listconditonDePaiement)
  }
  updatelistConditionDePaiements(listconditonDePaiement: ListConditionDePaiementModel, id: number, idC: number): Observable<any> {
    return this.httpClient.put(this.url + '/' + idC + '/listconditionPaiements/' + id, listconditonDePaiement)
  }
  /*getAllListConditionDePaiementbyTypeEcheancier(type, strategie): Observable<any> {
    let params = new HttpParams().set('type', type)
    let params2 = new HttpParams().set('strategie', strategie)
    return this.httpClient.get(this.url2 + '/type?' + params + params2);
  }*/
}
