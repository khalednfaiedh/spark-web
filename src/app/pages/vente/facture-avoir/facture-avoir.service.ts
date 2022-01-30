import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { FactureAvoirModel } from './FactureAvoir-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureAvoirService {
  url = PagesComponent.urlConfigVente + '/factureAvoirs';
  url2 = PagesComponent.urlConfigVente + '/facture/';
  url3=PagesComponent.urlConfigVente + '/reclamation/';
  constructor(private httpclient: HttpClient) { }
  public addFactureAvoir(id, factureAvoir: FactureAvoirModel): Observable<any> {
    return this.httpclient.post(this.url3+id+'/factureAvoirs', factureAvoir);
  }
  public getFactureAvoirById(id: number): Observable<any> {
    return this.httpclient.get(this.url + '/' + id)
  }
  public findAllFA(): Observable<any> {
    return this.httpclient.get(this.url)
  }
  public findByFacture(id: number): Observable<any> {
    return this.httpclient.get(this.url2 + id + '/factureAvoirs')
  }
}