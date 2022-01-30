import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { AvanceModel } from './avance.model';

@Injectable({
  providedIn: 'root',
})
export class AvanceService {

  url = PagesComponent.urlConfigPaie + '/pret';
  url1 = PagesComponent.urlConfigPaie + '/contrat';

  constructor(protected httpClient: HttpClient) { }

  getAllAvancesByContrat(idContrat: number) {
    return this.httpClient.get<any>(this.url1 + "/" + idContrat + "/prets");
  }

  getAvanceById(idAvance: number) {
    return this.httpClient.get<AvanceModel>(this.url + '/' + idAvance);
  }

  addAvance(avance: AvanceModel, idContrat: number) {
    return this.httpClient.post(this.url1 + "/" + idContrat + "/prets", avance);
  }
  updateAvance(avance: AvanceModel, idContrat: number) {
    return this.httpClient.put(this.url1 + "/" + idContrat + "/prets" + '/' + avance.idAvance, avance);
  }
  deleteAvance(idAvance: number) {
    return this.httpClient.delete(this.url + '/' + idAvance);
  }
}