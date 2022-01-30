import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Ligne } from './ligne';

@Injectable({
  providedIn: 'root'
})
export class LigneService {
  url = PagesComponent.urlGPAOConfig+ '/ilot';

  url2 = PagesComponent.urlGPAOConfig+ '/lignes';
   
  

  constructor(private httpClient: HttpClient) { }

   getAllLigneByIlot(id)
   {
     return this.httpClient.get< Ligne[]>(this.url+'/'+id+'/lignes')
   }


   addLigne( id,ligne)
   {
     return this.httpClient.post<Ligne>(this.url+'/'+id+'/lignes' , ligne)
   }

    updateLigne( id,ligne)
   {

     return this.httpClient.put<Ligne>(this.url+'/' +id+'/lignes/'+ligne.id,ligne)
   }


   deleteLigneById(id)
   {
     return this.httpClient.delete(this.url2+'/'+id);
   }

   getLigneById(id)
   {
     return this.httpClient. get<Ligne>(this.url2+'/'+id);
   }
}
