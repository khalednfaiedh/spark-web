import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { EcheanceDePaiementModel } from './echeance-de-paiement-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcheanceDePaiementServiceService {
  url = PagesComponent.urlConfigVente + "/demandePrix/"
  url2 = PagesComponent.urlConfigVente + "/devis/"
  url3 = PagesComponent.urlConfigVente + "/contrat/"
  url4 = PagesComponent.urlConfigVente + "/factureAvoir/"
  url5 = PagesComponent.urlConfigVente + "/echeanceDePaiements"
  url6 = PagesComponent.urlConfigVente + "/categorieClient"
  constructor(private httpClient: HttpClient) { }

  addEcheanceDePaiementDemandePrix(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
    return this.httpClient.post(this.url + id + '/echeanceDePaiements', echeanceDePaiement)
  }
  addEcheanceDePaiementClient(echeanceDePaiement: EcheanceDePaiementModel): Observable<any> {
    return this.httpClient.post(this.url5, echeanceDePaiement)
  }

  addEcheanceDePaiementDevis(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
    return this.httpClient.post(this.url2 + id + '/echeanceDePaiements', echeanceDePaiement)
  }
  updateEcheancePAiementDevis(echeanceDePaiement: EcheanceDePaiementModel, idDevis: number): Observable<any> {
    return this.httpClient.put(this.url2 + idDevis + '/echeanceDePaiements/' + echeanceDePaiement.id, echeanceDePaiement);
  }
  getEcheanceDePaiementDemandePrix(id: number): Observable<any> {
    return this.httpClient.get(this.url + id + '/echeanceDePaiements')
  }
  getEcheancheDePaiementDevis(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + id + '/echeanceDePaiements')

  }
  getEcheancheDePaiementCategorieClient(id: number): Observable<any> {
    return this.httpClient.get(this.url6 + id + '/echeanceDePaiements')

  }
  addEcheanceDePaiementContrat(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
    return this.httpClient.post(this.url3 + id + '/echeanceDePaiements', echeanceDePaiement)
  }
  addEcheanceDePaiementFactureAvoir(echeanceDePaiement: EcheanceDePaiementModel, id: number): Observable<any> {
    return this.httpClient.post(this.url4 + id + '/echeanceDePaiements', echeanceDePaiement)
  }
  getEcheancheDePaiementFactureAvoir(id: number): Observable<any> {
    return this.httpClient.get(this.url4 + id + '/echeanceDePaiements')

  }
}
