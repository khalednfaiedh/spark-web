import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { ProduitParam } from './produitParamModel';

@Injectable({
  providedIn: 'root'
})
export class ProduitParamService {

  url1 = PagesComponent.urlConfigStock + '/entreprise/';
  url2 = PagesComponent.urlConfigStock + '/produitInit';

  constructor(protected httpClient: HttpClient) {
  }

  getAll():Observable<any> {
    let idE = +localStorage.getItem("current_entreprise")
    return this.httpClient.get(this.url1 + idE + '/produitInit');
  }
  getOne(id) {
    return this.httpClient.get<ProduitParam>(this.url2 + '/' + id)
  }
  save(p: ProduitParam) {
    return this.httpClient.post<ProduitParam>(this.url2 ,p)
  }
  update(p: ProduitParam) {
      return this.httpClient.put<ProduitParam>(this.url2 + '/' + p.id, p)
  }
  delete(id: Number) {
    return this.httpClient.delete(this.url2 + '/' + id);
  }
}
