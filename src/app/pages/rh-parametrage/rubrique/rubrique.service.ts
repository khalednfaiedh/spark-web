import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Rubrique } from './rubrique';

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {

  url = PagesComponent.urlConfigPaie + '/impots';

  constructor(protected httpClient: HttpClient) { }
  getAllRubrique() {
    return this.httpClient.get<Rubrique[]>(this.url);
  }
  getRubriqueById(id: number) {
    return this.httpClient.get<Rubrique>(this.url + '/' + id);
  }
  addRubrique(rubrique: Rubrique) {
    return this.httpClient.post(this.url, rubrique);
  }
  updateRubrique(rubrique: Rubrique) {
    return this.httpClient.put(this.url + '/' + rubrique.idImpotRev, rubrique);
  }
  deleteRubrique(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
