  import { Injectable } from '@angular/core';
  import { HttpHeaders, HttpClient } from '@angular/common/http';
  import { ActiontypeRow } from '../entities/row/ActionTypeRow';
  import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
@Injectable({
  providedIn: 'root'
})
export class ActionTypeService {
   actionTypesUrl:string=PagesComponent.URl+'/actionTypes';

  constructor(private http:HttpClient) { }
 
 
  getActionTypesTable():Observable<ActiontypeRow[]>{
    return this.http.get<ActiontypeRow[]>(this.actionTypesUrl);
   } 

   addActionType(status:ActiontypeRow):Observable<ActiontypeRow>{
   
    if(status.typeID==null){
      console.log("Adding a type...")
       return this.http.post<ActiontypeRow>(this.actionTypesUrl,status);}
    else {
      console.log("Updating a type...")
      return this.http.put<ActiontypeRow>(this.actionTypesUrl+'/'+status.typeID,status);
  }
   }
 
}