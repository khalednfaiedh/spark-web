import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { PdpSortie } from './pdp';

@Injectable({
  providedIn: 'root'
})
export class PdpService {

  url = PagesComponent.urlGPAOConfig+ '/pdp';
   
  constructor(private httpClient: HttpClient) { }
   pdp(pdp)
   {
     return this.httpClient.post<PdpSortie[]>(this.url,pdp);
   }

    getIfoClientByPrevision(pdp)
   {
     return this.httpClient.post< any[]>(this.url+'/infoClient',pdp);
   }

}
