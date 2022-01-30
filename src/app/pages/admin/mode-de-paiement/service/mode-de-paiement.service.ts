import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../../pages.component';
import { ModeDePaiementModel } from '../mode-de-paiement-model';

@Injectable({
  providedIn: 'root'
})
export class ModeDePaiementService {
  url = PagesComponent.urlConfigAdmin + '/modeDePaiements';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(private httpClient: HttpClient) { }
  getAllModeDePaiement(id: number) {
    return this.httpClient.get<ModeDePaiementModel[]>(this.url2 + id + '/modeDePaiements');
  }
  getModeDePaiementById(id: number) {
    return this.httpClient.get<ModeDePaiementModel>(this.url + '/' + id);
  }
  addModeDePaiement(modeDePaiement: ModeDePaiementModel, id: number) {
    return this.httpClient.post(this.url2 + id + '/modeDePaiements', modeDePaiement);
  }
  updateModeDePaiement(modeDePaiement: ModeDePaiementModel) {
    return this.httpClient.put(this.url + '/' + modeDePaiement.idPaiement, modeDePaiement);
  }
  deleteModeDePaiement(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
