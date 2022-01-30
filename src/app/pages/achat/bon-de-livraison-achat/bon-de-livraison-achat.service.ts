import { PagesComponent } from "../../pages.component";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BonDeLivraisonAchatModel } from "./bon-de-livraison-ahat.model";

@Injectable({
    providedIn: 'root'
})
export class BonDeLivraisonAchatService {
    url = PagesComponent.urlConfigAchat + '/bonDeLivraisonAchats';
    url1 = PagesComponent.urlConfigAchat + '/commande'

    constructor(protected httpClient: HttpClient) { }

    getAllBonDeLivraisonAchat(): Observable<any> {
        return this.httpClient.get(this.url);
    }
  
    getAllBonDeLivraisonAchatByCommande(): Observable<any> {
        return this.httpClient.get(this.url);
    }
    getBonDeLivraisonAchatById(id: number): Observable<any> {
        return this.httpClient.get(this.url + '/' + id);
    }
    addBonDeLivraisonAchats(bonDeLivraisonAchat: BonDeLivraisonAchatModel) {
        return this.httpClient.post<BonDeLivraisonAchatModel>(this.url, bonDeLivraisonAchat);
    }
    addBonDeLivraisonAchatsByCommande(idBC:number, bonDeLivraisonAchat: BonDeLivraisonAchatModel) {
        return this.httpClient.post<BonDeLivraisonAchatModel>(this.url1 + "/" + idBC + "/bonDeLivraisonAchats", bonDeLivraisonAchat);
    }
    updateBonDeLivraisonAchats(bonDeLivraisonAchat: BonDeLivraisonAchatModel) {
        return this.httpClient.put(this.url + '/' + bonDeLivraisonAchat.id, bonDeLivraisonAchat);
    }
    updateBonDeLivraisonAchatsByCommande(idBC:number, bonDeLivraisonAchat: BonDeLivraisonAchatModel) {
        return this.httpClient.put(this.url1 + '/' + idBC + '/bonDeLivraisonAchats/' + bonDeLivraisonAchat.id, bonDeLivraisonAchat);
    }
    deleteBonDeLivraisonAchats(id: Number) {
        return this.httpClient.delete(this.url + '/' + id);
    }
    getBonDeLivraisonEnAttente(): Observable<any> {
        return this.httpClient.get(this.url + '/en-attente');
    }
    patchBonDeLivraisonAchats(idBC:number) {
        return this.httpClient.get(this.url + '/' + idBC + '/statut');
    }
}