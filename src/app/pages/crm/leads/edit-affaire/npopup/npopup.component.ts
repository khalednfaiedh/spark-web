import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NoteRow } from '../../../entities/row/NoteRow';
import { Planning } from '../../../planning/planning';
import { LeadService } from '../../../services/lead.service';
import { SurveyService } from '../../../services/survey.service';

@Component({
  selector: 'ngx-npopup',
  templateUrl: './npopup.component.html',
  styleUrls: ['./npopup.component.scss']
})
export class NpopupComponent {
  btn :String
  disabled : boolean
  note: NoteRow
  idAffaire : number
  constructor( protected router: Router,
    protected windowRef:NbWindowRef, 
    protected leadService: LeadService,
     @Inject(NB_WINDOW_CONTEXT) context) {
    this.idAffaire = context.idAffaire
    this.disabled = context.disabled
   if (context.note) {
    this.note = context.planning
    this.btn = 'Modifier'
   }else {
     this.note = new NoteRow()
     this.btn='Ajouter'}
   }
   
 add(){
  this.leadService.addLeadSurvey(this.idAffaire,this.note).subscribe(
    res => {
      this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(["/pages/crm/affaire//edit",this.idAffaire]));
    this.windowRef.close();
    },
    error =>{console.log('error',error);}
  )
 }

close(){
this.windowRef.close();
}
}
