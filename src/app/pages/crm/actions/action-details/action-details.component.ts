import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ActionStatus } from '../../entities/cell/ActionStatus';
import { LeadCell } from '../../entities/cell/LeadCell';
import { UserCell } from '../../entities/cell/UserCell';
import { ActionFull } from '../../entities/full/ActionFull';
import { ActionRow } from '../../entities/row/ActionRow';
import { ActiontypeRow } from '../../entities/row/ActionTypeRow';
import { ActionService } from '../../services/action.service';
import { ActionStatusService } from '../../services/actionstatus.service';
import { ActionTypeService } from '../../services/actiontype.service';
import { LeadService } from '../../services/lead.service';
import { LeadStepService } from '../../services/leadStep.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss']
})
export class ActionDetailsComponent implements OnInit {


  action: ActionFull = new ActionFull();
  actionRow: ActionRow;
  valider = "Ajouter";
  startDate: Date;
  endDate: Date;
  timepicked: string;
  startTime = { hours: "08", minutes: "00" }
  Hours = ["08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, "00", "01", "02", "03", "04", "05", "06", "07"]
  minutes = ["00", 15, 30, 45]
  times = []
  placeholdervar;
  stupidDate: string;
  selectedHour; selectedMinute
  numbers = new RegExp(/^[0-9]+$/);
  constructor(
    @Inject(NB_WINDOW_CONTEXT) context,
    private actionService: ActionService,
    private actionStatusService: ActionStatusService,
    private userService: UserService,
    private leadService: LeadService,
    private leadStepService: LeadStepService,
    private actionTypeService: ActionTypeService,
    private toastrService: NbToastrService,
    private router: Router,
    private windowRef: NbWindowRef,

  ) {
    this.actionRow = context.text
    this.action.lead = new LeadCell()
    this.selectedHour = this.startTime.hours
    this.selectedMinute = this.startTime.minutes
    //this.action.actionDateCreation=new Date()
    //this.stupidDate=format( this.action.actionDateCreation,'DD/MM/YYYY')
    this.Hours.forEach(hour => {
      this.minutes.forEach(minute => {
        let minuteZero = ""; let hourZero = "";
        if (hour < 10) hourZero = "0"
        if (minute < 10) minuteZero = "0"
        this.times.push({
          hourZero: hourZero,
          hours: hour,
          minuteZero: minuteZero,
          minutes: minute
        })
      })
    })
    this.actionStatusService.getActionStatusTable().subscribe(
      data => {
        this.status = data;
        this.action.actionStatus = this.status[0]
      },
      error => {
        console.log("ActionType get mistake")
      }
    )
  }
  types: ActiontypeRow[]
  leads: LeadCell[]
  status: ActionStatus[]
  user: UserCell;
  // users:UserCell[]
  ngOnInit() {
    this.action.actionduration = 0
    this.action.actioncost = 0
    this.action.lead = new LeadCell()
    this.action.actionStatus = new ActionStatus()
    this.action.actionType = new ActiontypeRow()
    this.action.lead = new LeadCell()

    this.actionTypeService.getActionTypesTable().subscribe(
      data => {
        this.types = data;
        this.action.actionType.typeID = this.types[0].typeID; this.action.actionType.typeName = this.types[0].typeName;

      },
      error => {
        console.log("ActionType get mistake")
      }
    )
    this.user = this.userService.getCurrentUserCell()
    this.action.user = this.user

    this.leadService.getLeadCells().subscribe(
      data => {
        this.leads = data;
        let topSteps = []
        this.leadStepService.getSteps().subscribe(data => {
          const maxStep = Math.max(...data.map(o => o.stepOrder), 0);
          topSteps = data.filter(x => x.stepOrder == maxStep)
          topSteps.forEach(step => {
            this.leads = this.leads.filter(x => (x.leadStep != null)).filter(x => x.leadStep.stepName != step.stepName)


          })
        },
          error => {

          })

        this.action.lead = new LeadCell()
      },
      error => { console.log("error"); });



    this.actionService.getAction(this.actionRow.actionID).subscribe(
      data => {

        this.action = data;
        this.action.actionDateLimite = new Date(this.action.actionDateLimite)

        this.action.user = this.user
        this.selectedHour = this.startTime.hours
        this.selectedMinute = this.startTime.minutes

      })
  }
}


