import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { GammeOperatoire } from './gammeOperatoire';

@Injectable({
  providedIn: 'root'
})
export class GammeOperatoireService {
  url = PagesComponent.urlGPAOConfig+ '/gammeOperatoires';
  url2 = PagesComponent.urlGPAOConfig  + '/entreprise';
   
  //{id}/

  constructor(private httpClient: HttpClient) { }

   getAllGammeOperatoireByEntreprise(id)
   {
     return this.httpClient.get< GammeOperatoire[]>(this.url2+'/'+id+'/gammeOperatoires')
   }


   addGammeOperatoire(id, gammeoperatoire)
   {
     return this.httpClient.post<GammeOperatoire>(this.url2+'/'+id+'/gammeOperatoires',gammeoperatoire);
   }


   //entreprise/{id}/nomenclatures/{idNomenclature}
    updateGammeOperatoire( idEntreprise,gammeoperatoire)
   {

     return this.httpClient.put<GammeOperatoire>(this.url2+'/'+idEntreprise+'/gammeOperatoires/' +gammeoperatoire.id,gammeoperatoire)
   }


   deleteGammeOperatoireById(id)
   {
     return this.httpClient.delete(this.url+'/'+id);
   }


  
   getGammeOperatoireById(id)
   {
    return this.httpClient.get< GammeOperatoire>(this.url+'/'+id);
   }
}
