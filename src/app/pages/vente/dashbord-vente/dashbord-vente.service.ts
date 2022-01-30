import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class DashbordVenteService {
  url = PagesComponent.urlConfigVente + '/dashbords/facture/'
  url2 = PagesComponent.urlConfigVente + '/dashbords/bonLivraison/'
  url3 = PagesComponent.urlConfigVente + '/dashbords/devis/'
  url4 = PagesComponent.urlConfigVente + '/dashbords/dmd/'
  constructor(private httpclient: HttpClient) { }

  nbreFacturePayee(): Observable<any> {
    return this.httpclient.get(this.url + 'payee')
  }
  nbreFactureNonPayee(): Observable<any> {
    return this.httpclient.get(this.url + 'nonpayee')
  }
  nbreFacturePartPayee(): Observable<any> {
    return this.httpclient.get(this.url + 'partpayee')

  }
  nbreBonLivraisonRetard(): Observable<any> {
    return this.httpclient.get(this.url2 + 'retard')
  }
  nbreBonLivraisonNonRetard(): Observable<any> {
    return this.httpclient.get(this.url2 + 'nonretard')
  }
  nbreBonLivraisonRetardFacture(id: number): Observable<any> {
    return this.httpclient.get(this.url2 + id + '/retard')
  }
  nbreBonLivraisonNonRetardFacture(id: number): Observable<any> {
    return this.httpclient.get(this.url2 + id + '/nonretard')
  }
  listDMDParclient(id: number): Observable<any> {
    return this.httpclient.get(this.url4 + id)
  }
  nbreDevisTotale(id: number): Observable<any> {
    return this.httpclient.get(this.url3 + 'totale/' + id)
  }
  nbreDevisNonAccepte(id: number): Observable<any> {
    return this.httpclient.get(this.url3 + 'nonaccepte/' + id)
  }
}
