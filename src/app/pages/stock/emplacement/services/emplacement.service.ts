import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class EmplacementService {

  url =PagesComponent.urlConfigStock+'/emplacement';
  url1 =PagesComponent.urlConfigStock+'/magasin';
  url2 =PagesComponent.urlConfigStock+'/entreprise';

  constructor(protected httpClient: HttpClient) {
  }
  getEmplacementByIdMagasin(idMagasin):Observable<any>{
    return this.httpClient.get(this.url1+ "/" +idMagasin+ "/emplacement")
  }
  getEmplacementByEntreprise(idE):Observable<any>{
    return this.httpClient.get(this.url2+ "/" +idE+ "/emplacement")
  }
  getAllEmplacements():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getEmplacementByID(id: number) {
    return this.httpClient.get<any>(this.url + '/' + id);
  }
  addEmplacement(emplacement):Observable<any> {
    return this.httpClient.post(this.url,emplacement);
  }

  deleteEmplacement(id){
    return this.httpClient.delete(this.url + '/' + id);
  }
  updateEmplacement(id,emplacement):Observable<any>{
    return this.httpClient.put(this.url + '/' + id,emplacement);
  }
  updateFinal(id,emplacement):Observable<any>{
    return this.httpClient.put(this.url + '/' + id,emplacement+'/final');
  }
}
