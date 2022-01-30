import { Component, OnInit, Inject } from '@angular/core';
import { format, addHours, addMinutes, addDays, isAfter } from 'date-fns';
import { ActionFull } from '../../entities/full/ActionFull';
import { formatDate } from '@angular/common';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ActionRow } from '../../entities/row/ActionRow';
import { ActionService } from '../../services/action.service';
import { UserCell } from '../../entities/cell/UserCell';
import { UserService } from '../../services/user.service';
import { LeadService } from '../../services/lead.service';
import { LeadCell } from '../../entities/cell/LeadCell';
import { LeadStepCell } from '../../entities/cell/leadStepCell';
import { LeadStepService } from '../../services/leadStep.service';
import { ActionTypeService } from '../../services/actiontype.service';;
import { ActiontypeRow } from '../../entities/row/ActionTypeRow';
import { ActionStatusService } from '../../services/actionstatus.service';
import { ActionStatus } from '../../entities/cell/ActionStatus';
import { Router } from '@angular/router';
import {
  NbToastrService,
  NbGlobalPhysicalPosition,
  NbWindowRef
} from "@nebular/theme";

import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { ToasterConfig } from "angular2-toaster";

@Component({
  selector: 'ngx-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {
  //TODO
  //fix user missing in add done
  //fix date display  done
  //add new Date() everywhere theres date done
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
    //you're not gonna be selectingusers right its always gonna be just an action for yourself yes?
    /*     this.userService.getUsersCells().subscribe(
          data => {
            this.users = data;
          },
          error => {
            console.log("error getting users list");
          }
        ); */
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
        // this.leads=this.leads.filter(x=>(x.leadStep!=null) ).filter(x=>x.leadStep.stepName!="Won" && x.leadStep.stepName!="Lost")

        // this.leads=this.leads.filter(x=>(x.leadStep!=null) ).filter(x=>x.leadStep.stepName!="Won" && x.leadStep.stepName!="Lost")
        //    console.log("in progress leads",this.leads)
        this.action.lead = new LeadCell()
      },
      error => { console.log("error"); });

    if (this.actionRow != null) {
      console.log("edit");

      this.actionService.getAction(this.actionRow.actionID).subscribe(
        data => {
          // console.log("received data",data)
          //name type status comment DateCreation deadline time lead user
          this.valider = "Modifier";
          this.action.actionID = data.actionID;
          this.action.actionName = data.actionName;
          this.action.actionComment = data.actionComment;
          this.action.actionDateCreation = data.actionDateCreation;
          this.action.actionDateLimite = new Date(this.action.actionDateLimite)
          this.action.actionDateLimite = data.actionDateLimite;
          this.action.user = this.user
          if (data.actionStatus != null) {
            this.action.actionStatus = data.actionStatus;
            console.log("i'm getting here right?", this.action.actionStatus.statusID)
          }
          else this.action.actionStatus = this.status[0]
          if (data.actionType != null)
            this.action.actionType = data.actionType;
          else { this.action.actionType.typeID = this.types[0].typeID; this.action.actionType.typeName = this.types[0].typeName; }
          if (data.lead != null) { this.action.lead = new LeadCell(); this.action.lead = data.lead; this.action.lead.leadID = data.lead.leadID }
          else { this.action.lead = new LeadCell(); this.action.lead = this.leads[0]; this.action.lead.leadName = this.leads[0].leadName }

          this.selectedHour = new Date(this.action.actionDateLimite).toTimeString().substring(0, 2)
          this.selectedMinute = new Date(this.action.actionDateLimite).toTimeString().substring(3, 5)
          console.log("the hours", this.selectedHour, "the minutes", this.selectedMinute)
          console.log("the date,", new Date(this.action.actionDateLimite).toTimeString())
        },
        error => { console.log("hello ") }
      )
    } else {
      console.log("add");
     // this.action.actionName = "Action#"+this.action.actionType.typeName
     
      this.action.actionDateCreation = new Date()
      this.action.actionDateLimite = addDays(new Date(), 1)
      this.action.lead = new LeadCell()

      this.action.user = this.user
      this.selectedHour = this.startTime.hours
      this.selectedMinute = this.startTime.minutes

    }
  }

  addAction() {
    if (((this.numbers.test(this.action.actioncost.toString())) && this.numbers.test(this.action.actionduration.toString()))) {
      this.action.lead = this.leads.find(x => x.leadID == this.action.lead.leadID)
      this.action.actionStatus = this.status.find(x => x.statusID == this.action.actionStatus.statusID)

      this.action.actionDateLimite = new Date(this.action.actionDateLimite)
      this.action.actionDateLimite.setHours(this.selectedHour, this.selectedMinute)

      console.log("initial date at", this.action.actionDateLimite)
      if (isAfter(this.action.actionDateCreation, this.action.actionDateLimite))
        this.showToast(NbToastStatus.WARNING, "Attention", "Date Deadline invalide");
      this.actionService.addAction(this.action).subscribe(
        data => {
          console.log("this be the new action", data)
          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/actions"]));
          this.showToast(NbToastStatus.SUCCESS, "Success", "Action Ajouté");
          this.windowRef.close();
        },
        error => {
          console.log("this be an error", error)
          this.showToast(NbToastStatus.DANGER, "Erreur", "Impossible d'ajouter l'action");
        }
      )
      console.log("finished action", this.action)
    }
    else
      this.showToast(NbToastStatus.DANGER, "Erreur", "Progres/Valeur Invalide");
  }


  config: ToasterConfig;
  index = 1;
  stat: NbToastStatus.SUCCESS;
  title = "Succès d'enregistrement";
  content = `Action Ajouté`;
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  showToastr(status, title, content) {
    this.showToast(NbToastStatus.SUCCESS, this.title, this.content);
  }
}
