import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdresseLivraison } from '../AdresseLivraison.model';
import { PagesComponent } from '../../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class AdresseLivraisonClientService {
  Url = PagesComponent.urlConfigAdmin + '/adresseDeLivraisons';
  Url2 = PagesComponent.urlConfigAdmin + '/client';

  constructor(private http: HttpClient) {

  }
  /*public addContactClient(contact:Contact){
    return this.http.post<Contact>(this.Url, contact);
  }*/
  public findAll() {
    return this.http.get<AdresseLivraison[]>(this.Url);
  }
  deleteadresseDeLivraisonsClient(id: number) {
    return this.http.delete<AdresseLivraison>(this.Url + '/' + id);
  }
  updateadresseDeLivraisonsClient(adresse: AdresseLivraison, id: number) {
    return this.http.put<AdresseLivraison>(this.Url2 + '/' + id + '/adresseDeLivraisons/' + adresse.id, adresse);
  }
  getadresseDeLivraisonsClient(id: number): Observable<any> {
    return this.http.get(this.Url2 + '/' + id + '/adresseDeLivraisons');
  }

  addadresseDeLivraisonsClient(adresse: AdresseLivraison, codeCLT: number) {

    return this.http.post<AdresseLivraison>(this.Url2 + '/' + codeCLT + '/adresseDeLivraisons', adresse);
  }
  getAdressebyid(id: number):Observable<any> {
    return this.http.get(this.Url + '/' + id)
  }
}
