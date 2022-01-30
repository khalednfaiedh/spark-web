import { Injectable } from '@angular/core';
// import { PagesComponent } from '../pages.component';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class BlanceGeneralService {
  url = PagesComponent.urlComptabliteConfig + '/plans/grnadBalance';
  url2 = PagesComponent.urlComptabliteConfig + '/plans/balance/general/betwenTwoDate';
  url3=PagesComponent.urlComptabliteConfig + '/plans/balance/general/export'
  url4=PagesComponent.urlComptabliteConfig + '/balance/general/export/pdf'

  constructor(private httpClient: HttpClient) { }

  getBalanceGeneral(annee){
    return this.httpClient.get<any>(this.url+'/'+annee);
  }
  getBalanceGeneralAndClasse(annee,classe){
    return this.httpClient.get<any>(this.url+'/'+annee+'/'+classe);
  }

 balanceBetwenTwoDate(balance){
  return this.httpClient.post<any>(this.url2,balance);
 }
 
 balanceBetwenTwoDateAndClasse(balance){
  return this.httpClient.post<any>(this.url2+'/classe',balance);
 }


 /* export to excel */

 exportBalanceGeneral(annee){
  return this.httpClient.get<any>(this.url3+'/'+annee);
}
exportBalanceGeneralAndClasse(annee,classe){
  return this.httpClient.get<any>(this.url3+'/'+annee+'/'+classe);
}

exportBalanceBetwenTwoDate(balance){
return this.httpClient.post<any>(this.url3+'/betwenTwoDate',balance);
}

 exportBalanceBetwenTwoDateAndClasse(balance){
return this.httpClient.post<any>(this.url3+'/betwenTwoDate/classe',balance);
}
exportBalanceGeneralToPdf(balance){
  return this.httpClient.post<any>(this.url4,balance);
  }

}
