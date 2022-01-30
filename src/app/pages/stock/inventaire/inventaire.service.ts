import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InventaireModel } from "./inventaire.model";
import { PagesComponent } from "../../pages.component";

@Injectable({
    providedIn: 'root'
  })
  export class InventaireService {
  
    url2 =PagesComponent.urlConfigStock+'/entreprise/';

    constructor(protected httpClient: HttpClient) {
    }
    getAll() {
      let idE = +localStorage.getItem("current_entreprise")
      return this.httpClient.get<InventaireModel[]>(this.url2 + idE + '/inventaire');
    }
   
    add(inventaire: InventaireModel){
      let idE = +localStorage.getItem("current_entreprise")
      return this.httpClient.post(this.url2 + idE + '/inventaire', inventaire);
    }
  }
  