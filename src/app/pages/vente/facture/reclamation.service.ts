import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  url = PagesComponent.urlConfigVente + '/facture';
  url2=PagesComponent.urlConfigVente + '/reclamations';
  constructor(protected httpClient: HttpClient) { }

  addReclamation(data,idfacture){
    return this.httpClient.post<any>(this.url+'/'+idfacture+'/reclamations', data );
  }

  getAllReclamation(){
    return this.httpClient.get<any>(this.url2);
  }
  getReclamationAvecRetour()
  {
    return this.httpClient.get<any>(this.url2+ '/stock');
  }

  getReclamationById(id: number){
    return this.httpClient.get<any>(this.url2+ '/' + id );
  }
  updateStatut(id: number){
    return this.httpClient.get<any>(this.url2+ '/' + id + '/statut' );
  }
  updateReclamation(data,idfacture){
    return this.httpClient.put<any>(this.url+'/'+idfacture+'/reclamations/'+data.id,data)
  }

  deleteReclamationById(id)  {
    return this.httpClient.delete(this.url2+'/'+id)
  }

}
