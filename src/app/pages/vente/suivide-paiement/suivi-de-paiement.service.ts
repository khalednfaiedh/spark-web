import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { SuividePaiementModel } from './Suivi-de-paiement-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuiviDePaiementService {
  url = PagesComponent.urlConfigVente + '/facture'
  url2 = PagesComponent.urlConfigVente + '/suiviPaiements'
  constructor(protected httpclient: HttpClient) { }
  public addSuiviPaiement(suiviPaiement: SuividePaiementModel, id: number): Observable<any> {
    return this.httpclient.post<any>(this.url + '/' + id + '/suiviPaiements', suiviPaiement)
  }
  public findAllSuiviPaiement(): Observable<any> {
    return this.httpclient.get(this.url2)
  }
  public getSuiviPaiementById(id: number): Observable<any> {
    return this.httpclient.get(this.url2 + '/' + id);
  }
  public updateSuiviPaiement(suiviPaiement: SuividePaiementModel, id: number): Observable<any> {
    return this.httpclient.put(this.url2 + '/' + id, suiviPaiement)
  }
  public countSPNP(): Observable<any> {
    return this.httpclient.get(this.url2 + '/NonPayee')
  }
  public countSPPP(): Observable<any> {
    return this.httpclient.get(this.url2 + '/PartiellementPayee')
  }
  public getSuiviPaiementByFacture(id: number): Observable<any> {
    return this.httpclient.get(this.url + '/' + id + '/suiviPaiements');
  }
}
