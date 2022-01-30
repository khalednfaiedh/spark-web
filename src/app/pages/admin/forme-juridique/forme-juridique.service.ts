import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormeJuridiqueModel } from "./forme-juridique.model";
import { PagesComponent } from "../../pages.component";

@Injectable({
  providedIn: 'root'
})
export class FormeJuridiqueService {

  url = PagesComponent.urlConfigAdmin + '/formeJuridiques';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }
  getAllFormeJuridique(id: number) {
    return this.httpClient.get<FormeJuridiqueModel[]>(this.url2 + id + '/formeJuridiques');
  }

  getFormeJuridiqueById(id: number) {
    return this.httpClient.get<FormeJuridiqueModel>(this.url + '/' + id);
  }
  addFormeJuridique(formeJuridique: FormeJuridiqueModel, id: number) {
    return this.httpClient.post(this.url2 + id + '/formeJuridiques', formeJuridique);
  }
  updateFormeJuridique(formeJuridique: FormeJuridiqueModel) {
    return this.httpClient.put(this.url + '/' + formeJuridique.id, formeJuridique);
  }
  deleteFormeJuridique(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}