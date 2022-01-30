import { Injectable } from '@angular/core';
import { ActionRow } from '../entities/row/ActionRow';
import { ActionFull } from '../entities/full/ActionFull';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { ActionModel } from '../leads/edit-affaire/apopup/action';


@Injectable({
  providedIn: 'root'
})
export class ProspecteurService {
  constructor(private http: HttpClient) { }
  Url: string = PagesComponent.URl + '/prospecteur';

  getListe(): Observable<ActionModel[]> {
    return this.http.get<ActionModel[]>(this.Url + '/actions');
  }
  getActions(prospecteur): Observable<ActionModel[]> {
    return this.http.get<ActionModel[]>(this.Url + '/' + prospecteur + '/actions');
  }
}