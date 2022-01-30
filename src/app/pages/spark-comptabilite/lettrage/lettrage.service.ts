import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { ModaLettragePost } from './lettrage.component';

@Injectable({
  providedIn: 'root'
})
export class LettrageService {
  url = PagesComponent.urlComptabliteConfig + '/lettrages/generale';
  url2 = PagesComponent.urlComptabliteConfig + '/dlettrages/generale';
  url3 = PagesComponent.urlComptabliteConfig + '/lettrages/tiers';
  url4= PagesComponent.urlComptabliteConfig + '/dlettrages/tiers';
  constructor(private httpClient: HttpClient) { }

  getLettrage(id,annee)
  {
    return this.httpClient.get<any>(this.url+'/'+id+'/'+annee);
  }
   nonLettrage(id,annee,etat)
  {
    return this.httpClient.get<any>(this.url+'/'+id+'/'+annee+'/'+etat);
  }
   lettrageManuelle(listOperation)
  {
    return this.httpClient.post<any>(this.url,listOperation);
  }

  getListOperationNonLetreeByCompteGenerale(id,annee,etat)
  {
    return this.httpClient.get<any>(this.url+'/'+id+'/'+annee+'/etat/'+etat);
  }
 
  incrementLettre(s:string)
  {
    return this.httpClient.get<any>(this.url+'/lettre/'+s);
  }

   delletrageTousLesEcriture(idCompte,annee)
  {
    return this.httpClient.get<any>(this.url2+'/'+idCompte+'/'+annee);
  }

  delletrageByTwoLettre( modaLettragePost:ModaLettragePost)
  {
    return this.httpClient.post<any>(this.url2,modaLettragePost);
  }
  getAllLettrageTiers(id,annee)
  {
    return this.httpClient.get<any>(this.url3+'/'+id+'/'+annee);
  }
  getOperationByEtatAndAnneeAndCompteTiers(id,annee,etat)
  {
    return this.httpClient.get<any>(this.url3+'/'+id+'/'+annee+'/etat/'+etat);
  }
  delletrageAllByCompteTierAndAnee(idCompte,annee)
  {
    return this.httpClient.get<any>(this.url4+'/'+idCompte+'/'+annee);
  }
  delletrageTierByTwoLettre( modaLettragePost:ModaLettragePost)
  {
    return this.httpClient.post<any>(this.url4,modaLettragePost);
  }

   deletrageGeneralChecked(operations)
  {
    return this.httpClient.post<any>(this.url2+'/checked',operations);
  }
}
