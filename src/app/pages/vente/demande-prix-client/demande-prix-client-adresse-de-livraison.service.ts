import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { DemandePrixClientAdresseDeLivraisonModel } from './demande-prix-client-adresses-de-livraison-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandePrixClientAdresseDeLivraisonService {
  url = PagesComponent.urlConfigVente + '/demandeprixsAdresseDeLivraisons'
  url2 = PagesComponent.urlConfigVente + '/demandePrix'
  url3 = PagesComponent.urlConfigVente + '/bonLivraison'
  constructor(private httpClient: HttpClient) { }

  public addDemandePrixAdresses(id: number, demandePrixAdresses: DemandePrixClientAdresseDeLivraisonModel): Observable<any> {
    return this.httpClient.post(this.url2 + '/' + id + '/demandeprixsAdresseDeLivraisons', demandePrixAdresses);
  }

  getAdressesbyDemande(id: number): Observable<any> {
    return this.httpClient.get(this.url2 + '/' + id + '/demandeprixsAdresseDeLivraisons');
  }
  deleteAdresse(id: number) {
    return this.httpClient.delete(this.url + '/' + id)
  }
  public addDemandePrixAdressesBonLivraison(id: number, demandePrixAdresses: DemandePrixClientAdresseDeLivraisonModel): Observable<any> {
    return this.httpClient.post(this.url3 + '/' + id + '/demandeprixsAdresseDeLivraisons', demandePrixAdresses);
  }
  getAdressesbyBonLivraison(id: number): Observable<any> {
    return this.httpClient.get(this.url3 + '/' + id + '/demandeprixsAdresseDeLivraisons');
  }
}
