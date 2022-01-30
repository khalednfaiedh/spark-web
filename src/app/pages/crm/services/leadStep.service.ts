import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LeadStepCell } from "../entities/cell/leadStepCell";
import { PagesComponent } from "../../pages.component";

const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  @Injectable({
    providedIn: 'root'
  })
  export class LeadStepService {
    leadStepsUrl:string=PagesComponent.URl+'/leadSteps';

    constructor(private http:HttpClient) { }
    getSteps():Observable<LeadStepCell[]>{
      return this.http.get<LeadStepCell[]>(this.leadStepsUrl);
     } 
     addLeadStep(status:LeadStepCell):Observable<LeadStepCell>{
   
      if(status.stepID==null){
        console.log("Adding a step...")
         return this.http.post<LeadStepCell>(this.leadStepsUrl,status);}
      else {
        console.log("Updating a step...")
        return this.http.put<LeadStepCell>(this.leadStepsUrl+'/'+status.stepID,status);
    }
     }
     
  }
  