import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { ContratClientModel } from './contrat-client-model';
import { ClientModel } from '../../admin/client/client.model';

@Injectable({
  providedIn: 'root'
})
export class ContratClientService {

  url = PagesComponent.urlConfigVente + '/contrats';
  url1 = PagesComponent.urlConfigVente + '/contrat';
  url2 = PagesComponent.urlConfigVente + '/client';

  constructor(protected httpClient: HttpClient) { }

  getAllContrat() {
    return this.httpClient.get<ContratClientModel[]>(this.url);
  }
  getContratById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addContrat(contrat: ContratClientModel): Observable<any> {
    return this.httpClient.post<any>(this.url, contrat);
  }
  updateContrat(contrat: any): Observable<any> {
    return this.httpClient.put(this.url + '/' + contrat.idContrat, contrat);
  }
  deleteContrat(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  getcontratbyidclient(idclient: number): Observable<any> {
    return this.httpClient.get(this.url + '/client/' + idclient);
  }

  getListClientContractuel() {
    return this.httpClient.get<ClientModel[]>(this.url + '/client/contractuel')
  }
  //client/{id}/contrats/active
  getContratActiveByClient(id) {
    return this.httpClient.get<ContratClientModel>(this.url2 + '/' + id + '/contrats/active')
  }

  getListProductByContrat(id) {
    return this.httpClient.get<any>(this.url1 + '/' + id + '/quantitys')
  }
}

