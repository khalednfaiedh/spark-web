import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DemandeAchatModel} from '../model/demande-achat.model'
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class DemandeAchatService {
  url= PagesComponent.urlConfigAchat +'/demandeAchats';
  constructor(protected httpClient: HttpClient) { }
  getAllDemandeAchat():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getDemandeAchatById(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addDemandeAchats(demandeAchat: DemandeAchatModel) {
    return this.httpClient.post<DemandeAchatModel>(this.url, demandeAchat);
  }
  updateDemandeAchats(demandeAchat: DemandeAchatModel) {
    return this.httpClient.put(this.url + '/' + demandeAchat.idDemandeAchat, demandeAchat);
  }
  deleteDemandeAchats(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  updateStatut(id: number,statut:String) {
    return this.httpClient.get(this.url + '/' + id + '/statut/' + statut );
  }
}
