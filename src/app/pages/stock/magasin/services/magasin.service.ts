import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  url = PagesComponent.urlConfigStock+'/magasin';
  url1 = PagesComponent.urlConfigStock+'/entreprise';

  constructor(protected httpClient: HttpClient) {
  }

  getMagasinByEntreprise(idEntreprise: number):Observable<any> {
    return this.httpClient.get(this.url1 + "/" + idEntreprise + "/magasin");
  }

  getAllMagasin():Observable<any> {
    let idEntreprise = localStorage.getItem("current_entreprise")
    return this.httpClient.get(this.url1 + "/" + idEntreprise + "/magasin");
  }

  getMagasinByID(code_mag: number) {
    return this.httpClient.get<any>(this.url + '/' + code_mag);
  }

  addMagasin(magasin):Observable<any> {
    return this.httpClient.post(this.url, magasin);
  }

  deleteMagasin(code_mag){
    return this.httpClient.delete(this.url + '/' + code_mag);
  }

  updateMagasin(magasin):Observable<any>{
    return this.httpClient.put<any>(this.url ,magasin);
  }
}