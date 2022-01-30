import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeductionLogementModel } from './DeductionLogement.model';
import { PagesComponent } from '../../../pages.component';

@Injectable({
  providedIn: 'root',
})
export class DeductionLogementService {

  url1 = PagesComponent.urlConfigPaie + '/contrat';
  url = PagesComponent.urlConfigPaie + '/deductionLogement';

  constructor(protected httpClient: HttpClient) { }

  getAllDeductionLogement(idContrat: number) {
    return this.httpClient.get<DeductionLogementModel[]>(this.url1 + "/" + idContrat + "/deductionLogement");
  }

  getDeductionLogementById(idDeductionLogement : number) { // id contract
    return this.httpClient.get<DeductionLogementModel>(this.url + "/" + idDeductionLogement);
  }

  addDeductionLogement(idContrat: number, deductionLogement: DeductionLogementModel) {
    return this.httpClient.post(this.url1 + "/" + idContrat + "/deductionLogement", deductionLogement);
  }
  updateDeductionLogement(idContrat: number,  deductionLogement: DeductionLogementModel) {
    return this.httpClient.put(this.url1 + "/" + idContrat + "/deductionLogement/" + deductionLogement.idDeductionLogement , deductionLogement);
  }
  deleteDeductionLogement(idDeductionLogement: number) {
    return this.httpClient.delete(this.url + '/' + idDeductionLogement);
  }
}