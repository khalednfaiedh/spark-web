import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandeFournisseurModel } from '../model/demande-fournisseur.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class DemandeFournisseurService {
  url1 = PagesComponent.urlConfigAchat + '/demandePrix';
  url = PagesComponent.urlConfigAchat + '/demandeFournisseurs';
  url2 = PagesComponent.urlConfigAchat + '/demandePrixs';
  constructor(protected httpClient: HttpClient) { }
  getAllDemandeFournisseurs(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getAllDemandeFournisseursByDemandePrix(idDemandePrix: number): Observable<any> {
    return this.httpClient.get(this.url1 + '/' + idDemandePrix + '/demandeFournisseurs');
  }
  getDemandeFournisseursById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addDemandeFournisseurs(demandeFournisseur: DemandeFournisseurModel): Observable<any> {
    return this.httpClient.post(this.url, demandeFournisseur);
  }
  deleteDemandeFournisseurs(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  getAllDemandeFournisseursDisponible(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + '/' + id + '/Listfournisseurs');
  }
}
