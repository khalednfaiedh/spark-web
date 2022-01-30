import { Injectable } from '@angular/core';
import { Plan } from '../plan-general/plan-general.service';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Excercice } from '../excercice/excercice.service';
import { LivreJournalGeneral } from './livre-journal-general/livre-journal-general.component';

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  url = PagesComponent.urlComptabliteConfig + '/journals';
  url2 = PagesComponent.urlComptabliteConfig + '/excercice';
  url3 = PagesComponent.urlComptabliteConfig + '/journalsParents';
  url4 = PagesComponent.urlComptabliteConfig + '/livreJournals/mois';
  url5 = PagesComponent.urlComptabliteConfig + '/livreJournals/centralisee';
   



  constructor(private httpClient: HttpClient) { }

  addJournal(journal: Journal) {
    return this.httpClient.post<Journal>(this.url, journal);
  }
  getAllJournal(id:number){
    return this.httpClient.get<Journal[]>(this.url);
  }

  getAllJournalByExerciceAndJournalParent(id:number){
    return this.httpClient.get<Journal[]>(this.url2+'/'+id+'/journals');
  }

  getAllJournalByJournalParentAndMois(id:number,  mois:String){
    return this.httpClient.get<Journal[]>(this.url3+'/'+id+'/journals/'+mois);
  }
  getJournalById(id:number){
    return  this.httpClient.get<Journal>(this.url+'/'+id);
  }
  deleteJournal(id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updateJournal ( journal: Journal){
     return this.httpClient.put<Journal>(this.url+'/'+journal.idJournal, journal);
   }

   getSousJournalWithOperation(annee:string)
   {
     return this.httpClient.get<any>(this.url4+'/'+annee)
   }

   filtreSousJournalWithOperation(filtre:LivreJournalGeneral)
   {
     return this.httpClient.post<any>(this.url4,filtre)
   }

   getJournalCentralisee(annee:string)
   {
     return this.httpClient.get<any>(this.url5+'/'+annee)
   }

   getJournalByCodAndAnneAndMois( cod :string, annee:string, mois:string ){
    return  this.httpClient.get<Journal>(this.url+'/'+cod+'/'+annee+'/'+mois);
  }

  getJournalByAnneeAndNatureBanque(  annee:string ){
    return  this.httpClient.get<Journal[]>(this.url+'/'+annee+'/nature');
  }



}

export class Journal{
   
    idJournal:number;
	  code: string;
    designation:string;
    mois:string
    type:string;
    contrepartie:string;
    journalParent:Journal;
    plan:Plan;
    exercice:Excercice;
     
   
}
