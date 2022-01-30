import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { AvanceMensModel } from './avanceMens.model';

@Injectable({
  providedIn: 'root',
})
export class AvanceMensService {

  url = PagesComponent.urlConfigPaie + '/avance';
  url1 = PagesComponent.urlConfigPaie + '/contrat';

  constructor(protected httpClient: HttpClient) { }

  getAllAvancesMensByContrat(idContrat: number) {
    return this.httpClient.get<any>(this.url1 + "/" + idContrat + "/avances");
  }

  getAvanceMensById(idAvance: number) {
    return this.httpClient.get<AvanceMensModel>(this.url + '/' + idAvance);
  }

  addAvanceMens(avance: AvanceMensModel, idContrat: number) {
    return this.httpClient.post(this.url1 + "/" + idContrat + "/avances", avance);
  }
  updateAvanceMens(avance: AvanceMensModel, idContrat: number) {
    return this.httpClient.put(this.url1 + "/" + idContrat + "/avances" + '/' + avance.idAvanceMens, avance);
  }
  deleteAvanceMens(idAvance: number) {
    return this.httpClient.delete(this.url + '/' + idAvance);
  }
}