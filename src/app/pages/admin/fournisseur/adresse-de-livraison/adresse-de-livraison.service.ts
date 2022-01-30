import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdresseDeLivraisonModal } from './AdresseDeLivraison.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class AdresseDeLivraisonService {

  constructor(protected httpClient: HttpClient) { }
  url= PagesComponent.urlConfigAdmin +'/adresseDeLivraisons';
  url1= PagesComponent.urlConfigAdmin + '/fournisseur';
  
  AddAdresseDeLivraisonsFournisseur(adresseDeLivraisons:AdresseDeLivraisonModal,idF: number){
    return this.httpClient.post(this.url1+'/'+idF+'/adresseDeLivraisons',adresseDeLivraisons)
  }
  
  deleteAdresseDeLivraisons(id:number){
    return this.httpClient.delete(this.url+'/'+id);
  }
  updateadresseDeLivraisonsFournisseur(adresseDeLivraisons:AdresseDeLivraisonModal ,idF: number){
    return this.httpClient.put(this.url1 + '/' + idF +'/adresseDeLivraisons/'+ adresseDeLivraisons.id,adresseDeLivraisons);
  }
  getadresseDeLivraisonsFournisseur(id: number){
    return this.httpClient.get<AdresseDeLivraisonModal>(this.url1+'/'+id+'/adresseDeLivraisons');
  }
  


}




