import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { EtatFinancier } from './etat-financier';
import { EtatfinancierDates } from './etat-financier.component';
import { RatioDto } from '../ratio/ratio.component';

@Injectable({
  providedIn: 'root'
})
export class EtatFinancierService {
  url = PagesComponent.urlComptabliteConfig +'/etatfinanciers';
  constructor(private httpClient: HttpClient) { }

  addEtatFinancier(etatFinancier: EtatFinancier) {
    return this.httpClient.post<EtatFinancier>(this.url, etatFinancier);
  }
  getAllEtatFinancier(){
    return this.httpClient.get<EtatFinancier[]>(this.url);
  }
  getEtatFinancierById(idEtat:number){
    return  this.httpClient.get<EtatFinancier>(this.url+'/'+idEtat);
  }
  deleteEtatFinancier(idEtat: number) {
    return this.httpClient.delete(this.url+'/'+idEtat);
   }
  updateEtatFinancier( etatFinancier: EtatFinancier){
     return this.httpClient.put<EtatFinancier>(this.url+'/'+etatFinancier.idEtat, etatFinancier);
   }
  GenerationBilanCompteRlt(idEtat) {
     return this.httpClient.post<any>(this.url+'/generate/'+idEtat ,null);
    console.log();
   }
   ConsulterBilanCompteRltById(idEtat , typeBilanCompteRlt) {
    return  this.httpClient.get<any>(this.url+'/consulter/'+idEtat+'/'+typeBilanCompteRlt);
   }
   findEtatFinancierByStartDateAndEndDate (ratioDto: RatioDto) {
    return  this.httpClient.post<any>(this.url+'/findByDates',ratioDto);
   }
}