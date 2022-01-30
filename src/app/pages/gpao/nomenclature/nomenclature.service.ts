import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Nomenclature } from './nomenclature';

@Injectable({
  providedIn: 'root'
})
export class NomenclatureService {

  url = PagesComponent.urlConfigAdmin+ '/nomenclatures';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise';
  url3 = PagesComponent.urlConfigAdmin+ '/nomenclature/';
  //{id}/

  constructor(private httpClient: HttpClient) { }

   getAllNomenclatureByEntreprise(id)
   {
     return this.httpClient.get< Nomenclature[]>(this.url2+'/'+id+'/nomenclatures')
   }


   addNomenclature(id, nomenclature)
   {
     return this.httpClient.post<Nomenclature>(this.url2+'/'+id+'/nomenclatures',nomenclature);
   }


   //entreprise/{id}/nomenclatures/{idNomenclature}
    updateNomenclature( idEntreprise,nomenclature)
   {

     return this.httpClient.put<Nomenclature>(this.url2+'/'+idEntreprise+'/nomenclatures/' +nomenclature.id,nomenclature)
   }


   deleteNomenclatureById(id)
   {
     return this.httpClient.delete(this.url+'/'+id);
   }


   getListComposantNomenclature(idNomenclature)
   {
     return  this.httpClient.get<any[]>(this.url3+idNomenclature+'/productNomenclatures')
   }

   getNomenclatureById(id)
   {
    return this.httpClient.get< Nomenclature>(this.url+'/'+id);
   }
}
