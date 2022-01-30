import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FichePaieModel } from './fichePaie.model';
import { Cloture} from './fichePaie.model';
import { PagesComponent } from '../../pages.component';
import { Observable } from 'rxjs';
import { ResponseType, ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FichePaieService {


  url1 = PagesComponent.urlConfigPaie + '/emloyee';
  url2 = PagesComponent.urlConfigPaie + '/fiche';
  url3 = PagesComponent.urlConfigPaie + '/soldeToutCompte'
  url4 = PagesComponent.urlConfigPaie + '/entreprise/'
  constructor(protected httpClient: HttpClient) { }

  ficheToExcel(idF : number):Observable<Blob> {
    return this.httpClient.get(this.url2 + 'xls/' + idF,{responseType:'blob'});
  }
  SoldeToExcel(idF : number):Observable<Blob> {
    return this.httpClient.get(this.url3 + 'xls/' + idF,{responseType:'blob'});
  }
  generateOne(idEmploye : number, mois : number,annee: number) {
    return this.httpClient.get(this.url1 +'/'+ idEmploye + '/fiches/'+mois+'/'+annee );
  }
  generateOne12(idEmploye : number, mois : number,annee: number, nbrjour : number) {
    return this.httpClient.get(this.url1 +'/'+ idEmploye + '/fichesFinAnnee/'+mois+'/'+annee+'/'+nbrjour );
  }
 
  generateLot(idEntreprise : number , mois : number,annee: number) {
    return this.httpClient.get(this.url4+ idEntreprise +'/fiche/'+mois+'/'+annee );
  }
  getFichePaieById(id: number) {
    return this.httpClient.get<FichePaieModel>(this.url2 + '/' + id);
  }
  // getFichePaieByMonth(mois: number,annee : number) {
  //   return this.httpClient.get<FichePaieModel[]>(PagesComponent.urlConfigPaie + '/getfiche' + '/' + mois + '/' + annee);
  // }
  getFichesByEntrepriseAndMonth(idEntreprise:number, mois: number,annee : number) {
    return this.httpClient.get<FichePaieModel[]>(this.url4 + idEntreprise + '/fiches/' +  mois + '/' + annee);
  }
  getAllFichePaie() {
    return this.httpClient.get<FichePaieModel>(this.url2 );
  }
  deleteFichePaie(id: Number) {
    return this.httpClient.delete(this.url2 + '/' + id);
  }
  cloturerPaie(idEntreprise: number, mois : number,annee: number){
    return this.httpClient.get(this.url4 + idEntreprise + '/cloturer' +'/'+mois+'/'+annee );
  }
  decloturerPaie(idEntreprise: number, mois : number,annee: number){
    return this.httpClient.get(this.url4 + idEntreprise +  '/decloturer' +'/'+mois+'/'+annee );
  }
  checkCloture(idEntreprise: number, mois : number,annee: number){
    return this.httpClient.get<Cloture>(this.url4 + idEntreprise + '/checkCloture'+'/'+mois+'/'+annee)
  }
  soldeToutCompte(idEmploye : number, mois : number,annee: number) {
    return this.httpClient.get(this.url1 +'/'+ idEmploye + '/solde/'+mois+'/'+annee );
  }
  getAllSoldeToutCompte(annee : number) {
    return this.httpClient.get<FichePaieModel[]>(this.url3 + '/' +annee );
  }
  deleteSoldeToutCompte(id: Number) {
    return this.httpClient.delete(this.url3 + '/' + id);
  }

}