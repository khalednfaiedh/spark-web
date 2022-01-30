import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import {  Operation } from './operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  url = PagesComponent.urlGPAOConfig+ '/operations';
  url2 = PagesComponent.urlGPAOConfig  + '/phase';
   
  //{id}/

  constructor(private httpClient: HttpClient) { }

   getAllOperationByPhase(id)
   {
     return this.httpClient.get< Operation[]>(this.url2+'/'+id+'/operations')
   }


   addOperation(id, operation)
   {
     return this.httpClient.post<Operation>(this.url2+'/'+id+'/operations',operation);
   }


   //entreprise/{id}/nomenclatures/{idNomenclature}
    updateOperation(  idPhase,operation)
   {

     return this.httpClient.put<Operation>(this.url2+'/'+idPhase+'/operations/' +operation.id,operation)
   }


   deleteOperationById(id)
   {
     return this.httpClient.delete(this.url+'/'+id);
   }


  
   getOperationId(id)
   {
    return this.httpClient.get< Operation>(this.url+'/'+id);
   }
}
