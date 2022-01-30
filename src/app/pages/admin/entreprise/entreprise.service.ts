import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { Entreprise } from './entreprise';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  url = PagesComponent.urlConfigAdmin + '/entreprises';
  url2 = PagesComponent.urlConfigAdmin + '/utilisateur';

  constructor(private httpClient: HttpClient,
    private utilisateurService: UtilisateurService) { }

  addEnterprise(entreprise: Entreprise) {
    let idUser = this.utilisateurService.getCurrentUserCell().userID
    return this.httpClient.post<Entreprise>(this.url2 + '/' + idUser + '/entreprises', entreprise);
    // return this.httpClient.post<Entreprise>(this.url, entreprise);
  }
  getAllEnterprise(): Observable<any> {
    let idUser = this.utilisateurService.getCurrentUserCell().userID
    return this.httpClient.get<Entreprise[]>(this.url2 + '/' + idUser + '/entreprises');
  }
  getEnterpriseById(id: number) {
    return this.httpClient.get<Entreprise>(this.url + '/' + id);
  }
  deleteEnterprise(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  updateEnterprise(entreprise: Entreprise) {
    return this.httpClient.put<Entreprise>(this.url + '/' + entreprise.enterpriseId, entreprise);
  }

  addUserEnterprise(idU: number, entreprise: Entreprise) {
    return this.httpClient.post<Entreprise>(this.url2 + '/' + idU + '/entreprises', entreprise);
  }

  addUserToEnterprise(idE: number, idU: number) {
    return this.httpClient.get(this.url + '/' + idE + '/users/' + idU);
  }
  // getAllEnterpriseByUser(idU:number){
  //   return this.httpClient.get<Entreprise[]>(this.url2+ '/' + idU + '/entreprises');
  // }
}

