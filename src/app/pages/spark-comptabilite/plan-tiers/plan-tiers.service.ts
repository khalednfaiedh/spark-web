import { Injectable } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { Plan, PlanExport } from '../plan-general/plan-general.service';

@Injectable({
  providedIn: 'root'
})
export class PlanTiersService {
  url = PagesComponent.urlComptabliteConfig + '/planTiers';
  url2 = PagesComponent.urlComptabliteConfig + '/planTiers/export';
  url4 = PagesComponent.urlComptabliteConfig + '/operations/plans/tiers';

  url5 = PagesComponent.urlComptabliteConfig + '/plansGeneral'

  ////plansGeneral/{id}/planTiers
  constructor(private httpClient: HttpClient) { }

  addPlanTiers(plan: Plan) {
    return this.httpClient.post<Plan>(this.url5+'/'+plan.compteGeneral.id+'/planTiers', plan);
  }

  importPlanTiers(plan:any) {
    return this.httpClient.post<any>(this.url+'/import', plan);
  }
  getAllPlanTiersPlanExport(){
    return this.httpClient.get<any>(this.url2);
  }
  getAllPlanTiers(){
    return this.httpClient.get<Plan[]>(this.url);
  }
  getPlanTiersById(id:number){
    return this.httpClient.get<Plan>(this.url+'/'+id);
  }

  deletePlanTiers (id: number) {
    return this.httpClient.delete(this.url+'/'+id);
   }
  updatePlanTiers( plan: Plan){
    return this.httpClient.put<Plan>(this.url5+'/'+plan.compteGeneral.id+'/planTiers/'+plan.id, plan);
  
   }
   getMouvementPlanTiers(id,annee){
    return this.httpClient.get<any[]>(this.url4+'/'+id+'/'+annee);
  }

  getPlanTiersByPlanGenerale(id:number)
  {
    return this.httpClient.get<any[]>(this.url5+'/'+id+'/planTiers')
  }
}
 
