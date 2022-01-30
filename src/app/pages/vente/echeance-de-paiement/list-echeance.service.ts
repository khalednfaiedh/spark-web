import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { EcheanceDePaiementModel } from '../../vente/echeance-de-paiement/echeance-de-paiement-model';
import { ListEcheanceVenteModel } from './list-echeance-model';

@Injectable({
  providedIn: 'root'
})
export class ListEcheanceService {
  url = PagesComponent.urlConfigVente + "/listEcheances/"
  url2 = PagesComponent.urlConfigVente + "/echeancePaiement/"
  constructor(private httpClient: HttpClient) { }
  addListEcheanceDePaiementDemandePrixClient(listEcheance: ListEcheanceVenteModel, id: number): Observable<any> {
    return this.httpClient.post(this.url + id, listEcheance)
  }
  getListEcheanceDePaiementDemandePrixClient(idE: number): Observable<any> {
    return this.httpClient.get(this.url2 + idE + "/listEcheances")
  }
}
