import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PagesComponent } from "../../pages.component";
import { UniteDeTransactionModel } from "./UniteDeTransaction.model";

@Injectable({
  providedIn: 'root'
})
export class UniteDeTransactionService {

  url = PagesComponent.urlConfigAdmin + '/uniteDeTransactions';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  url3 = PagesComponent.urlConfigAdmin + '/converter/';
  constructor(protected httpClient: HttpClient) { }
  getAllUniteDeTransaction(id: number) {
    return this.httpClient.get<UniteDeTransactionModel[]>(this.url2 + id + '/uniteDeTransactions')
  }

  getUniteDeTransactionById(id: number) {
    return this.httpClient.get<UniteDeTransactionModel>(this.url + '/' + id);
  }

  //entreprise/{id}/uniteDeTransactions/etat

  getUniteDeTransactionByIdEntrepriseAndEtat(id: number) {
    return this.httpClient.get<UniteDeTransactionModel>(this.url2  + id +'/uniteDeTransactions/etat');
  }


  addUniteDeTransaction(uniteDeTransaction: UniteDeTransactionModel, id: number) {
    return this.httpClient.post(this.url2 + id + '/uniteDeTransactions', uniteDeTransaction);
  }
  updateUniteDeTransaction(uniteDeTransaction: UniteDeTransactionModel,id) {
    return this.httpClient.put(this.url2+id + '/uniteDeTransactions/' + uniteDeTransaction.idT, uniteDeTransaction);
  }
  deleteUniteDeTransaction(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  converterChiffreParUnite(chiffre: number, id: number) {
    return this.httpClient.get(this.url3 + chiffre + '/uniteDeTransactions/' + id)
  }
}