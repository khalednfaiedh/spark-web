import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { JournalPaieModel } from './journalPaie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalPaieService {
  url = PagesComponent.urlConfigPaie + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }
  getJournal(idEntreprise : number , mois : number,annee: number) {
    return this.httpClient.get<JournalPaieModel>(this.url+ idEntreprise+ '/journal/'+mois+'/'+annee );
  } 
  
  journalToExcel(idEntreprise : number , mois : number,annee: number):Observable<Blob> {
    return this.httpClient.get(this.url + idEntreprise + '/journalxls/' + mois +"/" +annee,{responseType:'blob'});
  }
  journalToPdf(idEntreprise : number , mois : number,annee: number):Observable<Blob> {
    return this.httpClient.get(this.url + idEntreprise + '/journalpdf/' + mois +"/" +annee,{responseType:'blob'});
  }
}