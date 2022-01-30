import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EtapeCommandeModel } from "./etape-commande.model";
import { PagesComponent } from "../../pages.component";

@Injectable({
    providedIn: 'root',
  })
  export class EtapeCommandeService {
    url= PagesComponent.urlConfigAchat +'/etapeCommandes';
    constructor(protected httpClient: HttpClient) { }
    getAllEtapeCommande():Observable<any> {
      return this.httpClient.get(this.url);
    }
    getEtapeCommandeById(idF: number):Observable<any> {
      return this.httpClient.get(this.url + '/' + idF);
    }
    addEtapeCommandes(etapeCommande: EtapeCommandeModel) {
      return this.httpClient.post(this.url, etapeCommande);
    }
    updateEtapeCommandes(etapeCommande: EtapeCommandeModel) {
      return this.httpClient.put(this.url + '/' + etapeCommande.id, etapeCommande);
    }
    deleteEtapeCommandes(id: Number) {
      return this.httpClient.delete(this.url + '/' + id);
    }
  }