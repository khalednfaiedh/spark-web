import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { EcheanceDePaiementModel } from '../../vente/echeance-de-paiement/echeance-de-paiement-model';
import { ListEcheanceModel } from './list-echeance-model';

@Injectable({
  providedIn: 'root'
})
export class ListEcheanceService {
  url = PagesComponent.urlConfigAchat + "/listEcheances/"
  url2 = PagesComponent.urlConfigAchat + "/echeancePaiement/"
  constructor(private httpClient: HttpClient) { }
  addListEcheanceDePaiementDemandePrix(listEcheance: ListEcheanceModel, id: number): Observable<any> {
    return this.httpClient.post(this.url + id, listEcheance)
  }
  getListEcheanceDePaiementDemandePrix(idE: number): Observable<any> {
    return this.httpClient.get(this.url2 + idE + "/listEcheances")
  }
}
