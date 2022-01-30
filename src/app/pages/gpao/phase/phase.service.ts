import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Phase } from './phase';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  url = PagesComponent.urlGPAOConfig+ '/phases';
  url2 = PagesComponent.urlGPAOConfig  + '/gammeOperatoire';
  url3 = PagesComponent.urlGPAOConfig+ '/entreprise';
   
  //{id}/

  constructor(private httpClient: HttpClient) { }

   getAllPhaseByGamme(id)
   {
     return this.httpClient.get< Phase[]>(this.url2+'/'+id+'/phases')
   }


   getAllPhaseByEntreprise(id)
   {
     return this.httpClient.get< Phase[]>(this.url3+'/'+id+'/phases')
   }

   addPhase(id, phase)
   {
     return this.httpClient.post<Phase>(this.url2+'/'+id+'/phases',phase);
   }


   //entreprise/{id}/nomenclatures/{idNomenclature}
    updatePhase(  idGamme,phase)
   {

     return this.httpClient.put<Phase>(this.url2+'/'+idGamme+'/phases/' +phase.id,phase)
   }


   deletePhaseById(id)
   {
     return this.httpClient.delete(this.url+'/'+id);
   }


  
   getPhaseId(id)
   {
    return this.httpClient.get< Phase>(this.url+'/'+id);
   }
}
