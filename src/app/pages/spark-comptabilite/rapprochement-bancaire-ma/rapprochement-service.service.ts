import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RapprochementServiceService {
  url = PagesComponent.urlComptabliteConfig +'/rapprochementBancaires';
  constructor(private httpClient: HttpClient) { }

  findAll(id,annee,cod)
  {
    return this.httpClient.get<any>(this.url+'/'+id+'/'+annee+'/'+cod);
  }

  findByEtat( id,annee, cod,etat)
  {
    return this.httpClient.get<any>(this.url+'/'+id+'/'+annee+'/'+cod+'/'+etat);
  }

  rapprocher(listOperation)
  {
    return this.httpClient.post<any>(this.url,listOperation);
  }
}
