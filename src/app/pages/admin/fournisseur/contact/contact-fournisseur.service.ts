import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactModal } from './contact.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class ContactFournisseurService {
  url= PagesComponent.urlConfigAdmin +'/contacts';
  url1= PagesComponent.urlConfigAdmin + '/fournisseur';
  constructor(protected httpClient: HttpClient) { }
  getAllContact() {
  return this.httpClient.get<ContactModal>(this.url);
}
addContact(contact:any){
  return this.httpClient.post<ContactModal>(this.url,contact);
}
deleteContact(id:number){
  return this.httpClient.delete(this.url+'/'+id);
}
updateContact(contact:any,id:Number){
  return this.httpClient.put<ContactModal>(this.url+'/'+id,contact);
}
getContactFournisseur(id: number){
  return this.httpClient.get<ContactModal>(this.url1+'/'+id+'/contacts');
}
getContactByid(id: number) {
  return  this.httpClient.get<ContactModal>(this.url+'/' +id);
}
addContactFournisseur(contact:ContactModal ,idF: number){
  return this.httpClient.post(this.url1+'/'+idF+'/contacts',contact);
}
updateContactFournisseur(contact:ContactModal ,idF: number){
  return this.httpClient.put(this.url1 + '/' + idF +'/contacts/'+ contact.id,contact);
  }
}

