import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { IRPPModel } from './irpp.model';

@Injectable({
  providedIn: 'root'
})
export class irppService {
  url = PagesComponent.urlConfigPaie + '/irpp';
  constructor(protected httpClient: HttpClient) { }
  getAllIRPP() {
    return this.httpClient.get<IRPPModel[]>(this.url);
  }
  getIRPPById(id: number) {
    return this.httpClient.get<IRPPModel>(this.url + '/' + id);
  }
  addIRPP(IRPP: IRPPModel) {
    return this.httpClient.post(this.url, IRPP);
  }
  updateIRPP(IRPP: IRPPModel) {
    return this.httpClient.put(this.url + '/' + IRPP.idIRPP, IRPP);
  }
  deleteIRPP(id: Number) {
    return this.httpClient.delete(this.url +'/' + id);
  }
}
