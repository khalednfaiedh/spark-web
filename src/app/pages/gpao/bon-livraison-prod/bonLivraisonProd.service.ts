import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { BonDeLivraisonProd } from '../bon-livraison-prod/BonLivraisonProd.model';

@Injectable({
    providedIn: 'root'
})
export class BonLivraisonProdService {

    url = PagesComponent.urlConfigStock + '/entreprise';
    url2 = PagesComponent.urlConfigStock + '/blProd';

    constructor(private httpClient: HttpClient) { }

    getAll() {
        let idE = +localStorage.getItem('current_entreprise')
        return this.httpClient.get<BonDeLivraisonProd[]>(this.url + '/' + idE + '/blProd')
    }
    getAllEnAttente() {
        let idE = +localStorage.getItem('current_entreprise')
        return this.httpClient.get<BonDeLivraisonProd[]>(this.url + '/' + idE + '/en-attente/' + false)
    }
    getOne(id) {
        return this.httpClient.get<BonDeLivraisonProd>(this.url2 + '/' + id)
    }
    patch(id: number, etat: boolean) {
        return this.httpClient.patch<BonDeLivraisonProd>(this.url2 + '/' + id + '/etat/' + etat, null)
    }
    update(bl: BonDeLivraisonProd) {
        return this.httpClient.put<BonDeLivraisonProd>(this.url2 + '/' + bl.id, bl)
    }

}
