import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { CongeShowModel, CongeModel, PeriodeModel } from './conge.model';

@Injectable({
  providedIn: 'root',
})
export class CongeService {

  url = PagesComponent.urlConfigPaie + '/conges';
  url1 = PagesComponent.urlConfigPaie + '/contrat';
  url2 = PagesComponent.urlConfigPaie +'/entreprise/';
  url3 = PagesComponent.urlConfigPaie 

  constructor(protected httpClient: HttpClient) { }

  getAllCongesEmployeeByEntreprise(idEntreprise: number) {
    return this.httpClient.get<CongeShowModel>(this.url2 + idEntreprise +'/conges');
  }
  getCongeById(idConge: number) {
    return this.httpClient.get<CongeModel>(this.url + '/' + idConge);
  }
  addConge(conge: CongeModel, idContrat: number) {
    return this.httpClient.post(this.url1 + "/" + idContrat + "/conges", conge);
  }
  deleteconge(idConge: number) {
    return this.httpClient.delete(this.url + '/' + idConge);
  }



  getAllCongesEnAttenteByContrat(idContrat : number) {   // by contrat
    return this.httpClient.get<CongeModel>(this.url1 + "/" + idContrat + "/congesEnAttente" );
  }
  getAllCongesEnAttenteByEntreprise(idEntreprise : number) { // by entreprise
    return this.httpClient.get<CongeModel[]>(this.url2+ idEntreprise +'/congesEnAttente');
  }
  getCongesTraiterByContrat(idContrat : number) {
    return this.httpClient.get<CongeModel>(this.url1 + "/" + idContrat + "/congesEnCours" );
  }
  getAllCongesTraiterByEntreprise(idEntreprise : number) {
    return this.httpClient.get<any>(this.url2 + idEntreprise + "/congesEnCours" );
  }
  confirm(idConge: number) {
    return this.httpClient.get(this.url3 +  "/congesSuccess" + '/' + idConge);
  }
  annuler(idConge: number) {
    return this.httpClient.get(this.url3 + "/congesCancled" + '/' + idConge );
  }
  verifierDate(idContrat : number ,periode : PeriodeModel){
    return this.httpClient.post(this.url1 + "/" + idContrat + "/verifier" , periode)
  }

  // confirmConge(idConge: number, idContrat: number) {
  //   return this.httpClient.get(this.url1 + "/" + idContrat + "/congesSuccess" + '/' + idConge);
  // }
  // annulerConge(idConge: number, idContrat: number) {
  //   return this.httpClient.get(this.url1 + "/" + idContrat + "/congesCancled" + '/' + idConge );
  // }

}