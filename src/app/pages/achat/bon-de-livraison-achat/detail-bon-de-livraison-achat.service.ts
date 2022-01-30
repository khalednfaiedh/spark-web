import { Injectable } from "@angular/core";
import { PagesComponent } from "../../pages.component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DetailBonDeLivraisonAchatModel } from "./detail-bon-de-livraison-achat.model";

@Injectable({
    providedIn: 'root'
})
export class DetailBonDeLivraisonAchatService {
    url1= PagesComponent.urlConfigAchat + '/bonDeLivraisonAchat'
    url = PagesComponent.urlConfigAchat + '/detailBonDeLivraisonAchats';

    constructor(protected httpClient: HttpClient) { }

    getAllDetailBonDeLivraisonAchat(): Observable<any> {
        return this.httpClient.get(this.url);
    }
    getAllDetailBonDeLivraisonAchatByBonDeLivraison(idBL: number): Observable<any> {
        return this.httpClient.get(this.url1 + '/' + idBL + '/detailBonDeLivraisonAchats');
    }
    getDetailBonDeLivraisonAchatById(id: number): Observable<any> {
        return this.httpClient.get(this.url + '/' + id);
    }
    addDetailBonDeLivraisonAchats(detailBonDeLivraisonAchat: DetailBonDeLivraisonAchatModel) {
        return this.httpClient.post<DetailBonDeLivraisonAchatModel>(this.url, detailBonDeLivraisonAchat);
    }
    addDetailBonDeLivraisonAchatsByBonDeLivraison(idBL: number,detailBonDeLivraisonAchat: DetailBonDeLivraisonAchatModel) {
        return this.httpClient.post<DetailBonDeLivraisonAchatModel>(this.url1 + '/' + idBL + '/detailBonDeLivraisonAchats', detailBonDeLivraisonAchat);
    }
    updateDetailBonDeLivraisonAchats(detailBonDeLivraisonAchat: DetailBonDeLivraisonAchatModel) {
        return this.httpClient.put(this.url + '/' + detailBonDeLivraisonAchat.id, detailBonDeLivraisonAchat);
    }
    updateDetailBonDeLivraisonAchatsByBonDeLivraison(idBL: number, detailBonDeLivraisonAchat: DetailBonDeLivraisonAchatModel) {
        return this.httpClient.put(this.url1 + '/' + idBL + '/detailBonDeLivraisonAchats' + detailBonDeLivraisonAchat.id, detailBonDeLivraisonAchat);
    }
    deleteDetailBonDeLivraisonAchats(id: Number) {
        return this.httpClient.delete(this.url + '/' + id);
    }
}