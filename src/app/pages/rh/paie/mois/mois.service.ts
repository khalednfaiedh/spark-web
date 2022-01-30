import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root'
})
export class MoisService {
  url = PagesComponent.urlConfigPaie + '/mensualiteNumber';

  constructor(protected httpClient: HttpClient) { }
  mensualiteNumber(idEntreprise : number) {
    return this.httpClient.get<Number>(this.url + '/' + idEntreprise );
  }
}