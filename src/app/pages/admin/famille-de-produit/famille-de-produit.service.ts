import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FamilleDeProduitModel } from "./famille-de-produit.model";
import { PagesComponent } from "../../pages.component";

@Injectable({
    providedIn: 'root'
  })
  export class FamilleDeProduitService {
   
    url1=PagesComponent.urlConfigAdmin +'/entreprise';
    url= PagesComponent.urlConfigAdmin +'/familleDeProduits';
    constructor(protected httpClient: HttpClient) { }
    getAllFamilleDeProduit(id) {
      return this.httpClient.get<FamilleDeProduitModel[]>(this.url1+'/'+id+'/familleDeProduits');
    }
    getFamilleDeProduitById(id: number){
      return this.httpClient.get<FamilleDeProduitModel>(this.url + '/' + id);
    }
    addFamilleDeProduit(idEntreprise ,familleDeProduit: FamilleDeProduitModel) {
      return this.httpClient.post(this.url1+'/'+idEntreprise+'/familleDeProduits', familleDeProduit);
    }
    updateFamilleDeProduit( idEntreprise ,familleDeProduit: FamilleDeProduitModel) {
      return this.httpClient.put(this.url1+'/'+idEntreprise+ '/familleDeProduits/' + familleDeProduit.id, familleDeProduit);
    }
    deleteFamilleDeProduit(id: Number) {
      return this.httpClient.delete(this.url + '/' + id);
    }
  }