import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PagesComponent } from "../../../pages.component";

@Injectable({
    providedIn: 'root'
  })
  export class HistoriqueCommandeService {
    url= PagesComponent.urlConfigAchat +'/historiqueCommandes';
    url1= PagesComponent.urlConfigAchat +'/commande';
    
    constructor(protected httpClient: HttpClient) { }
    getAllHistoriqueCommande():Observable<any> {
      return this.httpClient.get(this.url);
    }
    getAllHistoriqueCommandeByCommande(id: number):Observable<any> {
      return this.httpClient.get(this.url1 + '/' + id + "/historiqueCommandes");
    }
  }
  