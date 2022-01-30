import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactMagasinModel } from './contact-magasin.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root',
})
export class ContactMagasinService {
  url1 = PagesComponent.urlConfigStock + '/contactMagasins';
  url = PagesComponent.urlConfigStock + '/magasin';
  constructor(protected httpClient: HttpClient) { }
  getAllContactMagasinsByMagasin(id: number) {
    return this.httpClient.get<ContactMagasinModel[]>(this.url + '/' + id + '/contactMagasins');
  }
  getAllContactMagasins() {
    return this.httpClient.get<ContactMagasinModel[]>(this.url1);
  }
  addContactMagasinsMagasin(contactMagasin: ContactMagasinModel, id: number) {
    return this.httpClient.post(this.url + '/' + id + '/contactMagasins', contactMagasin);
  }
  addContactMagasins(contactMagasin: ContactMagasinModel) {
    return this.httpClient.post(this.url1, contactMagasin);
  }
  updateContactMagasinsMagasin(contactPartenaire: ContactMagasinModel, id: number) {
    return this.httpClient.put
      (this.url + '/' + id +  '/contactMagasins' + '/' + contactPartenaire.id, contactPartenaire);
  }
  updateContactMagasins(contactPartenaire: ContactMagasinModel) {
    return this.httpClient.put
      (this.url1 + '/' + contactPartenaire.id, contactPartenaire);
  }
  deleteContactMagasins(id: number) {
    return this.httpClient.delete(this.url1 + '/' + id);
  }
}
