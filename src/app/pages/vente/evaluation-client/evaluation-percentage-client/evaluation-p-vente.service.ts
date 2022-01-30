import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';
import { EvaluationPercentageClientModel } from '../evaluationPercentage-model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationPVenteService {

  url = PagesComponent.urlConfigVente + '/evaluationP';
  url2 = PagesComponent.urlConfigVente + '/evaluation';
  constructor(protected httpClient: HttpClient) { }

  getEvalutionPs(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  getEvaluaionPById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addEvalutionP(evalutionP: EvaluationPercentageClientModel): Observable<any> {
    return this.httpClient.post(this.url, evalutionP);
  }
  deleteEvalutionP(idEvalutionP) {
    return this.httpClient.delete(this.url + '/' + idEvalutionP);
  }
  updateEvalutionP(EvaluationP: EvaluationPercentageClientModel, id: number): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, EvaluationP);
  }
  getEvaluaionPByIdEvaluation(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + '/' + id + '/evaluationP');
  }
}
