import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrimeModel } from './prime.model';
import { PagesComponent } from '../../pages.component';

@Injectable({
  providedIn: 'root',
})
export class PrimeService {
  url1 = PagesComponent.urlConfigPaie + '/primes';
  url = PagesComponent.urlConfigPaie + '/contrat';
  constructor(protected httpClient: HttpClient) { }
  getAllPrimes(id: number) {
    return this.httpClient.get<PrimeModel[]>(this.url + '/' + id + '/' + 'primes');
  }
  getPrimesById(id: number) {
    return this.httpClient.get<PrimeModel>(this.url1 + '/' + id);
  }
  addPrimes(prime: PrimeModel, id: number) {
    return this.httpClient.post(this.url + '/' + id + '/' + 'primes', prime);
  }
  updatePrimes(prime: PrimeModel, id: number) {
    return this.httpClient.put(this.url + '/' + id + '/' + 'primes' + '/' + prime.idPrime, prime);
  }
  deletePrimes(id: Number) {
    return this.httpClient.delete(this.url1 + '/' + id);
  }
}
