import { Injectable } from '@angular/core';
import { ProspectRow } from '../entities/row/ProspectRow';
import { ProspectFull } from '../entities/full/ProspectFull';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProspectCell } from '../entities/cell/ProspectCell';
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
export class ProspectService {
  prospectsUrl:string=PagesComponent.URl+'/prospects';
  prospectrows:ProspectRow[]
  prospectfulls:ProspectFull[]
  constructor(private http:HttpClient) { }
  
  searchProspects(prospect:ProspectFull):Observable<ProspectRow[]>{
    const searchUrl=this.prospectsUrl+"/search"
    return this.http.post<ProspectRow[]>(searchUrl,prospect)
  }
  getProspectsCells():Observable<ProspectCell[]>{
    return this.http.get<ProspectCell[]>(this.prospectsUrl+'/cells');
   } 
  getFullProspect(id):Observable<ProspectFull>{
    
    return this.http.get<ProspectFull>(this.prospectsUrl+"/"+id)
  }
  getProspectRows():Observable<ProspectRow[]>{
    return this.http.get<ProspectRow[]>(this.prospectsUrl)
  }
  getArchivedProspectRows():Observable<ProspectRow[]>{
    return this.http.get<ProspectRow[]>(this.prospectsUrl+'/archivee')
  }
  addProspect(prospect:ProspectFull):Observable<ProspectFull>{
   
    if(prospect.prospectID==null){
      console.log("Adding a Prospect...")
       return this.http.post<ProspectFull>(this.prospectsUrl,prospect);}
    else {
      console.log("Updating a lead...")
      return this.http.put<ProspectFull>(this.prospectsUrl+'/'+prospect.prospectID,prospect);
  }

  }

  deleteProspect(prospectID:Number):Observable<Object>{
    console.log(this.prospectsUrl+'/'+prospectID)
return this.http.patch(this.prospectsUrl+'/'+prospectID+'/delete',"")

   } 
}
