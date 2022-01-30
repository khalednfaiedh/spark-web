import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';
import { BonDeLivraisonClientModel } from '../Bon-de-livraison-client-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BonDeLivraisonService {
  url = PagesComponent.urlConfigVente + '/bonDeLivraisons'
  url2 = PagesComponent.urlConfigVente + '/facture'
  constructor(private httpClient: HttpClient) { }
  public addBondeLivraison(bonLivraison: BonDeLivraisonClientModel): Observable<any> {
    return this.httpClient.post(this.url, bonLivraison)
  }
  public updateBonDeLivraison(bonLivraison: BonDeLivraisonClientModel, id: number): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, bonLivraison)
  }
  public getAllBonLivraison(): Observable<any> {
    return this.httpClient.get(this.url)
  }
  public getBondeLivraisonById(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id)
  }
  public getAllBonLivraisonFacture(idFacture: number): Observable<any> {
    return this.httpClient.get(this.url2 + '/' + idFacture + '/bonDeLivraisons')
  }
  public getAllInStock(): Observable<any> {
    return this.httpClient.get(this.url + '/stock')
  }
}
