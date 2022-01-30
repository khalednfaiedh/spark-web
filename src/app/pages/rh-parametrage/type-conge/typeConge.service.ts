import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { TypeCongeModel } from './typeConge.model';

@Injectable({
  providedIn: 'root',
})
export class TypeCongeService {
  url2 = PagesComponent.urlConfigPaie + '/entreprise';
  url = PagesComponent.urlConfigPaie + '/congeTypes';
  constructor(protected httpClient: HttpClient) { }
  getAllCongeTypes() {
    let idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.get<TypeCongeModel[]>(this.url2 +'/'+ idEntreprise +'/congeTypes');
  }
  getCongeTypesById(id: number) {
    return this.httpClient.get<TypeCongeModel>(this.url + '/' + id);
  }
  addCongeTypes(congeModel: TypeCongeModel) {
    congeModel.idEntreprise = +localStorage.getItem('current_entreprise')
    return this.httpClient.post(this.url, congeModel);
  }
  updateCongeTypes(congeModel: TypeCongeModel) {
    return this.httpClient.put(this.url + '/' + congeModel.idCongeType, congeModel);
  }
  deleteCongeTypes(id: Number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}