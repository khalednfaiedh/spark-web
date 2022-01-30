import { Injectable } from '@angular/core';
import { ActionRow } from '../entities/row/ActionRow';
import { ActionFull } from '../entities/full/ActionFull';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagesComponent } from '../../pages.component';
import { ActionModel } from '../leads/edit-affaire/apopup/action';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ActionService {
    actionsUrl:string=PagesComponent.URl+'/actions';
  actionrows:ActionRow[]
  actionfulls:ActionFull[]
  constructor(private http:HttpClient) { }
 
  searchActions(action:ActionFull):Observable<ActionRow[]>{
    const searchUrl=this.actionsUrl+"/search"
    return this.http.post<ActionRow[]>(searchUrl,action)
  }
 

  addAction(action:ActionFull):Observable<ActionFull>{
   
    if(action.actionID==null){
      console.log("Adding an Action...")
       return this.http.post<ActionFull>(this.actionsUrl,action);}
    else {
      console.log("Updating an Action...")
      return this.http.put<ActionFull>(this.actionsUrl+'/'+action.actionID,action);
  }

  }

  postAction(action:ActionModel):Observable<ActionModel>{
       return this.http.post<ActionModel>(this.actionsUrl,action);
  }

  getAction(actionID:Number):Observable<ActionFull>{

    return this.http.get<ActionFull>(this.actionsUrl+'/'+actionID);
   } 
 
  getActionsTable():Observable<ActionRow[]>{
    return this.http.get<ActionRow[]>(this.actionsUrl);
   } 

   updateActionStatus(actionID,status){
    return  this.http.patch(this.actionsUrl+'/'+actionID+"/status",status)
    }

    deleteAction(actionID:Number):Observable<Object>{
      console.log(this.actionsUrl+'/'+actionID)
  return this.http.delete(this.actionsUrl+'/'+actionID)
  
     } 
}
