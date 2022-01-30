import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Contrat } from './contrat';
import { PagesComponent } from '../../pages.component';


@Injectable({
  providedIn: 'root'
})
export class ContratService {

  /* url = PagesComponent.urlSousTraitance + '/contrats';
   urlSousTraitant = PagesComponent.urlSousTraitance + '/sousTraitants';
   url1 = PagesComponent.urlSousTraitance + '/contratParent';
   url2 = PagesComponent.urlSousTraitance + '/contratInitial';
   url3 = PagesComponent.urlSousTraitance + '/AllC';
   url4 = PagesComponent.urlSousTraitance + '/activeContrats';*/
  constructor(private httpClient: HttpClient) { }



  /*AllContratListActive() {
    return this.httpClient.get<Contrat[]>(this.url4);
  }

  contratAll()
  {return this.httpClient.get<Contrat[]>(this.url3);}
  contratListSousTraitant(id: number) {
    return this.httpClient.get<Contrat[]>(this.urlSousTraitant + '/' + id + '/toutContrats');
  }
  contratListActive(id: number) {
    return this.httpClient.get<Contrat[]>(this.urlSousTraitant + '/' + id + '/activeContrats');
  }
  contratListAvenant(id: number) {
    return this.httpClient.get<Contrat[]>(this.url + '/' + id + '/ContratAvenants');
  }

  contratListAnnule(id: number) {
    return this.httpClient.get<Contrat[]>(this.urlSousTraitant + '/' + id + '/annuleContrats');
  }
  contratListReconduit(id: number) {
    return this.httpClient.get<Contrat[]>(this.urlSousTraitant + '/' + id + '/ReconduitContrats');
  }

  retrieveContrat(id: number) { return this.httpClient.get<Contrat>(this.url + '/' + id); }

  retrieveContratActive() { return this.httpClient.get<Contrat>(this.url); }

  addContratSousTraitant(contrat: Contrat, id: number) {
    return this.httpClient.post(this.urlSousTraitant + '/' + id + '/contrats', contrat);
  }

  addContrat(id: number, contrat: Contrat) {
    return this.httpClient.post(this.url1 + "/" + id + '/contrats', contrat);
  }
  addReconduit(id: number, contrat: Contrat) {
    return this.httpClient.post(this.url2 + "/" + id + '/contrats', contrat);
  }

  DeleteContrat(idContrat: Number) {
    return this.httpClient.delete(this.url + '/' + idContrat);
  }

  annuleContrat(id: number, contrat: Contrat) {
    return this.httpClient.put(this.url + "/" + id , contrat);
  }
*/
}
