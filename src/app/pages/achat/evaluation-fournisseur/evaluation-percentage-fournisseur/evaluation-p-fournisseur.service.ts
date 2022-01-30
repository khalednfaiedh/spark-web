import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class EvaluationPFournisseurService {

  url= PagesComponent.urlConfigAchat + '/evaluationP';
  constructor(protected httpClient: HttpClient) { }

  getEvalutionPs():Observable<any> {
    return this.httpClient.get(this.url);
  }
  getEvaluaionPById(id: number):Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  addEvalutionP(evalutionP){
    return this.httpClient.post(this.url,evalutionP);
  }
  deleteEvalutionP(idEvalutionP){
    return this.httpClient.delete(this.url + '/' + idEvalutionP);
  }
  updateEvalutionP(EvaluationP: any) {
    return this.httpClient.put(this.url + '/' + EvaluationP.idEP, EvaluationP);
  }
}
