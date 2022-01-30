import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  url = PagesComponent.urlComptabliteConfig + '/repports/manuelle'
  
  ////plansGeneral/{id}/planTiers
  constructor(private httpClient: HttpClient) { }

   reportManuelle(annee,cod) {
    return this.httpClient.get<any>(this.url+'/'+annee+'/'+cod);
  }
}
