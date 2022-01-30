import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../../pages.component';
import { EvaluationModel } from '../evaluation-model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationClientService {
  url = PagesComponent.urlConfigVente + '/evaluations';
  url2 = PagesComponent.urlConfigVente + '/commande';
  constructor(protected httpClient: HttpClient) { }
  addEvalution(evalution: EvaluationModel): Observable<any> {
    return this.httpClient.post(this.url, evalution);
  }
  findAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getEvaluationbyId(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  getEvaluationbyIdBC(idBC: number): Observable<any> {
    return this.httpClient.get(this.url2 + "/" + idBC + "/evaluations");
  }
  updateEvalution(id: number, evaluation: EvaluationModel): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, evaluation);
  }
}
