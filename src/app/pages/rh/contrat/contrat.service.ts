import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { ContratModel } from './contrat.model';
import { EmployeMinModel } from '../../admin/employe-list/employe-list.model';

@Injectable({
  providedIn: 'root',
})
export class ContratService {

  url1 = PagesComponent.urlConfigPaie + '/employee';
  url = PagesComponent.urlConfigPaie + '/contrats';

  constructor(protected httpClient: HttpClient) { }

  getAllContrats(matricule: number) {
    return this.httpClient.get<any>(this.url1 + "/" + matricule + "/contrats");
  }
  getCurrentContrats(matricule: number) {
    return this.httpClient.get<ContratModel>(this.url1+ "/" + matricule + "/contratActive");
  }
  getContratsById(id: number) { // id contract
    return this.httpClient.get<ContratModel>(this.url + '/' + id);
  }

  addContrats(contrat: ContratModel, matricule: number) {
    return this.httpClient.post(this.url1 + "/" + matricule + "/contrats", contrat);
  }
  updateContrats(contrat: ContratModel, matricule: number) {
    return this.httpClient.put(this.url1 + "/" + matricule + "/contrats/" + contrat.id , contrat);
  }
  deleteContrat(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }


  getListContrats(employee:EmployeMinModel[]) {
    return this.httpClient.post<any[]>(this.url1 + "/cout", employee);
  }
}