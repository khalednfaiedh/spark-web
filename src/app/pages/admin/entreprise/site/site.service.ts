import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Site } from './site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  url = PagesComponent.urlConfigAdmin + '/entreprise';
  url2 = PagesComponent.urlConfigAdmin + '/sites';

  constructor(private httpClient: HttpClient) { }

  addSite(idEntreprise,site)
  {
    console.log("ok")
    return this.httpClient.post<Site>(this.url+'/'+idEntreprise+'/sites',site)
  }


  getAllSiteByEntreprise(  id)
  {
return  this.httpClient.get<Site[]>(this.url+'/'+id+'/sites');
  }

  deleteSiteById(id)
  {
    return this.httpClient.delete(this.url2+'/'+id)
  }

  updateSite(site)
  {
    return this.httpClient.put<Site>(this.url2+'/'+site.id,site)
  }
}
