import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { addDays } from 'date-fns';
import { Action } from 'rxjs/internal/scheduler/Action';
import { UserCell } from '../../../entities/cell/UserCell';
import { Intervenant } from '../../../entities/full/Intervenant';
import { TostarService } from '../../../planning/tostar.service';
import { ActionService } from '../../../services/action.service';
import { ActionStatusService } from '../../../services/actionstatus.service';
import { ActionTypeService } from '../../../services/actiontype.service';
import { LeadService } from '../../../services/lead.service';
import { UserService } from '../../../services/user.service';
import { ActionModel, ActionTypes, ActionStatus } from './action'

@Component({
  selector: 'ngx-apopup',
  templateUrl: './apopup.component.html',
  styleUrls: ['./apopup.component.scss']
})
export class ApopupComponent implements OnInit {
  Hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "01", "02", "03", "04", "05", "06", "07"]
  minutes = ["00","05","10", "15","20" ,"25","30","35","40", "45","50","55"]
  selectedHour:any = "09"; selectedMinute :any= "00"; btn: string = 'Ajouter'
  action: ActionModel = new ActionModel();idAffaire: number;disabled: boolean;
  types: ActionTypes[];status: ActionStatus[];intervenants: Intervenant[];

  constructor(
    protected affaireService: LeadService,
    protected actionTypeService: ActionTypeService,
    protected actionStatusService: ActionStatusService,
    protected userService: UserService,
    protected actionService : ActionService,
    protected tosterService: TostarService,
    protected router : Router,
    protected windowRef: NbWindowRef,
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.idAffaire = context.idAffaire
      this.disabled = context.disabled
      if (context.action) {
       this.action = context.action
       this.action.actionDateCreation = new Date(context.action.actionDateCreation)
       this.action.actionDateLimite = new Date(this.action.actionDateLimite)
       this.selectedHour = this.action.actionDateLimite.getHours()
       this.selectedMinute = this.action.actionDateLimite.getMinutes()

       this.btn = 'Modifier'
      }else{
        this.action.responsable =this.userService.getCurrentUserCell().userName
        this.action.actionStatus = new ActionStatus()
        this.action.actionType = new ActionTypes()
        this.action.actionDateCreation = new Date()
        this.action.actionDateLimite = new Date() 
        // demain
       // this.action.actionDateLimite = addDays(new Date(), 1) 
      }
   }

  ngOnInit() {
    this.actionTypeService.getActionTypesTable().subscribe(
      data => {
        this.types = data;
        if(this.btn === 'Ajouter'){
        this.action.actionType = this.types[0];
        this.action.actioncost = this.types[0].typeCost;
        this.action.actionduration = this.types[0].typeDuration
        }
      },
      error => {
        console.log("ERROR")
      }
    )
    this.actionStatusService.getActionStatusTable().subscribe(
      data => {
        this.status = data;
        if(this.btn === 'Ajouter'){
           this.action.actionStatus = this.status[0]}
      },
      error => {
        console.log("ERROR")
      }
    )
    this.affaireService.getIntervenants(this.idAffaire).subscribe(
      data => {this.intervenants = data},
      error=>{console.log('error get intervenants',error)}
 )
  }
  changeAction(TYPE) {
    this.action.actioncost = TYPE.typeCost;
    this.action.actionduration = TYPE.typeDuration
  }
  addAction() {
    this.action.actionDateLimite.setHours(+this.selectedHour, +this.selectedMinute)
    this.action.leadID = this.idAffaire
    console.log(this.action)
    this.actionService.postAction(this.action).subscribe(
      data =>{console.log(data)
        this.tosterService.showToast(NbToastStatus.SUCCESS, "Success", "Action ajouter");
        this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/pages/crm/affaire/edit",this.idAffaire]));
      this.windowRef.close();},
      error => {console.log("post error",error)}
    )
  }

}
