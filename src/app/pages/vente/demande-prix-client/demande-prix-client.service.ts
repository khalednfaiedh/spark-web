import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DemandePrixClientModel } from './demande-prix-client.model';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class DemandePrixClientService {
  url = PagesComponent.urlConfigVente + '/demandeprix';
  url2 = PagesComponent.urlConfigVente + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }

  getAllDemandePrix(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + id + '/demandeprix');
  }
  getDemandePrixById(code_list: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + code_list);
  }

  addDemandePrix(demandeprix: DemandePrixClientModel, id: number) {
    return this.httpClient.post<DemandePrixClientModel>(this.url2 + id + '/demandeprix', demandeprix);
  }
  updateDemandePrix(demandeprix: DemandePrixClientModel) {
    return this.httpClient.put<DemandePrixClientModel>(this.url + '/' + demandeprix.iddp, demandeprix);
  }
  deleteDemandePrix(code_list) {
    return this.httpClient.delete(this.url + '/' + code_list);
  }

}
