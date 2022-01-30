import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Atelier } from './atelier';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  url = PagesComponent.urlConfigAdmin + '/entreprise';
  url2 = PagesComponent.urlConfigAdmin + '/site';
  url3 = PagesComponent.urlConfigAdmin + '/ateliers';

  constructor(private httpClient: HttpClient) { }

   getAllAtelier(id)
   {
     return this.httpClient.get<Atelier[]>(this.url+'/'+id+'/ateliers')
   }


   addAtelier(idSite,atelier)
   {
     return this.httpClient.post<Atelier>(this.url2+'/'+idSite+'/ateliers',atelier)
   }

    updateAtelier(atelier)
   {

     return this.httpClient.put<Atelier>(this.url3+'/'+atelier.id,atelier)
   }


   deleteAtelierById(id)
   {
     return this.httpClient.delete(this.url3+'/'+id);
   }

   getAtelierById(id)
   {
     return this.httpClient. get<Atelier>(this.url3+'/'+id);
   }
  

}
