import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeclartionTVAService {
  url = PagesComponent.urlComptabliteConfig + '/declartions';
  url2 = PagesComponent.urlComptabliteConfig + '/typesDeclartion';
  url3 = PagesComponent.urlComptabliteConfig + '/journals/paie';
  
  constructor(private httpClient: HttpClient) { }

  declartionTva(declartion) {
    return this.httpClient.post<any>(this.url+'/filtre', declartion);
  }

   saveDeclartion(declartion) {
    return this.httpClient.post<any>(this.url, declartion);
  }

  getTypeDeclartion( ) {
    return this.httpClient.get<any>(this.url2,);
  }

   saveAllJournal( list) {
    return this.httpClient.post<any>(this.url3,  list);
  }
  recapeSalariee( recape) {
    return this.httpClient.post<any>(this.url3+'/recape',   recape);
  }
}
