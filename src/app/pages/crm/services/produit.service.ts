import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { Produit } from '../entities/full/produit';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  urlAdmin: string = PagesComponent.urlConfigAdmin + '/products';
  urlCRM1: string = PagesComponent.URl + '/affaire';
  urlCRM2: string = PagesComponent.URl + '/produits';
  urlCRM3: string = PagesComponent.URl + '/intervenant';

  constructor(private http: HttpClient) { }

  getProduitsByAffaire(idAffaire): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.urlCRM1 + "/" + idAffaire + "/produits")
  }
  getProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.urlAdmin);
  }
  saveProduct(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.urlCRM2, produit);
  }
  saveProducts(produit: Produit[]): Observable<Produit> {
    return this.http.post<Produit>(this.urlCRM2 + '/all', produit);
  }
  deleteProduit(ID:Number):Observable<Object>{
     return this.http.delete(this.urlCRM2 + '/' + ID)
   } 
   deleteIntervenant(ID:Number):Observable<Object>{
    return this.http.delete(this.urlCRM3 + '/' + ID)
  } 
}