import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { EnfantModel } from './enfant-model';

@Injectable({
  providedIn: 'root'
})
export class EnfantService {

  url1 = PagesComponent.urlConfigAdmin + '/enfants';
  url = PagesComponent.urlConfigAdmin + '/employe';
  constructor(protected httpClient: HttpClient) { }
  getAllEnfant(idEmp: number) {  
    return this.httpClient.get<EnfantModel[]>(this.url + '/' + idEmp + '/enfants');
  }
  getEnfantById(id: number) {
    return this.httpClient.get<EnfantModel>(this.url1 + '/' + id);
  }
  addEnfant(enfant: EnfantModel, idEmp: number) {
    return this.httpClient.post(this.url + '/' + idEmp + '/enfants', enfant);
  }
  updateEnfant(enfant: EnfantModel, idEmp: number) {
    return this.httpClient.put(this.url + '/' + idEmp + '/enfants/' + enfant.id, enfant);
  }
  deleteEnfant(id: Number) {
    return this.httpClient.delete(this.url1 + '/' + id);
  }
}
