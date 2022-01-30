import { Injectable } from "@angular/core";
import { PagesComponent } from "../../../pages.component";
import { HttpClient } from "@angular/common/http";
import { CompteBancaireModel } from "./compte-bancaire.model";

@Injectable({
  providedIn: 'root'
})
export class CompteBancaireService {
  url = PagesComponent.urlConfigAdmin + '/coordonneesBancaires'
  url1 = PagesComponent.urlConfigAdmin + '/fournisseur';

  constructor(private httpClient: HttpClient) { }

  getAll(id: number) {
    return this.httpClient.get<CompteBancaireModel[]>(this.url1 + '/' + id + '/coordonneesBancaires');
  }
  getById(id: number) {
    return this.httpClient.get<CompteBancaireModel>(this.url + '/' + id);
  }
  add(coordonneesBancaire: CompteBancaireModel, idF: number) {
    return this.httpClient.post(this.url1 + '/' + idF + '/coordonneesBancaires', coordonneesBancaire)
  }
  update(coordonneesBancaire: CompteBancaireModel, idF: number) {
    return this.httpClient.put(this.url1 + '/' + idF + '/coordonneesBancaires/' + coordonneesBancaire.idC, coordonneesBancaire);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }


}