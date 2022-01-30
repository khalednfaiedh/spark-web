import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Ilot } from './ilot';

@Injectable({
  providedIn: 'root'
})
export class IlotService {

  url = PagesComponent.urlGPAOConfig+ '/atelier';
  url2 = PagesComponent.urlGPAOConfig+ '/ilots';

  constructor(private httpClient: HttpClient) { }

   getAllIlotByAtelier(id)
   {
     return this.httpClient.get< Ilot[]>(this.url+'/'+id+'/ilots')
   }


   addIlot( ilot)
   {
     return this.httpClient.post<Ilot>(this.url2 , ilot)
   }

    updateIlot( ilot)
   {

     return this.httpClient.put<Ilot>(this.url2+'/'+ilot.id,ilot)
   }


   deleteIlotById(id)
   {
     return this.httpClient.delete(this.url2+'/'+id);
   }
}
