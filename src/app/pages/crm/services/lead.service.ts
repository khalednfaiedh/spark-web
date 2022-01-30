import { Injectable } from '@angular/core';
import { LeadRow } from '../entities/row/LeadRow';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeadList } from '../entities/row/LeadList';
import { LeadFull } from '../entities/full/LeadFull';
import { NoteRow } from '../entities/row/NoteRow';
import { PagesComponent } from '../../pages.component';
import { LeadCell } from '../entities/cell/LeadCell';
import { Intervenant } from '../entities/full/Intervenant';
import { ActionModel } from '../leads/edit-affaire/apopup/action';
import { RapportCloture } from '../entities/full/rapportCloture';
import { Produit } from '../entities/full/produit';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class LeadService {
  leadsUrl: string = PagesComponent.URl + '/leads';

  constructor(private http: HttpClient) { }

  getLead(leadID: Number): Observable<LeadFull> {
    return this.http.get<LeadFull>(this.leadsUrl + '/' + leadID);
  }

  getLeads(): Observable<LeadRow[]> {
    return this.http.get<LeadRow[]>(this.leadsUrl);
  }
  getLeadCells(): Observable<LeadCell[]> {
    return this.http.get<LeadCell[]>(this.leadsUrl + "/cells");
  }

  deleteLead(leadID: Number): Observable<Object> {
    console.log(this.leadsUrl + '/' + leadID)
    return this.http.patch(this.leadsUrl + '/' + leadID + "/delete", "")
  }
  archiverAffaire(rapport:RapportCloture): Observable<Object> {
    return this.http.put(this.leadsUrl + "/archivee",rapport)
  }
  getLeadsTable(): Observable<LeadList[]> {
    return this.http.get<LeadList[]>(this.leadsUrl);
  }
  getActiveLeads(): Observable<LeadList[]> {
    return this.http.get<LeadList[]>(this.leadsUrl+'/encours');
  }
  getAffaires4Calandae(): Observable<LeadFull[]> {
    return this.http.get<LeadFull[]>(this.leadsUrl+'/calandar');
  } 
   getArchivedLeads(): Observable<LeadList[]> {
    return this.http.get<LeadList[]>(this.leadsUrl+'/archivee');
  }
  searchLeads(lead: LeadList): Observable<LeadList[]> {
    const searchUrl = this.leadsUrl + "/search"
    return this.http.post<LeadList[]>(searchUrl, lead)
  }

  addLead(lead: LeadFull): Observable<LeadFull> {
    return this.http.post<LeadFull>(this.leadsUrl, lead);

    if (lead.leadID == null) {
      console.log("Adding a lead...")
      return this.http.post<LeadFull>(this.leadsUrl, lead);
    }
    else {
      console.log("Updating a lead...")
      return this.http.put<LeadFull>(this.leadsUrl + '/' + lead.leadID, lead);
    }

  }
 addIntervenats(id:Number,intervenant:any){
  return this.http.post(this.leadsUrl+ '/' +id+'/intervenant', intervenant);
 }
 getIntervenants(idAffaire:Number):Observable<Intervenant[]>{
  return this.http.get<Intervenant[]>(this.leadsUrl+ '/' +idAffaire+'/intervenant');
 }
  addProductLead(leadID: Number, productCell: Produit): Observable<Produit> {
    const addProductUrl = this.leadsUrl + "/" + leadID + "/products"
    return this.http.post<Produit>(addProductUrl, productCell)
  }
  addLeadSurvey(leadID: Number, survey: NoteRow): Observable<NoteRow> {
    const addSurveyUrl = this.leadsUrl + "/" + leadID + "/surveys"
    if (survey.surveyID == null) {
      console.log("Adding a survey...")
      return this.http.post<NoteRow>(addSurveyUrl, survey)
    }
    else {
      console.log("Updating a lead...")
      return this.http.put<NoteRow>(addSurveyUrl, survey);
    }
  }

  getLeadActions(id): Observable<ActionModel[]> {
    const url = this.leadsUrl + '/' + id + "/actions"
    return (this.http.get<ActionModel[]>(url))
  }

  getLeadProducts(id): Observable<Produit[]> {
    const url = this.leadsUrl + '/' + id + "/products"
    console.log(url)
    return (this.http.get<Produit[]>(url))
  }


  getLeadSurveys(id): Observable<NoteRow[]> {
    const url = this.leadsUrl + '/' + id + "/surveys"
    console.log(url)
    return (this.http.get<NoteRow[]>(url))
  }

  getByAttribute(attribute: string, value: string) {
    const url = `${this.leadsUrl}?param=${attribute}&value=${value}`;
    return this.http.get<LeadRow[]>(url);
  }

  updateLeadStep(leadID, step) {
    const updateStepUrl = this.leadsUrl + '/' + leadID + "/step"
    return this.http.patch(updateStepUrl, step)
  }
}
