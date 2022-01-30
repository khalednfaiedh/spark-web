import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CritereQualiteModel } from "./critere-qualite.model";
import { PagesComponent } from "../../pages.component";

@Injectable({
    providedIn: 'root'
  })
  export class CritereQualiteService {
  
    url = PagesComponent.urlConfigStock+'/critereQualites';
  
    constructor(protected httpClient: HttpClient) {
    }
    getAllCritereQualite() {
      return this.httpClient.get<CritereQualiteModel[]>(this.url);
    }
    getCritereQualiteByID(id: number) {
      return this.httpClient.get<CritereQualiteModel>(this.url + '/' + id);
    }
    addCritereQualite(critereQuantite: CritereQualiteModel){
      return this.httpClient.post(this.url, critereQuantite);
    }
    updateCritereQualite(critereQualite: CritereQualiteModel){
      return this.httpClient.put(this.url + '/' + critereQualite.id, critereQualite);
    }
    deleteCritereQualite(id){
      return this.httpClient.delete(this.url + '/' + id);
    }
  }