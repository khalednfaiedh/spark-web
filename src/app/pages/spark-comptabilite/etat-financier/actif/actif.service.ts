import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';
import { filterDate } from './actif.component';

@Injectable({
  providedIn: 'root'
})
export class ActifService {

  
    url=PagesComponent.urlComptabliteConfig + '/actifs'
  
    constructor(private httpClient: HttpClient) { }
  
    getListActif(annee){
      return this.httpClient.get<any>(this.url+'/'+annee);
    }
    getListActifByTwoDate(filtre){
      return this.httpClient.post<any>(this.url,filtre);
    }

     calculByBalanceImporter( balance){
      return this.httpClient.post<any>(this.url+'/imports', balance);
    }
}
