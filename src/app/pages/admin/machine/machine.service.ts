import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { MachineModel } from './machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  url = PagesComponent.urlConfigAdmin + '/categorieMachine';
  url1 = PagesComponent.urlConfigAdmin + '/machines';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise';
//
  constructor(private httpClient: HttpClient) { }

  addMachine(machine: MachineModel, id: number) {
    return this.httpClient.post(this.url1, machine);
  }
  addMachineByCategorie(idCategorieMachine: number, machine: MachineModel) {
    return this.httpClient.post(this.url + '/' + idCategorieMachine + '/machines' , machine);
  }
  getAllMachines() {
    return this.httpClient.get<MachineModel[]>(this.url1);
  }
  getAllMachinesByCategorie(idCategorie: number) {
    return this.httpClient.get<MachineModel[]>(this.url + "/" + idCategorie + "/machines");
  }
  getMachineById(id: number) {
    return this.httpClient.get<MachineModel>(this.url1 + '/' + id);
  }
  deleteMachine(id: number) {
    return this.httpClient.delete(this.url1 + '/' + id);
  }
  updateMachine(machine: MachineModel) {
    return this.httpClient.put<MachineModel>(this.url1 + '/' + machine.id, machine);
  }
  updateMachineByCategorie(machine: MachineModel, idCategorie: number, id: number) {
    return this.httpClient.put<MachineModel>(this.url + '/' + idCategorie + '/machines/' + id, machine);
  }
  getCatalogName(id: number) {
    return this.httpClient.get(this.url + 'machines/' + id)

  }

  getAllMachinesByEntreprise( id: number) {
    return this.httpClient.get<MachineModel[]>(this.url2 + "/" +  id + "/machines");
  }

   getMachineByPostCharge(machine: MachineModel[]) {
    return this.httpClient.post<any[]>(this.url1+'/cout', machine);
  }
  
}