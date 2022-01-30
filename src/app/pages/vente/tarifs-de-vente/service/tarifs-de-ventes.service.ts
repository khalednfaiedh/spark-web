import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TarifsDeVenteModel } from '../tarifs-de-vente.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class TarifsDeVentesService {
  url = PagesComponent.urlConfigVente + '/prixproducts';
  url2 = PagesComponent.urlConfigVente + '/product';
  url3 = PagesComponent.urlConfigVente + '/entreprise/';
  constructor(private httpClient: HttpClient) { }
  getAllTarifs(id: number): Observable<any> {

    return this.httpClient.get(this.url3 + id + '/prixproducts');
  }
  addTarifs(tarifs: TarifsDeVenteModel): Observable<any> {
    return this.httpClient.post(this.url, tarifs);
  }
  deleteTarifs(idTarifs: number) {
    return this.httpClient.delete(this.url + '/' + idTarifs);
  }
  updateTarifs(tarifs: TarifsDeVenteModel) {
    console.log('içi update tarif front')
    return this.httpClient.put(this.url + '/' + tarifs.idTar, tarifs);
  }
  getTarifsbyId(id: number): Observable<any> {
    return this.httpClient.get(this.url + '/' + id);
  }
  gatAllTarifByProduct(idProduct: number) {
    return this.httpClient.get<TarifsDeVenteModel[]>(this.url2 + '/' + idProduct + '/prixproducts');
  }
  gatAllTarifByProductByTypeDeprix(idProduct: number, typePrix: string) {
    return this.httpClient.get<TarifsDeVenteModel[]>(this.url2 + '/' + idProduct + '/type/' + typePrix + '/prixproducts');
  }
  deletebyidProduct(idProduct: number) {
    return this.httpClient.delete(this.url2 + '/' + idProduct + '/prixproducts');
  }
  getTarifsByDate(idProduct: number): Observable<any> {
    return this.httpClient.get(this.url2 + '/' + idProduct + '/date/prixproducts');
  }
  getTarifContrat(idProduct: number, idUniteMesure: number, idUniteTransaction: number) {
    return this.httpClient.get(this.url + '/contrat/' + idProduct + '/' + idUniteMesure + '/' + idUniteTransaction);
  }
}
