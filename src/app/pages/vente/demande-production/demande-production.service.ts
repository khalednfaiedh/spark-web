import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DemandeProductiontModel } from './demande-production.model';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class DemandeProductionService {
  url= PagesComponent.urlConfigVente +'/demandeproduction';
  constructor(protected httpClient: HttpClient) { }

  getAllDemandeProduction() {
    return this.httpClient.get<DemandeProductiontModel[]>(this.url);
  }
  getDemandeProductionById(idDemande: number) {
    return this.httpClient.get<DemandeProductiontModel>(this.url + '/' + idDemande);
  }
 
  addDemandeProduction(demandeproduction: DemandeProductiontModel) {
    return this.httpClient.post(this.url, demandeproduction);
  }
  
  updateDemandeProductiont(demandeproduction: DemandeProductiontModel) {
    return this.httpClient.put(this.url + '/' + demandeproduction.idDemande, demandeproduction);
  }
 
  deleteDemandeProduction(idDemande) {
    return this.httpClient.delete(this.url + '/' + idDemande);
  }
}
