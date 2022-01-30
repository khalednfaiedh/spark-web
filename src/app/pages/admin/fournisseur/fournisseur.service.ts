import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FournisseurModel } from './fournisseur.model';
import { PagesComponent } from '../../pages.component';
import { FournisseurCategorie } from '../fournisseur-categorie/fournisseur-categorie.model';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  url1 = PagesComponent.urlConfigAdmin + '/entreprise';
 
  url = PagesComponent.urlConfigAdmin + '/fournisseurs';
  constructor(protected httpClient: HttpClient) { }
  getAllfournisseur(id:number): Observable<any> {
    return this.httpClient.get(this.url1+'/'+id+'/fournisseurs');
  }
  getFournisseurById(idF: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + idF);
  }
  addFournisseurs(id:number,fournisseur: FournisseurModel): Observable<any> {
    return this.httpClient.post(this.url1+'/'+id+'/fournisseurs', fournisseur);
  }
  updateFournisseurs(id:number,fournisseur: FournisseurModel): Observable<any> {
    return this.httpClient.put(this.url1+'/'+id+'/fournisseurs/' + fournisseur.idF, fournisseur);
  }
  deleteFournisseurs(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  getCategorieByFournisseur(idF: Number) {
    return this.httpClient.get<FournisseurCategorie[]>(this.url + '/' + idF + '/categorie');
  }
}