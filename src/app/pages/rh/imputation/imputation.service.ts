import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImputationModel } from './imputation.model';
import { PagesComponent } from '../../pages.component';
import { ContratService } from '../contrat/contrat.service';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {
  contrat
  url = PagesComponent.urlConfigPaie + '/imputation';
  url2 = PagesComponent.urlConfigPaie + '/contrat/';
  url1 = PagesComponent.urlConfigPaie + '/entreprise/';


  constructor(protected httpClient: HttpClient, protected contratService: ContratService) { }
  getAllImputation() {
    return this.httpClient.get<ImputationModel[]>(this.url);
  }
  getImputationById(id: number) {
    return this.httpClient.get<ImputationModel>(this.url + '/' + id);
  }
  getImputationByMonth(mois : number, annee : number ) {
    return this.httpClient.get<ImputationModel[]>(this.url + '/' + mois + '/' + annee);
  }
  getImputationByEntrepriseAndMonth(idEntreprise,mois : number, annee : number ) {
    return this.httpClient.get<ImputationModel[]>(this.url1 + idEntreprise +'/imputation/' + mois + '/' + annee);
  }
  addImputation(idEmploye: number  ,imputation: ImputationModel) {
    return this.httpClient.post(this.url2 + idEmploye +'/imputation' , imputation);
  }
  updateImputation(imputation: ImputationModel) {
    return this.httpClient.put(this.url + '/' + imputation.idImp, imputation);
  }
  deleteImputation(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
