import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagesComponent } from "../../pages.component";
import { StockModel } from "../stock-etat/stock.model";

@Injectable({
    providedIn: 'root'
  })
  export class StockEtatService {
  
    url0 = PagesComponent.urlConfigStock + '/stock';
    url1 = PagesComponent.urlConfigStock + '/produit/';
    url2 = PagesComponent.urlConfigStock + '/entreprise/';

    constructor(protected httpClient: HttpClient) {
    }
  
    stockEtatByProduit(idP:number):Observable<any> {
      return this.httpClient.get(this.url1 + idP + '/stocks');
    }

    getAll():Observable<any> {
      let idE = +localStorage.getItem("current_entreprise")
      return this.httpClient.get(this.url2 + idE + '/stocks');
    }
    save(stk: StockModel){
      return this.httpClient.post(this.url0, stk);
    }
}
