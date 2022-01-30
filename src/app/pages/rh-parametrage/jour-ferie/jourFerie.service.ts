import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { JoursFerieModel } from './jourFerie.model';

@Injectable({
  providedIn: 'root'
})
export class JoursFerieService {

  url = PagesComponent.urlConfigPaie + '/joursFerie';
  url2 = PagesComponent.urlConfigPaie + '/entreprise';

  constructor(protected httpClient: HttpClient) { }
  // getAllJourFerie() {
  //   return this.httpClient.get<JoursFerieModel[]>(this.url);
  // }
  getAllJourFerieByYear(annee : number) {
   let idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<JoursFerieModel[]>(this.url2+ '/' + idEntreprise +
    '/joursFerie/' + annee + '/annee') ;
  }
  getJourFerieById(id: number) {
    return this.httpClient.get<JoursFerieModel>(this.url + '/' + id);
  }
  addJourFerie(jour: JoursFerieModel) {
    jour.idEntreprise = +localStorage.getItem('current_entreprise')
   return this.httpClient.post(this.url, jour);
  }
  updateJourFerie(jour: JoursFerieModel) {
    return this.httpClient.put(this.url + '/' + jour.idJour, jour);
  }
  deleteJourFerie(id: Number) {
    return this.httpClient.delete(this.url +'/' + id);
  }
}
