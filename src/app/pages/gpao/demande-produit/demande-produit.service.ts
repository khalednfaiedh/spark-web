import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { DemandeProduit, DemandeProduitDetails } from './demande-produit.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DemandeProdService {

    url = PagesComponent.urlGPAOConfig + '/entreprise';
    url2 = PagesComponent.urlGPAOConfig + '/demande';

    constructor(private httpClient: HttpClient) { }

    getAll() {
        let idE = +localStorage.getItem('current_entreprise')
        return this.httpClient.get<DemandeProduit[]>(this.url + '/' + idE + '/demande')
    }
    getAllEnAttente() {
        let idE = +localStorage.getItem('current_entreprise')
        return this.httpClient.get<DemandeProduit[]>(this.url + '/' + idE + '/demande-en-attente/' + false)
    }
    getOne(id) {
        return this.httpClient.get<DemandeProduit>(this.url2 + '/' + id)
    }
    getProduits(id) {
        return this.httpClient.get<DemandeProduitDetails>(this.url2 + '/' + id + '/produits')
    }
    patch(id: number, liv: boolean) {
        return this.httpClient.patch<DemandeProduit>(this.url2 + '/' + id + '/liv/' + liv, null)
    }
    update(demande: DemandeProduit) {
        return this.httpClient.put<DemandeProduit>(this.url2 + '/' + demande.id, demande)
    }

}