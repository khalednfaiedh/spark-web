import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommandeModel } from './commande.model'
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { ProductModel } from '../../admin/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  url = PagesComponent.urlConfigVente + '/commande';
  url2 = PagesComponent.urlConfigVente + '/devis';
  constructor(protected httpClient: HttpClient) { }
  getAllCommande(): Observable<any> {
    return this.httpClient.get<CommandeModel[]>(this.url);
  }
  getCommandeById(code_cmd: number) {
    return this.httpClient.get<CommandeModel>(this.url + '/' + code_cmd);
  }

  addCommande(commande: CommandeModel): Observable<any> {
    return this.httpClient.post(this.url, commande);
  }
  updateCommandes(commande: CommandeModel, id: number): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, commande);
  }
  updateCommandeStatut(statut, code_cmd) {
    return this.httpClient.put(this.url + '/test/' + code_cmd, statut);
  }

  deleteCommandes(code_cmd) {
    return this.httpClient.delete(this.url + '/' + code_cmd);
  }

  findProductByCode(code: string) {
    return this.httpClient.get<ProductModel>(this.url + '/' + code);
  }
  getCommandeByDevis(id: number) {
    return this.httpClient.get<CommandeModel>(this.url2 + '/' + id + '/commande');
  }

  addCommande2(commande) {
    return this.httpClient.post<CommandeModel>(this.url, commande)
  }
  getAllcommandeContrat() {
    return this.httpClient.get(this.url + '/contrat')
  }
  getAllcommandeDevis() {
    return this.httpClient.get<CommandeModel[]>(this.url + '/devis')
  }
}