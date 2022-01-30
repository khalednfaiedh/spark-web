import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { Mouvement } from '../mouvement/mouvement';


@Injectable({
  providedIn: 'root'
})
export class MvtService {

  url = PagesComponent.urlConfigStock + '/mvt';
  url1 = PagesComponent.urlConfigStock + '/entreprise/';

  constructor(protected httpClient: HttpClient) {
  }

  getAllMouvementsByentreprise(entree: String):Observable<any> {
    let idE = +localStorage.getItem("current_entreprise")
    return this.httpClient.get(this.url1 + idE + '/mvt/'+ entree);
  }
  getAll():Observable<any> {
    let idE = +localStorage.getItem("current_entreprise")
    return this.httpClient.get(this.url1 + idE + '/mvt');
  }

  // getAllMouvements():Observable<any> {
  //   return this.httpClient.get(this.url);
  // }
  getMouvementById(id: number) {
    return this.httpClient.get<any>(this.url + '/' + id);
  }

  addMouvement(mouvement: Mouvement){
    mouvement.idE = +localStorage.getItem("current_entreprise")
    return this.httpClient.post(this.url, mouvement);
  }

  updateMouvement(mouvement:Mouvement) {
    return this.httpClient.put(this.url + '/' + mouvement.id,mouvement);
  }

  deleteMouvement(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}

