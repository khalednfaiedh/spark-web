import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivreTiersService {
  url= PagesComponent.urlComptabliteConfig + '/plans/grandLivreTiers';
  url2= PagesComponent.urlComptabliteConfig + '/plans/tiers';
  
  
  constructor(private httpClient: HttpClient)  {}

   filterGarndLivreTiers(grandLivre ){
    return this.httpClient.post<any[]>(this.url,grandLivre);
  }

  filterGrandLivreGeneralByTousCritere(grandLivre ){
    return this.httpClient.post<any[]>(this.url+'/classe',grandLivre);
  }


  GarndLivreTiers(annee){
    return this.httpClient.get<any[]>(this.url2+'/'+annee);
  }

  getGrandLivreTiersByClasse(annee,classe)
  {
    return this.httpClient.get<any[]>(this.url2+'/'+annee+'/'+classe);
  }


  exportGrandLivreTier(operations)
  {
    return this.httpClient.post<any>(this.url2+'/export',operations);
  }
}
