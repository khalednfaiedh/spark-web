import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActiontypeRow } from '../entities/row/ActionTypeRow';
import { Observable } from 'rxjs';
import { ActionStatus } from '../entities/cell/ActionStatus';
import { PagesComponent } from '../../pages.component';
const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ActionStatusService {
   actionStatusUrl:string=PagesComponent.URl+'/actionstatus';

  constructor(private http:HttpClient) { }
 
 
  getActionStatusTable():Observable<ActionStatus[]>{
    return this.http.get<ActionStatus[]>(this.actionStatusUrl);
   } 
   addActionStatus(status:ActionStatus):Observable<ActionStatus>{
   
    if(status.statusID==null){
      console.log("Adding action status...")
       return this.http.post<ActionStatus>(this.actionStatusUrl,status);}
    else {
      console.log("Updating action stat...")
      return this.http.put<ActionStatus>(this.actionStatusUrl+'/'+status.statusID,status);
  }

  }

}