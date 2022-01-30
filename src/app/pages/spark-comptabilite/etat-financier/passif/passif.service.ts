import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassifService {

  url=PagesComponent.urlComptabliteConfig + '/passifs'
  
  constructor(private httpClient: HttpClient) { }

  getListPassif(annee){
    return this.httpClient.get<any>(this.url+'/'+annee);
  }
  getListPassifByTwoDate(filtre){
    return this.httpClient.post<any>(this.url,filtre);
  }
}
