import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BonCommandeAchatModel} from '../model/bon-commande.model'
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';
import { AppService } from '../../../../login1/app.service';

@Injectable({
  providedIn: 'root'
})
export class BonCommandeService {
  url= PagesComponent.urlConfigAchat +'/commandes';
  url1= PagesComponent.urlConfigAchat +'/fournisseur';
  
  constructor(protected httpClient: HttpClient, private appService: AppService) { 
  }

  getAllBonCommande():Observable<any> {
    let headers = this.appService.constructSecurityHeader();
    return this.httpClient.get(this.url);
  }
  getAllBonCommandeFournisseur(id: number):Observable<any> {
    return this.httpClient.get(this.url1 + '/' + id + "/commandes");
  }
  getBonCommandeById(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addBonCommandes(bonCommande: BonCommandeAchatModel) {
    let headers: HttpHeaders = this.appService.constructSecurityHeader();
    return this.httpClient.post<BonCommandeAchatModel>(this.url, bonCommande, {headers});
  }
  updateBonCommandes(bonCommande: BonCommandeAchatModel) {
    return this.httpClient.put(this.url + '/' + bonCommande.idBC, bonCommande);
  }
  updateBonCommandesByEtapeCommandes(bonCommande: BonCommandeAchatModel) {
    return this.httpClient.patch(this.url + '/' + bonCommande.idBC, bonCommande);
  }
  updateBonCommandesByStatus(id: number, status: string) {
    return this.httpClient.patch(this.url + '/' + id + '/status/' + status, null);
  }
  deleteBonCommandes(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}