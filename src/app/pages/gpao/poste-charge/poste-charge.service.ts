import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { PosteCharge } from './posteCharge';

@Injectable({
  providedIn: 'root'
})
export class PosteChargeService {

  url = PagesComponent.urlGPAOConfig+ '/ligne';
  url2 = PagesComponent.urlGPAOConfig+ '/section';
  url3= PagesComponent.urlGPAOConfig+ '/posteCharges';
  url5= PagesComponent.urlGPAOConfig+ '/posteCharge';
  url4=PagesComponent.urlGPAOConfig+ '/entreprise';
 //entreprise/{id}/machines/dosponible
  constructor(private httpClient: HttpClient) { }


   getAllPosteChargeByLigne(id)
   {
     return this.httpClient.get< PosteCharge[]>(this.url+'/'+id+'/posteCharges')
   }

   getAllPosteChargeBySection(id)
   {
     return this.httpClient.get< PosteCharge[]>(this.url2+'/'+id+'/posteCharges')
   }



   addPosteCharge(postecharge)
   {
     return this.httpClient.post<PosteCharge>(this.url3, postecharge)
   }


    updatePosteCharge(postecharge)
   {

     return this.httpClient.put<PosteCharge>(this.url3+'/'+postecharge.id,postecharge)
   }



   deletePosteChargeById(id)
   {
     return this.httpClient.delete(this.url3+'/'+id);
   }

   getListMachineDisponible(idEntreprise)
   {
      return this.httpClient.get<any[]>(this.url4+'/'+idEntreprise+'/machines/dosponible')
   }

   getPosteDeChargeByEntreprise(idEntreprise)
   {
      return this.httpClient.get<any[]>(this.url4+'/'+idEntreprise+'/posteCharges')
   }

///posteCharge/machines/{id}/infoarmation
   getInformationmachine(idmachine:number)
   {
    return  this.httpClient.get<any>(this.url5+'/machines/'+idmachine+'/infoarmation');
   }
}
