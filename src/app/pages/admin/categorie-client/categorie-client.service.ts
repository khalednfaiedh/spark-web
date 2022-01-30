import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieClient } from './categorieClient';

@Injectable({
  providedIn: 'root'
})
export class CategorieClientService {
  url = PagesComponent.urlConfigAdmin + '/categorieClients';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(protected httpClient: HttpClient) {
  }

  getAllCategorieClient(id: number): Observable<CategorieClient[]> {
    return this.httpClient.get<CategorieClient[]>(this.url2 + id + '/categorieClients');
  }
  getCategorieClientById(id: number) {
    return this.httpClient.get<CategorieClient>(this.url + '/' + id);
  }

  addCategorieClient(CategorieClient: CategorieClient, id: number) {
    return this.httpClient.post<CategorieClient>(this.url2 + id + '/categorieClients', CategorieClient);
  }

  updateCategorieClient(CategorieClient: CategorieClient): Observable<CategorieClient> {
    return this.httpClient.put<CategorieClient>(this.url + '/' + CategorieClient.id, CategorieClient);
  }

  deleteCategorieClient(id) {

    return this.httpClient.delete(this.url + '/' + id);
  }
}
