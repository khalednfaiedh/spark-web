import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Enterprise } from '../entreprise/entreprise';
import { Report } from './choisir-classe/choisir-classe.component';
 

@Injectable({
  providedIn: 'root'
})
export class ExcerciceService {

  url = PagesComponent.urlComptabliteConfig + '/excercices';
  url2 = PagesComponent.urlComptabliteConfig + '/plans/report2';
  url3 = PagesComponent.urlComptabliteConfig + '/plans/report1';

  constructor(private httpClient: HttpClient) { }

  addExcercice(excercice: Excercice) {
    return this.httpClient.post<Excercice>(this.url, excercice);
  }

   calculMontantEquilibreEcriture(report: Report) {
    return this.httpClient.post<Report>(this.url3,report);
  }

  saveReportAnouveau(report: Report) {
    return this.httpClient.post(this.url2,report);
  }
  
  getAllExcercice(id:number){
    return this.httpClient.get<Excercice[]>(this.url+'/entreprise/'+id);
  }
  getAllExercice()
  {
    return this.httpClient.get<Excercice[]>(this.url);
  }
  getExcerciceById(id:number){
    return  this.httpClient.get<Excercice>(this.url+'/'+id);
  }
  deleteExcerciceById(id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updateExcercice ( excercice: Excercice){
     return this.httpClient.put<Excercice>(this.url+'/'+excercice.id, excercice);
   }
}

export class Excercice {
  id: number;
  dateDebut: Date;
  dateFin: Date;
  excerciceState: any;
  idEntreprise: number;
  designation:string;
  annee:string;
  editeur:string;
    
}
