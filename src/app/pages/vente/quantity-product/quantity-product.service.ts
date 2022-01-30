import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { QuantityProductModel } from './quantity-product-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuantityProductService {
  url = PagesComponent.urlConfigVente + '/quantityproducts'
  url2 = PagesComponent.urlConfigVente + '/contrat'
  url7 = PagesComponent.urlConfigVente + '/commande/'
  url3 = PagesComponent.urlConfigVente + '/devis'
  url4 = PagesComponent.urlConfigVente + '/devis/facture'
  url5 = PagesComponent.urlConfigVente + '/factureAvoir'
  url6 = PagesComponent.urlConfigVente + '/devisLivre'
  constructor(private httpclient: HttpClient) { }

  public addquantityProductContrat(idContrat: number, quantityProduct: QuantityProductModel) {
    return this.httpclient.post<QuantityProductModel>(this.url2 + '/' + idContrat + '/quantityproducts', quantityProduct);

  }
  addquantityProduct(quantityProduct: QuantityProductModel) {
    return this.httpclient.post<QuantityProductModel>(this.url, quantityProduct);

  }
  public getAllquantityProductContrat(idContrat: number) {
    return this.httpclient.get<QuantityProductModel[]>(this.url2 + '/' + idContrat + '/quantityproducts')
  }
  public updatequantityProductContrat(quantityProduct: QuantityProductModel, idContrat: number, id: number): Observable<any> {
    console.log(" quantityProduct", quantityProduct)
    return this.httpclient.put(this.url2 + '/' + idContrat + '/quantityproducts/' + id, quantityProduct);
  }
  public delete(id: number): Observable<any> {
    return this.httpclient.delete(this.url + '/' + id);
  }
  public getAllquantityProductDevis(idDevis: number): Observable<any> {
    return this.httpclient.get<QuantityProductModel[]>(this.url3 + '/' + idDevis + '/quantityproducts')
  }
  updatequantityProductDevis(quantityProduct: QuantityProductModel, idDevis: number): Observable<any> {
    return this.httpclient.put(this.url3 + '/' + idDevis + '/quantityproducts/' + quantityProduct.idQuantityProduct, quantityProduct);
  }
  public getAllquantityProductDevisFacture(idDevis: number): Observable<any> {
    return this.httpclient.get<QuantityProductModel[]>(this.url4 + '/' + idDevis + '/quantityproducts')
  }
  public addQuntityProductFactureAvoir(quantityProduct: QuantityProductModel): Observable<any> {
    return this.httpclient.post(this.url5 + '/quantityproducts', quantityProduct)
  }
  public getAllquantityProductFactureAvoir(id: number): Observable<any> {
    return this.httpclient.get<QuantityProductModel[]>(this.url5 + '/' + id + '/quantityproducts')
  }
  public getAllquantityProductDevisLivre(idDevis: number): Observable<any> {
    return this.httpclient.get<QuantityProductModel[]>(this.url6 + '/' + idDevis + '/quantityproducts')
  }

  public getAllquantityProductContratCommande(idCommande: number): Observable<any> {
    return this.httpclient.get<QuantityProductModel[]>(this.url7 + idCommande + '/quantityproducts')
  }
  public updatequantityProductCommandeContrat(quantityProduct: QuantityProductModel, idCommande: number, id: number): Observable<any> {
    console.log(" quantityProduct", quantityProduct)
    return this.httpclient.put(this.url7 + idCommande + '/quantityproducts/' + id, quantityProduct);
  }
}
