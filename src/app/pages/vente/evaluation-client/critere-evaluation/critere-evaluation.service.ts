import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';
import { CritereEvaluationModel } from './critere-evaluation-model';

@Injectable({
  providedIn: 'root'
})
export class CritereEvaluationService {
  url = PagesComponent.urlConfigVente + '/criteres'
  constructor(private httpclient: HttpClient) { }
  addCritere(critere: CritereEvaluationModel): Observable<any> {
    return this.httpclient.post(this.url, critere)
  }
  getAllCritere(): Observable<any> {
    return this.httpclient.get(this.url)
  }
  getByid(id: number): Observable<any> {
    return this.httpclient.get(this.url + '/' + id)
  }
  delete(id: number): Observable<any> {
    return this.httpclient.delete(this.url + '/' + id)
  }
  update(critere: CritereEvaluationModel, id: number): Observable<any> {
    return this.httpclient.put(this.url + '/' + id, critere)
  }
}
