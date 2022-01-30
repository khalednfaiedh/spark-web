import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientModel } from './client.model';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  url = PagesComponent.urlConfigAdmin + '/clients';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(protected httpClient: HttpClient) {
  }
  getAllClient(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url2 + id + '/clients');
  }
  getClientById(code_clt: number) {
    return this.httpClient.get<any>(this.url + '/' + code_clt);
  }

  addClient(client: ClientModel, id: number) {
    return this.httpClient.post<ClientModel>(this.url2 + id + '/clients', client);
  }
  addClientFile(formdata: FormData) {
    return this.httpClient.post<any>(this.url + '/file', formdata);
  }
  updateClient(client: ClientModel): Observable<any> {
    return this.httpClient.put(this.url + '/' + client.code_clt, client);
  }

  deleteClient(code_clt) {
    console.log("her")
    return this.httpClient.delete(this.url + '/' + code_clt);
  }
}
