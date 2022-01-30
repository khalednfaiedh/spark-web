import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametrageTvaService {
  url = PagesComponent.urlComptabliteConfig + '/plan';
  url2 = PagesComponent.urlComptabliteConfig + '/parametragesTva';
  url3 = PagesComponent.urlComptabliteConfig + '/typesDeclartion';
  url4 =PagesComponent.urlComptabliteConfig+  '/exercice/parametragesTva';
  
  constructor(private httpClient: HttpClient) { }

   addParametre(id,parametre) {
    return this.httpClient.post<any>(this.url+'/'+id +'/parametragesTva', parametre);
  }

  updateParametre(id,parametre) {
    return this.httpClient.put<any>(this.url+'/'+id +'/parametragesTva'+'/'+parametre.id, parametre);
  }


  getParametreById(id) {
    return this.httpClient.get<any>(this.url2+'/'+id );
  }

  getAllParametre(id) {
    return this.httpClient.get<any>(this.url4+'/'+id );
  }

  deleteParametreById(id) {
    return this.httpClient.delete<any>(this.url2+'/'+id );
  }

  choisirTypeCalculDeclartionMensuelle( etat,id) {
    return this.httpClient.get<any>(this.url3+'/'+etat+'/'+id );
  }



  
}
