import { Injectable } from "@angular/core";
import { PagesComponent } from "../../../pages.component";
import { HttpClient } from "@angular/common/http";
import { CompteBancaireModel } from "./compte-bancaire.model";

@Injectable({
    providedIn: 'root'
  })
  export class CompteBancaireService {
    url1 = PagesComponent.urlConfigAdmin + '/entreprise';
    url2 = PagesComponent.urlConfigAdmin + '/coordonneesBancaires';

    constructor(private httpClient: HttpClient) { }
  
    addCompte(idEntreprise: number,compte: CompteBancaireModel) {
      return this.httpClient.post<CompteBancaireModel>(this.url1+'/'+ idEntreprise + '/coordonneesBancaires', compte);
    }
    getAllCompte(idEntreprise:number){
      return this.httpClient.get<CompteBancaireModel[]>(this.url1 +'/'+ idEntreprise + '/coordonneesBancaires');
    }
    getAllCompteMin(idEntreprise:number){
      return this.httpClient.get<CompteBancaireModel[]>(this.url1 +'/'+ idEntreprise + '/coordonneesBancairesMin');
    }
    getCompteById(id:number){
      return  this.httpClient.get<CompteBancaireModel>(this.url2+'/'+id);
    }
    deleteCompte (id: number) {
      return this.httpClient.delete(this.url2+'/'+id);
     }
    updateCompte (idEntreprise:number ,compte: CompteBancaireModel){
       return this.httpClient.put<CompteBancaireModel>(this.url1 +'/'+ idEntreprise + '/coordonneesBancaires/' + compte.idC, compte);
     }
  }
  
  