import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaiementModel } from './paiement.model';
import { PagesComponent } from '../../../pages.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  url =  PagesComponent.urlConfigPaie + '/fiche';
  url1 =  PagesComponent.urlConfigPaie + '/entreprise/';
  url2 = PagesComponent.urlConfigPaie + '/paiement';
  url3 = PagesComponent.urlConfigPaie + '/payer';

  constructor(protected httpClient: HttpClient) { }

  getAll(idEntreprise : number ,mois : number, annee :number) {
    return this.httpClient.get<PaiementModel[]>(this.url1+ idEntreprise + '/paiement/' + mois + '/' + annee);
  } 
  getOne(idPaiement : number) {
    return this.httpClient.get<PaiementModel>(this.url2+ '/' + idPaiement);
  } 
  save(listP : PaiementModel[]) {
    return this.httpClient.post<PaiementModel[]>(this.url2, listP);
  }
  getVirement(idEntreprise : number ,code : number){
    return this.httpClient.get<PaiementModel[]>(this.url1 + idEntreprise +  '/virement/' + code );
  } 
  payement(idPaiement : number){
    return this.httpClient.get<PaiementModel>(this.url3 + '/' + idPaiement);
  }
  getOneByFiche(idFiche : number) {
    return this.httpClient.get<PaiementModel>(this.url2+ '/fiche/' + idFiche);
  } 
  deletePayement(idPaiement : number){
    return this.httpClient.delete<PaiementModel>(this.url2 + '/' + idPaiement);
  }
   //    this.url = PagesComponent.urlConfigPaie + '/entreprise/'+ +idE +'/virementxls/' + this.code

  virementToExcel(idEntreprise : number ,code : number):Observable<Blob>{
    return this.httpClient.get(this.url1 + idEntreprise +  '/virementxls/' + code ,{responseType:'blob'});
  }
}