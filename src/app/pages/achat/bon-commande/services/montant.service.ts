import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MontantModel } from '../model/montant.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class MontantService {
  url1= PagesComponent.urlConfigAchat + '/commande';
  url= PagesComponent.urlConfigAchat +'/montants';
  constructor(protected httpClient: HttpClient) { }
  getAllMontant():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getAllMontantCommande(id: number):Observable<any> {
    return this.httpClient.get(this.url1 + '/' + id + '/montants');
  }
  getMontantById(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addMontant(montant: MontantModel) {
    return this.httpClient.post<MontantModel>(this.url, montant);
  }

  deleteMontant(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
