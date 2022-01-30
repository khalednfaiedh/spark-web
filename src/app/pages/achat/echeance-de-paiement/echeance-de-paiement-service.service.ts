import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { EcheanceDePaiementModel } from './echeance-de-paiement-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcheanceDePaiementServiceService {
  url = PagesComponent.urlConfigAchat + "/demandePrix/"

  constructor(private httpClient: HttpClient) { }

  addEcheanceDePaiementDemandePrix(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
    return this.httpClient.post(this.url + id + '/echeanceDePaiements', echeanceDePaiement)
  }
  getEcheanceDePaiementDemandePrix(id: number): Observable<any> {
    return this.httpClient.get(this.url + id + '/echeanceDePaiements')
  }
  updateEcheanceDePaiementDemandePrix(iddp: number, echeanceDePaiement: EcheanceDePaiementModel): Observable<any> {
    return this.httpClient.put(this.url + iddp + '/echeanceDePaiements/' + echeanceDePaiement.id, echeanceDePaiement)
  }
  /* addEcheanceDePaiementDevis(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
     return this.httpClient.post(this.url2 + id + '/echeanceDePaiements', echeanceDePaiement)
   }
   updateEcheancePAiementDevis(echeanceDePaiement: EcheanceDePaiementModel, idDevis: number): Observable<any> {
     return this.httpClient.put(this.url2 + idDevis + '/echeanceDePaiements/' + echeanceDePaiement.id, echeanceDePaiement);
   }*/

  /* getEcheancheDePaiementDevis(id: number): Observable<any> {
     return this.httpClient.get(this.url2 + id + '/echeanceDePaiements')
 
   }
   addEcheanceDePaiementContrat(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
     return this.httpClient.post(this.url3 + id + '/echeanceDePaiements', echeanceDePaiement)
   }
   addEcheanceDePaiementFactureAvoir(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
     return this.httpClient.post(this.url4 + id + '/echeanceDePaiements', echeanceDePaiement)
   }
   getEcheancheDePaiementFactureAvoir(id: number): Observable<any> {
     return this.httpClient.get(this.url4 + id + '/echeanceDePaiements')
 
   }*/
}
