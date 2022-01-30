import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrandLivreService {
  url = PagesComponent.urlComptabliteConfig + '/plans/general';
  url1 = PagesComponent.urlComptabliteConfig + '/plans/grandLivreGeneral';
  
  
  constructor(private httpClient: HttpClient)  {}

    grandLivreGeneral(annee){
      return this.httpClient.get<any[]>(this.url+'/'+annee);
    }

    getGrandLivreByClasse(annee,classe)
    {
      return this.httpClient.get<any[]>(this.url+'/'+annee+'/'+classe);
    }

    filterGrandLivreGeneral(grandLivre ){
      return this.httpClient.post<any[]>(this.url1,grandLivre);
    }

    filterGrandLivreGeneralByTousCritere(grandLivre ){
      return this.httpClient.post<any[]>(this.url1+'/classe',grandLivre);
    }

    exportGrandLivre(model)
    {
      return this.httpClient.post<any>(this.url+'/export',model);
    }
  }

