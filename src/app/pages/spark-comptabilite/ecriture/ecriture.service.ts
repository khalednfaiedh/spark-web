import { Injectable } from '@angular/core';
import { JournalService, Journal } from '../journal/journal.service';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../plan-general/plan-general.service';
import { ModelEcriture } from '../modele-ecriture/modele-ecriture.service';


@Injectable({
  providedIn: 'root'
})
export class EcritureService {
  
  
  url = PagesComponent.urlComptabliteConfig + '/ecritures';
  url2 = PagesComponent.urlComptabliteConfig + '/journals';
  url3 = PagesComponent.urlComptabliteConfig + '/operations';
  url4= PagesComponent.urlComptabliteConfig + '/ecriture';
                                                 
  url5= PagesComponent.urlComptabliteConfig + '/count';
  url6= PagesComponent.urlComptabliteConfig + '/planGeneral';
  url7= PagesComponent.urlComptabliteConfig + '/planTier';
  url8= PagesComponent.urlComptabliteConfig + '/modele';
 
  constructor(private httpClient: HttpClient) { }

  addEcriture(ecriture: Ecriture) {
    return this.httpClient.post<Ecriture>(this.url, ecriture);
  }
  getAllEcritureByJournal(idJournal: number) {
    return this.httpClient.get<Ecriture[]>(this.url2 + '/' + idJournal + '/ecritures/');
  }
  getEcritureById(id: number) {
    return this.httpClient.get<Ecriture>(this.url + '/' + id);
  }
  deleteEcriture(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  updateEcriture(ecriture: Ecriture) {
    return this.httpClient.put<Ecriture>(this.url + '/' + ecriture.idEcriture, ecriture);
  }

  saveAllecriture(formData) {
    return this.httpClient.post<Ecriture>(this.url3, formData);
  }

  saveOperationecritureByLot(formData) {
    return this.httpClient.post<Ecriture>(this.url3 + '/lot', formData);
  }

  getAlloperationEcritureByEciture(id) {
    return this.httpClient.get<OperationEcriture[]>(this.url4 + '/' + id + '/operations/');
  }

  updateOperationEcritureAndEcriture(formData) { return this.httpClient.put<any>(this.url4 + '/' + formData.idEcriture + '/operations', formData); }

  countEciture(journal) {

    return this.httpClient.get<any>(this.url5 + '/' + journal.designation + '/' + journal.mois);
  }

  getAllOperationEcritureByPlanGenerale(id) {
    return this.httpClient.get<any>(this.url6 + '/' + id + '/operations');
  }

  getAllOperationEcritureByPlanTier(id) {
    return this.httpClient.get<any>(this.url7 + '/' + id + '/operations');
  }

  saveOperationWithEciture(id, operations) {
    return this.httpClient.post<any>(this.url + '/' + id + '/operations', operations);
  }

  getEcritureByIdModel(id)
  {
    return this.httpClient.get<Ecriture>(this.url8+'/'+id+'/ecritures');
  }

  saveEcritureWithModele(ecriture) {
    return this.httpClient.post<any>(this.url+'/modele',ecriture);
  }

//ecriture/{id}/operations/2
  updateOperation(list:any,id)
  {
    return this.httpClient.put<any>(this.url4+'/'+id+'/operations/2',list)
  }


  getLastEcritureBy(idJOurnal , mois , annee)
  {
    return this.httpClient.get<Ecriture>(this.url+'/last/'+idJOurnal+'/'+mois+'/'+annee);
  }

}

export class Ecriture {

 
  mois:string;
  annee:string;
  idEcriture: number;

  numeroEcriture: number;

  numeroPiece: number;

  libelle: string;

  date: Date;

  jour: number;
  journal: Journal;

  modeleEcriture: ModelEcriture;

}

export class OperationEcriture {


  debit: number;

  credit: number;

  journal: Journal;

  compteTiers: Plan

  compteGeneral: Plan


}