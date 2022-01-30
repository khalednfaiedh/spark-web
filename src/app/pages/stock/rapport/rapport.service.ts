import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RapportModel } from "./rapport.model";
import { PagesComponent } from "../../pages.component";

@Injectable({
    providedIn: 'root'
})
export class RapportService {

    url = PagesComponent.urlConfigStock + '/rapportQualites';

    constructor(protected httpClient: HttpClient) {
    }
    getAllRapport() {
        return this.httpClient.get<RapportModel[]>(this.url);
    }
    getRapportByID(id: number) {
        return this.httpClient.get<RapportModel>(this.url + '/' + id);
    }
    addRapport(rapport: RapportModel) {
        return this.httpClient.post(this.url, rapport);
    }

    deleteRapport(id) {
        return this.httpClient.delete(this.url + '/' + id);
    }
    updateRapport(rapport: RapportModel) {
        return this.httpClient.put(this.url + '/' + rapport.id, rapport);
    }
}
