import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoordonneesBancaireModel } from './CordonneeBancaire.model';
import { FournisseurModel } from '../fournisseur.model';
import { PagesComponent } from '../../../pages.component';


@Injectable({
  providedIn: 'root'
})
export class CordonneeBancaireService {
  url = PagesComponent.urlConfigAdmin + '/coordonneesBancaire'
  url1 = PagesComponent.urlConfigAdmin + '/fournisseur';
  constructor(private httpClient: HttpClient) { }
  getAllCoordonneesBancaire() {
    return this.httpClient.get<CoordonneesBancaireModel>(this.url);
  }
  addCoordonneesBancaire<CoordonneesBancaireModel>(coordonneesBancaire: any) {
    return this.httpClient.post(this.url, coordonneesBancaire);
  }
  deleteCoordonneesBancaire(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  updateCoordonneesBancairet(coordonneesBancaire: any, id: Number) {
    return this.httpClient.put(this.url + '/' + id, coordonneesBancaire);
  }
  getCoordonneesBancaireFournisseur(id: number) {
    return this.httpClient.get<FournisseurModel>(this.url1 + '/' + id + '/coordonneesBancaires');
  }
  getCoordonneesBancaireByid(id: number) {
    return this.httpClient.get<CoordonneesBancaireModel>(this.url + '/' + id);
  }
  updateCoordonneesBancaireFournisseur(coordonneesBancaire: CoordonneesBancaireModel, idF: number) {
    return this.httpClient.put(this.url1 + '/' + idF + '/coordonneesBancaires/' + coordonneesBancaire.idC, coordonneesBancaire);
  }
  AddCoordonneesBancaireFournisseur(coordonneesBancaire: CoordonneesBancaireModel, idF: number) {
    return this.httpClient.post(this.url1 + '/' + idF + '/coordonneesBancaires', coordonneesBancaire)
  }

}
