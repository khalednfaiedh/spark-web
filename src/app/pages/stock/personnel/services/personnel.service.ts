import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonnelModel } from '../personnel.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  url = PagesComponent.urlConfigStock + '/personnel';
  url1 = PagesComponent.urlConfigStock + '/entreprise';

  constructor(protected httpClient: HttpClient) {
  }

  getPersonnelsByEntreprise(idEntreprise):Observable<any> {
    return this.httpClient.get(this.url1 + "/" + idEntreprise + "/personnel");
  }

  getAllPersonnels():Observable<any> {
    return this.httpClient.get(this.url);
  }

  getPersonnelById(id: number) {
    return this.httpClient.get<any>(this.url + '/' + id);
  }

  addPersonnel(personnel:PersonnelModel){
    return this.httpClient.post(this.url, personnel);
  }

  updatePersonnel(personnel:PersonnelModel) {
    return this.httpClient.put(this.url + '/' + personnel.idPersonnel,personnel);
  }

  deletePersonnel(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}