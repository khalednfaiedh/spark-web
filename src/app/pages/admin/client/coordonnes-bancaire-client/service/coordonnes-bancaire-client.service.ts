import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoordonneesBancaireModel } from '../CoordonneBancaire.Model';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../../pages.component';


@Injectable({
  providedIn: 'root'
})
export class CoordonnesBancaireClientService {
  Url = PagesComponent.urlConfigAdmin + '/coordonneesBancaires';
  Url2 = PagesComponent.urlConfigAdmin + '/client';

  constructor(private http: HttpClient) {

  }

  public findAll() {
    return this.http.get<CoordonneesBancaireModel[]>(this.Url);
  }
  deleteCoordonneesBancairesClient(id: number) {
    return this.http.delete<CoordonneesBancaireModel>(this.Url + '/' + id);
  }
  updateCoordonneesBancairesClient(compteB: CoordonneesBancaireModel, idC: number, id: number) {
    return this.http.put<CoordonneesBancaireModel>(this.Url2 + '/' + id + '/coordonneesBancaires/' + idC, compteB);
  }
  getCoordonneesBancairesClient(id: number): Observable<any> {
    return this.http.get(this.Url2 + '/' + id + '/coordonneesBancaires');
  }

  addCoordonneesBancairesClient(compteB: CoordonneesBancaireModel, id: number) {

    return this.http.post<CoordonneesBancaireModel>(this.Url2 + '/' + id + '/coordonneesBancaires', compteB);
  }
}
