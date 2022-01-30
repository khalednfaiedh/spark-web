import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class EvaluationFournisseurService {

  url= PagesComponent.urlConfigAchat + '/evaluations';
  constructor(protected httpClient: HttpClient) { }

  
  addEvalution(evalution){
    return this.httpClient.post(this.url,evalution);
  }
  getEvaluationbyIdBC(idBC):Observable<any>{
    return this.httpClient.get(this.url+"/idBC/"+idBC)
  }
}
