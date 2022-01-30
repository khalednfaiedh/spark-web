import { PagesComponent } from "../pages.component";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UtilisateurMinModel, UtilisateurModel } from "./utilisateur.model";
import { Authorities } from "../../authorisation/authorities";

@Injectable({
    providedIn: 'root'
  })
  export class UtilisateurService {

    url= PagesComponent.urlConfigUser +'/users';
    url2= PagesComponent.urlConfigUser +'/roles';
    constructor(protected httpClient: HttpClient) { }
    getAllUtilisateur() {
      return this.httpClient.get<UtilisateurModel[]>(this.url+ "/all");
    }
    getAllUtilisateurPublique() {
      return this.httpClient.get<UtilisateurModel[]>(this.url+ "/public");
    }
    getUtilisateurById(id: number){
      return this.httpClient.get<UtilisateurModel>(this.url + '/' + id);
    }
    getUserNameByid(id: number){
      let result : string
       this.getUtilisateurById(id).subscribe(
         data => {result = data.username},
         error =>{result = '-'}
       )
       return result ;
    }
    addUtilisateur(utilisateur: UtilisateurModel) {
      return this.httpClient.post<UtilisateurModel>(this.url+ '/add', utilisateur);
    }
    updateUtilisateur(utilisateur: UtilisateurModel) {
      return this.httpClient.put(this.url + '/' + utilisateur.id, utilisateur);
    }
    deleteUtilisateur(id: Number) {
      return this.httpClient.delete(this.url + '/' + id);
    }
    desactivateUtilisateur(id: number){
      return this.httpClient.patch(this.url + '/' + id  + '/desactivate', null);
    }
    activateUtilisateur(id: number){
      return this.httpClient.patch(this.url + '/' + id  + '/activate',null);
    }
    getAllPublicRoles(){
      return this.httpClient.get(this.url2+ "/public");
    }
    getAllRoles(){
      return this.httpClient.get(this.url2);
    }

    getCurrentUserCell():UtilisateurMinModel{
      let user:UtilisateurMinModel=new UtilisateurMinModel();
      user.userName =  Authorities.getUserInfo().user_name
      user.userID = Authorities.getUserInfo().user.id
      return user
     }
}