import { Injectable } from '@angular/core';
import { PagesComponent } from '../../../pages.component';
import { HttpClient } from '@angular/common/http';
import { ProductConditionnementModel } from './product-conditionnement-model';

@Injectable({
  providedIn: 'root'
})
export class ProductConditionnementService {
  url = PagesComponent.urlConfigAdmin + '/productConditionnementEmballages';
  url2 = PagesComponent.urlConfigAdmin + '/product';
  constructor(private httpClient: HttpClient) { }

  addProductsConditionnement(productConditionnement: ProductConditionnementModel) {
    return this.httpClient.post(this.url, productConditionnement);
  }
  findAllConditionnementbyProduct(id: number) {
    return this.httpClient.get<ProductConditionnementModel[]>(this.url2 + "/" + id + "/productConditionnementEmballages")
  }
}