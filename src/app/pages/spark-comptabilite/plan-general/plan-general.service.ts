import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanGeneralService {
  url = PagesComponent.urlComptabliteConfig +'/planGenerals';
  url3 = PagesComponent.urlComptabliteConfig +'/planGenerals/export';
  url2 = PagesComponent.urlComptabliteConfig + '/plans';
  url4 = PagesComponent.urlComptabliteConfig + '/operations/plans/general';
   


  constructor(private httpClient: HttpClient) { }
  addPlanGeneral(plan:Plan) {
    return this.httpClient.post<Plan>(this.url,  plan);
  }


  importPlanComptable(plan:any) {
    return this.httpClient.post<Plan>(this.url+'/import',  plan);
  }
  getAllPlanGeneralAndTiers()
  {
    return this.httpClient.get<Plan[]>(this.url2);
  } 
 
  getAllPlanGeneralPlanExport(){
    return this.httpClient.get<any>(this.url3);
  }
   getAllPlanGeneral(){
    return this.httpClient.get<Plan[]>(this.url);
  }

  getPlanGeneralById(id:number){
    return this.httpClient.get<Plan>(this.url+'/'+id);
  }

  getPlanById(id:number){
    return this.httpClient.get<any>(this.url2+'/'+id);
  }

  deletePlanGeneral (id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updatePlanGeneral( plan: Plan){
     return this.httpClient.put<Plan>(this.url+'/'+plan.id, plan);
   }

   getMouvementPlanGeneral(id,annee){
    return this.httpClient.get<any[]>(this.url4+'/'+id+'/'+annee);
  }
}

export class Plan{

  constructor() { }
	  id: number;
    nameCompte : string;
    codeCompte : string;
    nameCode:string
    compteGeneral:any
    compteNature:string
    typecompteTier:string
	  
}

export class PlanTier{
  id: number;
  nameCompte : string;
  codeCompte : string;
  comptecompte:any
  
}

export class PlanExport {
  codeCompte : string;
  nameCompte : string;


}
 
