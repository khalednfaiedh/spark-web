import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { NoteRow } from '../entities/row/NoteRow';


const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  surveysUrl:string=PagesComponent.URl+'/surveys';
  surveyrows:NoteRow[]
  constructor(private http:HttpClient) { }

  getSurveyRows():Observable<NoteRow[]>{
    return this.http.get<NoteRow[]>(this.surveysUrl)
  
  }
  //bad add and update.They work yes but since they dont take lead as a param everything they add/update is now 
  //independant from any lead 
  addSurvey(survey:NoteRow):Observable<NoteRow>{
   
    if(survey.surveyID==null){
      console.log("Adding a survey...")
       return this.http.post<NoteRow>(this.surveysUrl,survey);}
    else {
      console.log("Updating a lead...")
      return this.http.put<NoteRow>(this.surveysUrl+'/'+survey.surveyID,survey);
  }

  }

  deleteSurvey(surveyID:Number):Observable<Object>{
    console.log(this.surveysUrl+'/'+surveyID)
return this.http.delete(this.surveysUrl+'/'+surveyID)

   } 
}
