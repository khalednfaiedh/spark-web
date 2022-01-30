import { FournisseurCategorie } from "./fournisseur-categorie.model";
import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class FournisseurCategorieService {
    url = PagesComponent.urlConfigAdmin + '/entreprise'
    url01 = PagesComponent.urlConfigAdmin + '/categorieFournisseurs';
   constructor(protected httpClient: HttpClient) { }
    getAll(id:number) {
      return this.httpClient.get<FournisseurCategorie[]>(this.url+'/'+id+'/categorieFournisseurs');
    }
 
    getById(id: number) {
      return this.httpClient.get<FournisseurCategorie>(this.url01 + '/' + id);
    }
    
    add(id:number,fournCatg: FournisseurCategorie) {
      return this.httpClient.post(this.url+'/'+id+'/categorieFournisseurs', fournCatg);
    }
    update(id:number,  fournCatg: FournisseurCategorie) {
      return this.httpClient.put(this.url+'/'+id+'/categorieFournisseurs/' + fournCatg.id, fournCatg);
    }
    delete(id: Number) {
      return this.httpClient.delete(this.url01 + '/' + id);
    }
  }
  