import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CategorieMachineModel } from './categorie-machine.model';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class CategorieMachineService {
  url = PagesComponent.urlConfigAdmin + '/categoriesMachines';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise';
  constructor(protected httpClient: HttpClient) { }


  getAllCategorieMByEntreoriseId(id:number) {
    return this.httpClient.get<CategorieMachineModel[]>(this.url2+'/'+id+'/categoriesMachines');
  }
  getCategorieMById(id: number){
    return this.httpClient.get<CategorieMachineModel>(this.url + '/' + id);
  }
  addCategorieM(id:number, categorieM: CategorieMachineModel) {
    return this.httpClient.post(this.url2+'/'+id+'/categoriesMachines', categorieM);
  }
  updateCategorieM( id:number, categorieM: CategorieMachineModel) {
    return this.httpClient.put(this.url2+'/'+id+'/categoriesMachines'+ '/' + categorieM.id, categorieM);
  }
  deleteCategorieM(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
