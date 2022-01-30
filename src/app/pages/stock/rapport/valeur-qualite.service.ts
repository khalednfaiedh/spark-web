import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ValeurQualiteModel } from "./valeur-qualite.model";
import { PagesComponent } from "../../pages.component";

@Injectable({
    providedIn: 'root'
})
export class ValeurQualiteService {

    url = PagesComponent.urlConfigStock + '/valeurQualites';
    url1 = PagesComponent.urlConfigStock + '/rapport';

    constructor(protected httpClient: HttpClient) {
    }
    getAllValeurQualite() {
        return this.httpClient.get<ValeurQualiteModel[]>(this.url);
    }
    getAllValeurQualiteByRapport(idR: number) {
        return this.httpClient.get<ValeurQualiteModel[]>(this.url1 + '/' + idR + '/valeurQualites');
    }
    getValeurQualiteByID(id: number) {
        return this.httpClient.get<ValeurQualiteModel>(this.url + '/' + id);
    }
    addValeurQualite(valeurQualite: ValeurQualiteModel) {
        return this.httpClient.post(this.url, valeurQualite);
    }
    deleteValeurQualite(idR: number, idC: number) {
        return this.httpClient.delete(this.url1 + '/' + idR + '/critereQualite' + '/'
            + idC + '/valeurQualites');
    }
}
