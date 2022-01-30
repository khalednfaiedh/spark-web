import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { DemandePrixModel, DemandeFournisseurModel } from './demande-prix.model';


@Injectable({
  providedIn: 'root'
})
export class DemandePrixService {
  url = PagesComponent.urlConfigAchat + '/demandePrixs';
  url1 = PagesComponent.urlConfigAchat + '/proposition';
  url2 = PagesComponent.urlConfigAchat + '/fournisseurs';
  constructor(protected httpClient: HttpClient) { }
  getAllDemandePrix(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getDemandeByProposition(id: number): Observable<any> {
    return this.httpClient.get<DemandePrixModel[]>(this.url + '/' + id + '/proposition');
  }
  getDemandePrixById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }

  getFournisseursByIdDemande(id: number): Observable<any> {
    return this.httpClient.get<DemandeFournisseurModel>(this.url + '/' + id + '/fournisseurs');
  }
  addDemandePrix(demandePrix): Observable<any> {
    return this.httpClient.post(this.url, demandePrix);
  }
  updateDemandePrix(demandePrix) {
    return this.httpClient.put(this.url + '/' + demandePrix.iddp, demandePrix);
  }
  deleteDemandePrix(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }


}
