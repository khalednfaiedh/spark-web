import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { Planning } from './planning';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  url = PagesComponent.URl + '/planning';
 constructor(protected httpClient: HttpClient) { }
  getAll() {
    return this.httpClient.get<Planning[]>(this.url);
  }
  getAllEnCours(id:Number){
    return this.httpClient.get<Planning[]>(this.url+'/'+ id +'/encours'); 
  }
  getById(id: number) {
    return this.httpClient.get<Planning>(this.url + '/' + id);
  }
  
  add(planning: Planning) {
    return this.httpClient.post(this.url, planning);
  }
  update(planning: Planning) {
    return this.httpClient.put(this.url + '/' + planning.idPlanning, planning);
  }
  delete(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
