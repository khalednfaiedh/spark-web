import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { UniteMesureModel } from './Unite-mesure.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniteMesureService {

  url = PagesComponent.urlConfigAdmin + '/uniteMesures';

  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(private http: HttpClient) { }

  getAllUniteMesure(id: number): Observable<UniteMesureModel[]> {
    return this.http.get<UniteMesureModel[]>(this.url2 + id + '/uniteMesures');
  }
  addUniteMesure(uniteMesure: UniteMesureModel, id: number) {
    return this.http.post(this.url2 + id + '/uniteMesures', uniteMesure);
  }
  deleteUniteMesure(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
  updateUniteMesure(uniteMesure: UniteMesureModel) {
    return this.http.put(this.url + '/' + uniteMesure.idUnite, uniteMesure);
  }
  getUniteByid(id: number): Observable<any> {
    return this.http.get<UniteMesureModel>(this.url + '/' + id);
  }
}
