import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BanqueModel } from './Banque.modal';
import { PagesComponent } from '../../pages.component';


@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  url = PagesComponent.urlConfigAdmin + '/banques';
  url2 = PagesComponent.urlConfigAdmin + '/entreprise/';
  constructor(protected httpClient: HttpClient) { }

  getAllBanques(id: number) {

    return this.httpClient.get<BanqueModel[]>(this.url2 + id + '/banques');
  }
  addBanque(banque: BanqueModel, id: number) {
    return this.httpClient.post(this.url2 + id + '/banques', banque);
  }
  deleteBanque(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
  updateBanque(banque: BanqueModel) {
    return this.httpClient.put(this.url + '/' + banque.id, banque);
  }
  getBanqueByid(id: number) {
    return this.httpClient.get<BanqueModel>(this.url + '/' + id);
  }
}