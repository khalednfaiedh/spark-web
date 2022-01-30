import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, Observable } from "rxjs";
import { PagesComponent } from "../../../pages.component";
import { Contact } from "./pContact.model";

@Injectable({
    providedIn: 'root'
  })
export class ProspectContactService {
    url: string = PagesComponent.URl + '/prospect';
    url2: string = PagesComponent.URl + '/contact';

    constructor(private http: HttpClient) { }

    getAll(idProspect: number): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.url + '/' + idProspect + '/contacts');
    }
    save(idPros:number,contact: Contact){
        return this.http.post(this.url + '/' + idPros+'/contacts', contact)
    }
    delete(id: Number) {
        return this.http.delete(this.url2 + '/' + id);
    }
}