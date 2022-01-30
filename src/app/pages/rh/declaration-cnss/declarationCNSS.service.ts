import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { DeclarationCNSS } from './declarationCNSS.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarationCNSSService {

 url = PagesComponent.urlConfigPaie + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }

  getDeclarationCNSS(idEntreprise : number, trimestre : number,annee: number, codeExpl : String) {
    return this.httpClient.get<DeclarationCNSS[]>(this.url+ idEntreprise + '/declarationCNSS/'+trimestre+'/'+annee+'/'+codeExpl );
  } 
  generateTxt(idEntreprise : number,trimestre : number,annee: number, codeExpl : String,mail:string){
    return this.httpClient.get(this.url + idEntreprise +'/text/'+trimestre+'/'+annee+'/'+codeExpl+'/'+mail  );
  }
  sendMail(){
    return this.httpClient.get(PagesComponent.urlConfigPaie+"/sendemail")
  }
  declarationToPdf(idEntreprise : number , trimestre : number,annee: number, codeExpl : String):Observable<Blob> {
    return this.httpClient.get(this.url + idEntreprise + '/declarationCnssPDF/' + trimestre +'/' +annee+'/'+codeExpl,{responseType:'blob'});
  }

  declarationToExcel(idEntreprise : number , trimestre : number,annee: number, codeExpl : String):Observable<Blob> {
    return this.httpClient.get(this.url + idEntreprise + '/declarationCNSSxls/' + trimestre +'/' +annee+'/'+codeExpl,{responseType:'blob'});
  }
}