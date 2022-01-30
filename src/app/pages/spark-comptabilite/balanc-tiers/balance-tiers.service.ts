import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class BalanceTiersService {

  url = PagesComponent.urlComptabliteConfig + '/plans/balanceTiers';
  url3 = PagesComponent.urlComptabliteConfig + '/plans/balance/tiers';
  url2 = PagesComponent.urlComptabliteConfig + '/plans/balance/tiers/betwenTwoDate';

  url4 = PagesComponent.urlComptabliteConfig + '/plans/balance/tiers/export';
  url5 = PagesComponent.urlComptabliteConfig + '/balance/Tier/export/pdf';
  ///balance/tiers/{annee}/{classe}
  constructor(private httpClient: HttpClient) { }

  getBalanceTiers(annee){
    return this.httpClient.get<any>(this.url+'/'+annee);
  }

  getBalanceTierslAndClasse(annee,classe){
    return this.httpClient.get<any>(this.url3+'/'+annee+'/'+classe);
  }
  BalanceIsBetweenTwoDate(balance)
  {
    return this.httpClient.post<any>(this.url2,balance);
  }

  balanceBetwenTwoDateAndClasse(balance){
    return this.httpClient.post<any>(this.url2+'/classe',balance);
   }

   /* export */

   exportBalanceTiers(annee){
    return this.httpClient.get<any>(this.url4+'/'+annee);
  }

  exportBalanceTierslAndClasse(annee,classe){
    return this.httpClient.get<any>(this.url4+'/'+annee+'/'+classe);
  }
  exportBalanceIsBetweenTwoDate(balance)
  {
    return this.httpClient.post<any>(this.url4+'/betwenTwoDate',balance);
  }

  exportBalanceBetwenTwoDateAndClasse(balance){
    return this.httpClient.post<any>(this.url4+'/betwenTwoDate/classe',balance);
   }
   exportBalanceTierToPdf(balance){
    return this.httpClient.post<any>(this.url5,balance);
    }
  
  
  

}
