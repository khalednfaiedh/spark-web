import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { CategorieModel } from './categoeie.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  url = PagesComponent.urlConfigPaie + '/categorie';
  url1 = PagesComponent.urlConfigPaie + '/entreprise';
  
  constructor(protected httpClient: HttpClient) { }
  
  addCategorie(Categorie: CategorieModel) {
    Categorie.entreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.post(this.url, Categorie);
  }

  getAllCategorie() {
    let idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<CategorieModel[]>(this.url1 + '/'+ idEntreprise + '/categorie');
  }

  getCategorieById(id: number) {
    return this.httpClient.get<CategorieModel>(this.url + '/' + id);
  }

  getCategorieByCode(code: String) {
    let idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<CategorieModel>(this.url1 + '/'+ idEntreprise + '/categorieCode/' + code);
  }

  updateCategorie(Categorie: CategorieModel) {
    return this.httpClient.put(this.url + '/' + Categorie.idCategorie, Categorie);
  }
  
  deleteCategorie(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}