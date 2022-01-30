import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrilleTarifsModel } from './grille-tarifs-model';
import { PagesComponent } from '../../pages.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrilleTarifsService {
  url = PagesComponent.urlConfigAdmin + '/grilleTarifs';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(private httpclient: HttpClient) { }
  addGrilleTarifs(grilletarifs: GrilleTarifsModel, id: number): Observable<any> {
    return this.httpclient.post(this.url2 + id + '/grilleTarifs', grilletarifs)
  }
  getAllGrilleTarifs(id: number): Observable<any> {
    return this.httpclient.get(this.url2 + id + '/grilleTarifs')
  }
  updategrilleTarif(id: number, grilletarifs: GrilleTarifsModel): Observable<any> {
    return this.httpclient.put(this.url + '/' + id, grilletarifs)
  }
  getGrilleTarifs(id: number): Observable<any> {
    return this.httpclient.get(this.url + '/' + id)
  }
  delete(id: number): Observable<any> {
    return this.httpclient.delete(this.url + '/' + id)
  }
}
