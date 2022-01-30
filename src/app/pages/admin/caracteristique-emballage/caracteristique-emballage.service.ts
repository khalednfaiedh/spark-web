import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { CaracteristiqueEmballaheModel } from './caracteristique-emballage-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueEmballageService {
  url = PagesComponent.urlConfigAdmin + '/caracteristiqueEmballages';
  url2 = PagesComponent.urlConfigAdmin + '/conditionEmballage/';
  url3 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(private httpclient: HttpClient) { }
  addCaracteristiqueEmballege(caracteristique: CaracteristiqueEmballaheModel, id: number): Observable<any> {
    return this.httpclient.post(this.url2 + id + '/caracteristiqueEmballages', caracteristique)
  }
  getAllCaracteristique(id: number): Observable<any> {
    return this.httpclient.get(this.url2 + id + '/caracteristiqueEmballages')
  }
  update(caracteristique: CaracteristiqueEmballaheModel, id: number, idC: number): Observable<any> {
    return this.httpclient.put(this.url2 + idC + '/caracteristiqueEmballages/' + id, caracteristique)
  }
  delete(id: number): Observable<any> {
    return this.httpclient.delete(this.url + '/' + id)
  }
}
