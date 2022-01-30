import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { RegimeHoraireModel } from './regimeHoraire.model';

@Injectable({
  providedIn: 'root'
})
export class RegimeHoraireeService {
  url = PagesComponent.urlConfigPaie + '/regime';
  url2 = PagesComponent.urlConfigPaie + '/entreprise';

  constructor(protected httpClient: HttpClient) { }
 
  getAllRegimes() {
    let idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<RegimeHoraireModel[]>(this.url2 + 
     '/' + idEntreprise + '/regime');
  }
  getRegimeById(id: number) {
    return this.httpClient.get<RegimeHoraireModel>(this.url + '/' + id);
  }
  addRegime(regime: RegimeHoraireModel) {
    regime.entrep = +localStorage.getItem('current_entreprise')
    return this.httpClient.post(this.url, regime);
  }
  updateRegime(regime: RegimeHoraireModel) {
    return this.httpClient.put(this.url + '/' + regime.idRegime, regime);
  }
  deleteRegimet(id: Number) {
    return this.httpClient.delete(this.url +'/' + id);
  }
}
