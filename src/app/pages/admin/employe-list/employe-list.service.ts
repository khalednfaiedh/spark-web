import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeListModel, EmployeMinModel } from './employe-list.model';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root',
})
export class EmployeListService {
  url = PagesComponent.urlConfigAdmin + '/employees';
  url1 = PagesComponent.urlConfigAdmin + '/entreprise';
  url2 = PagesComponent.urlConfigPaie + '/employe';

  constructor(protected httpClient: HttpClient) { }
  getAllEmployes(idEntreprise) {

    return this.httpClient.get<EmployeListModel[]>(this.url1 +
      '/' + idEntreprise + '/employees');
  }
  getAllEmployesMensuelle(idEntreprise: number) {
    return this.httpClient.get<EmployeListModel[]>(this.url2 + 'Mensuelle/' + idEntreprise);
  }
  getAllEmployesParHeure(idEntreprise: number) {
    return this.httpClient.get<EmployeListModel[]>(this.url2 + 'ParHeure/' + idEntreprise);
  }
  getAllEmployees2(idEntreprise: number) {
    return this.httpClient.get<EmployeListModel[]>(this.url2 + 'min/' + idEntreprise);
  }
  getAllEmployeesMin() {
    let idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<EmployeMinModel[]>(this.url1 +
      '/' + idEntreprise + '/employees/min');
  }

  getEmployesMinbyEntreprise(idEntreprise: number) {
    return this.httpClient.get<EmployeMinModel[]>(this.url2 + 'min/' + idEntreprise);
  }
  getEmployesById(id: number) {
    return this.httpClient.get<EmployeListModel>(this.url + '/' + id);
  }
  getEmployeMinById(id: number) {
    return this.httpClient.get<EmployeMinModel>(this.url2 + '/' + id + '/min');
  }
  addEmployes(emp: EmployeListModel) {
    emp.idE = +localStorage.getItem('current_entreprise')
    return this.httpClient.post(this.url, emp);
  }
  updateEmployes(employeListModel: EmployeListModel) {
    return this.httpClient.put(this.url + '/' + employeListModel.matricule, employeListModel);
  }
  deleteEmployes(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}