import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypePrimeModel} from './type-prime.model';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root',
})
export class TypePrimeService {

  url = PagesComponent.urlConfigPaie + '/typePrimes';
  url2 = PagesComponent.urlConfigPaie + '/entreprise';
  constructor(protected httpClient: HttpClient) { }
  getAllTypePrimes() {
    let idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<TypePrimeModel[]>(this.url2
      + '/' + idEntreprise + '/typePrimes' );
  }
  getTypePrimesById(id: number) {
    return this.httpClient.get<TypePrimeModel>(this.url + '/' + id);
  }
  addTypePrimes(typePrime: TypePrimeModel) {
    typePrime.idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.post(this.url, typePrime);
  }
  updateTypePrimes(typePrime: TypePrimeModel) {
    return this.httpClient.put(this.url + '/' + typePrime.id, typePrime);
  }
  deleteTypePrimes(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}