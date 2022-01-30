import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { ConditionnementEmballageModel } from './ConditionnementEmballage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionnementEmballageService {
  url = PagesComponent.urlConfigAdmin + '/conditionnementEmballages';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(private http: HttpClient) { }



  getAllCondtionnement(id: number): Observable<ConditionnementEmballageModel[]> {
    return this.http.get<ConditionnementEmballageModel[]>(this.url2 + id + '/conditionnementEmballages');
  }
  addCondtionnement(conditionnement: ConditionnementEmballageModel,id:number) {
    return this.http.post(this.url2 + id + '/conditionnementEmballages', conditionnement);
  }
  deleteCondtionnement(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
  updateCondtionnement(conditionnement: ConditionnementEmballageModel) {
    return this.http.put(this.url + '/' + conditionnement.idC, conditionnement);
  }
  getCondtionnementByid(id: number) {
    return this.http.get<ConditionnementEmballageModel>(this.url + '/' + id);
  }
}
