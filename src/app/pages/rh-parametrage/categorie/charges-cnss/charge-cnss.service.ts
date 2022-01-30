import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../../pages.component';
import { ChargeCnssModel } from './charge-cnss.model';

@Injectable({
  providedIn: 'root'
})
export class ChargeCNSSService {

  url1 = PagesComponent.urlConfigPaie + '/categorie';
  url = PagesComponent.urlConfigPaie + '/cnss';
  url2 = PagesComponent.urlConfigPaie + '/entreprise';

  constructor(protected httpClient: HttpClient) { }
  getAllChargesCnss(id: number) { 
    return this.httpClient.get<ChargeCnssModel[]>(this.url1 + '/' + id + '/cnss');
  }
  getChargesCnssList() { 
    let idE = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<ChargeCnssModel[]>(this.url2+ '/' + idE + '/cnss');
  }
  getChargeCnssById(idChargeCNSS: number) {
    return this.httpClient.get<ChargeCnssModel>(this.url + '/' + idChargeCNSS);
  }
  addChargeCnss(e: ChargeCnssModel, idCategorie: number) {
    return this.httpClient.post(this.url1 + '/' + idCategorie + '/' + 'cnss', e);
  }
  updateChargeCnss(e: ChargeCnssModel, idCategorie: number) {
    return this.httpClient.put(this.url1 + '/' + idCategorie + '/' + 'cnss' + '/' + e.idCNSS, e);
  }
  deleteChargeCnss(idChargeCNSS: Number) {
    return this.httpClient.delete(this.url + '/' + idChargeCNSS);
  }
}
