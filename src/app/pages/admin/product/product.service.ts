import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*import {ModalProductComponent} from './modal-product/modal-product.component';
import {ProductComponent} from "./product.component";
import {ProductModule} from "./product.module";*/
import { ProductMinModel, ProductModel } from './product.model';
import { PagesComponent } from '../../pages.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  url4 =PagesComponent.urlConfigAdmin + '/entreprise';
  url = PagesComponent.urlConfigAdmin + '/products';
  url2 = PagesComponent.urlConfigAdmin + '/categorie'
  url3 = PagesComponent.urlConfigAdmin + '/products2';
  constructor(protected httpClient: HttpClient) { }
  getAllproduct(id) {
    return this.httpClient.get<ProductModel[]>(this.url4+'/'+id+'/products');
  }
  getProductById(idProduct: number) {
    return this.httpClient.get<ProductModel>(this.url + '/' + idProduct);
  }
  addProducts(idEntreprise , product: ProductModel) {
    return this.httpClient.post<ProductModel>(this.url4+'/'+idEntreprise+'/products', product);
  }
  addProducts2(form: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data"
      })
    };
    return this.httpClient.post(this.url + '/2', form, httpOptions);
  }
  updateProducts( idEntreprise, product: ProductModel) {
    return this.httpClient.put(this.url4 + '/' +idEntreprise+'/products/' + product.idProduct, product);
  }
  deleteProducts(idProduct: Number) {
    return this.httpClient.delete(this.url + '/' + idProduct);
  }
  getProductByCode(code: string) {
    return this.httpClient.get<ProductModel>(this.url + '/code/' + code);
  }
  getProductByCategorie(id: number) {
    return this.httpClient.get<ProductModel[]>(this.url2 + '/' + id + '/products')
  }
  updateProducts2(product: ProductModel, id: number): Observable<any> {
    return this.httpClient.put(this.url + '/' + id, product);
  }

  getAllproductMin() {
    let id = localStorage.getItem('current_entreprise')
    return this.httpClient.get<ProductMinModel[]>(this.url4+'/'+id+'/products/min/init');
  }
  getAllproductMinNotInisialised() {
    let id = localStorage.getItem('current_entreprise')
    return this.httpClient.get<ProductMinModel[]>(this.url4+'/'+id+'/products/min');
  }
  patch(idProduct: number,etat:boolean) {
    return this.httpClient.get<ProductModel>(this.url + '/' + idProduct +'/etat/' + etat);
  }
}
