import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';
import { ProductTaxeModel } from './product-taxe-model';
import { ProductTaxePKModel } from './product-taxe-pk-model';

@Injectable({
  providedIn: 'root'
})
export class ProductTaxeService {
  url = PagesComponent.urlConfigAdmin + '/productTaxes';
  url2 = PagesComponent.urlConfigAdmin + '/product';
  constructor(private httpClient: HttpClient) { }

  addProductsTaxe(productTaxe: ProductTaxeModel) {
    return this.httpClient.post(this.url, productTaxe);
  }

  findAllTaxebyProduct(id: number) {
    return this.httpClient.get<ProductTaxeModel[]>(this.url2 + "/" + id + "/productTaxes")
  }
  findAll() {
    return this.httpClient.get<ProductTaxeModel[]>(this.url);
  }
  update(productTaxe: ProductTaxeModel) {
    return this.httpClient.put(this.url, productTaxe);
  }
}
