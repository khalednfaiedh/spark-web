import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Contact.model';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class ContactClientService {
  Url = PagesComponent.urlConfigAdmin + '/contacts';
  Url2 = PagesComponent.urlConfigAdmin + '/client';

  constructor(private http: HttpClient) {

  }
  /*public addContactClient(contact:Contact){
    return this.http.post<Contact>(this.Url, contact);
  }*/
  public findAll() {
    return this.http.get<Contact[]>(this.Url);
  }
  deleteContactClient(id: number) {
    return this.http.delete<Contact>(this.Url + '/' + id);
  }
  updateContactClient(contact: Contact, id: number) {
    return this.http.put<Contact>(this.Url2 + '/' + id + '/contacts/' + contact.id, contact);
  }
  getContactClient(id: number): Observable<any> {
    return this.http.get(this.Url2 + '/' + id + '/contacts');
  }
  getContact(id: number) {
    return this.http.get<Contact>(this.Url + '/' + id);
  }
  addContactClient(contact: Contact, id: number) {

    return this.http.post<Contact>(this.Url2 + '/' + id + '/contacts', contact);
  }
}
