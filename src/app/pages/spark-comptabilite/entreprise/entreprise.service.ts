import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { ExcerciceService } from '../excercice/excercice.service';


@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
 
  url = PagesComponent.urlConfigAdmin + '/entreprises';
  

  constructor(private httpClient: HttpClient){ }

  addEnterprise(entreprise: Entreprise) {
    return this.httpClient.post<Entreprise>(this.url, entreprise);
  }
  getAllEnterprise(){
    return this.httpClient.get<Entreprise[]>(this.url);
  }
  getEnterpriseById(id:number){
    return  this.httpClient.get<Entreprise>(this.url+'/'+id);
  }
  deleteEnterprise (id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updateEnterprise ( entreprise: Entreprise){
     return this.httpClient.put<Entreprise>(this.url+'/'+entreprise.enterpriseId, entreprise);
   }
}

export class Entreprise {
  enterpriseId: number;
  socialReason: string;
  juridicForm: string;
  nature: string;
  manager: string;
  taxRegistrationCode: string;
  tradeRegister: string;
  officeAddress: string;
  eState: string;
  money: string;
  capital: number;
  entEmail: string;
  telephone: number;
  zipCode: number;
  country: string;
  activity: string;
   
}