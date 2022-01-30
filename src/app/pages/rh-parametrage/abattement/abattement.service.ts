import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { AbattementModel } from './abattement.model';

@Injectable({
  providedIn: 'root'
})
export class AbattementService {
  url = PagesComponent.urlConfigPaie + '/abattements';
  constructor(protected httpClient: HttpClient) { }
  getAllAbattement() {
    return this.httpClient.get<AbattementModel[]>(this.url);
  }
  getAbattementById(id: number) {
    return this.httpClient.get<AbattementModel>(this.url + '/' + id);
  }
  addAbattement(abattement: AbattementModel) {
    return this.httpClient.post(this.url, abattement);
  }
  updateAbattement(abattement: AbattementModel) {
    return this.httpClient.put(this.url + '/' + abattement.idAbat, abattement);
  }
  deleteAbattement(id: Number) {
    return this.httpClient.delete(this.url +'/' + id);
  }
}
