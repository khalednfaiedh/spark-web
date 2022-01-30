import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionRow } from '../entities/row/ActionRow';
import { ActionService } from '../services/action.service';
import { ActionTypeCell } from '../entities/cell/ActionTypeCell';
import { ActiontypeRow } from '../entities/row/ActionTypeRow';
import { ActionTypeService } from '../services/actiontype.service';
import { subDays, differenceInDays, differenceInMonths, format } from 'date-fns';
import { ActionStatus } from '../entities/cell/ActionStatus';
import { ActionStatusService } from '../services/actionstatus.service';
import { NbWindowService } from '@nebular/theme';
import { ConfirmDeleteActionComponent } from './confirm-delete-action/confirm-delete-action.component';
import { AddActionComponent } from './add-action/add-action.component';
import { ActionDetailsComponent } from './action-details/action-details.component';
import { LeadCell } from '../entities/cell/LeadCell';
import { LeadService } from '../services/lead.service';
import { UserService } from '../services/user.service';
    
import {  ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { ActionFull } from '../entities/full/ActionFull';
import { LeadStepService } from '../services/leadStep.service';



@Component({
  selector: 'ngx-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  selectedLeadID;
  currentView:Number=1
  viewKan:boolean=false;
  viewCal:boolean=false;
  viewTab:boolean=true;
  divided_actions=[];
  connectedTo=[];
  source:ActionRow[];
  types:ActiontypeRow[];
  status:ActionStatus[]=[];
  leads:LeadCell[]=[];
   test:String
   quickAction:ActionFull;
   Hours:number[]=[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7]
   minutes:number[]=[0,15,30,45]
   times=[]
  constructor(private leadStepService:LeadStepService,
              private windowService:NbWindowService,
              private actionService:ActionService,
              private actionTypeService:ActionTypeService,
              private actionStatusService:ActionStatusService,
              private leadService:LeadService,
              private userService:UserService,
    ) {

      this.actionTypeService.getActionTypesTable().subscribe(
        data=>{
        this.types=data;
       /*  if(this.types.length!=0)
        this.quickAction.actionType=this.types[0]
        else this.quickAction.actionType.typeName="ERROR" */
        let temptypes=[]
        console.log("type data",data)
        console.log("types",this.types) 
        data.forEach(typePrime=>{
         temptypes.push({value: typePrime.typeName, title: typePrime.typeName})
        })
       
        // this.actionSettings.columns.actionType.filter.config.list=temptypes
        // this.actionSettings.columns.actionType.editor.config.list=temptypes

        this.actionSettings = Object.assign({}, this.actionSettings)
        console.log(this.actionSettings)
      },
      error=>{
        console.log("ActionType get mistake")
      }
      )
      this.leadService.getLeadCells().subscribe(
        data => { this.leads=data;
  
          //remember to add a way to sort out the won/lost deals that isnt dependant on their name  later 
          //maybe add a type attribute to determine if its a starting/in between/finishing step???
        // this.leads=this.leads.filter(x=>(x.leadStep!=null) ).filter(x=>x.leadStep.stepName!="Won" && x.leadStep.stepName!="Lost") 
        let topSteps=[]
        
        //remember to add a way to sort out the won/lost deals that isnt dependant on their name  later 
        //maybe add a type attribute to determine if its a starting/in between/finishing step???
        this.leadStepService.getSteps().subscribe(data=>{
          const maxStep = Math.max(...data.map(o => o.stepOrder), 0);
            topSteps=data.filter(x=>x.stepOrder==maxStep)
            topSteps.forEach(step=>{
              this.leads=this.leads.filter(x=>(x.leadStep!=null) ).filter(x=>x.leadStep.stepName!=step.stepName)
              this.actionSettings.columns.lead.editor.config.completer.data=this.leads
              this.actionSettings = Object.assign({}, this.actionSettings)

            })
        },
        error=>{

        })
       
        },
      error => { 
        console.log("error");
     }
     ); 
  
/*       this.actionStatusService.getActionStatusTable().subscribe( data=>{this.status=data;console.log("im doig it man dont get mad,see?",this.status)},
      error=>{ console.log("cant get those steps yo ")}) */
      this.Hours.forEach(hour=>{
        this.minutes.forEach(minute=>{
          let minuteZero="";let hourZero="";
          if(hour<10) hourZero="0"
          if(minute<10) minuteZero="0"
          this.times.push({
                            hourZero:hourZero,
                            hours:hour,
                            minuteZero:minuteZero,
                            minutes:minute})
        })
      })
  
     }
    testButton(){
      this.test=this.test.concat("+1")
    }
  ngOnInit() {
    this.quickAction=new ActionFull()
   
    this.actionService.getActionsTable().subscribe(
      data=>{
      this.source=data;
   //   console.log("data",data)
    //  console.log("source",this.source)
    },
    error=>{
      console.log("Action get mistake")
    }
    )
    this.actionStatusService.getActionStatusTable().subscribe( data=>{this.status=data;console.log("im doig it man dont get mad,see?",this.status)},
    error=>{ console.log("cant get those statuses yo ")})
  }
  searchActions(event){
    console.log("on the receiving end");
    console.log(event)
   /*  this.actionService.searchActions(event).subscribe( data=>{

      let searchResult=data;
      console.log(searchResult)
    //  this.datasource3=new LocalDataSource(searchResult);
    },
    error=>{ console.log("this is a mistake")}
    ) */
    let el = document.getElementById("table");
    el.scrollIntoView({behavior:"smooth"});

  }
 
  switchViews(view:Number){
    if (view==1){
   this.viewCal=false;
   this.viewTab=true;
   this.viewKan=false;
 
 }
   else if (view==2){
     this.viewCal=false;
     this.viewTab=false;
     this.viewKan=true;
     this.divided_actions=[]
     this.connectedTo=[]
     this.actionStatusService.getActionStatusTable().subscribe( data=>{this.status=data;console.log("im doig it man dont get mad,see?",this.status)},
     error=>{ console.log("cant get those steps yo ")})
      this.actionService.getActionsTable().subscribe( data => { this.source=data;console.log("yeah man me too look!",this.source)},
      error => { console.log("error"); }); 
//if ((this.connectedTo.length==0) || (this.divided_leads.length==0)){
    this.divided_actions=[]
    this.connectedTo=[]
console.log("cant see me outside though",this.status)
for(let i=0;i<this.status.length;i++){
console.log("push darling push")
this.divided_actions.push({
id:this.status[i].statusName,
stepID:this.status[i].statusID,
actions:this.source.filter(x=>x.actionStatus!=null).filter(x=>x.actionStatus.statusID==this.status[i].statusID)
})
}

for (let divider of this.divided_actions) {
this.connectedTo.push(divider.id);
};         

console.log("divided actions",this.divided_actions)
console.log("connected To",this.connectedTo)

   }
   else if (view==3){
     this.viewCal=true;
     this.viewTab=false;
     this.viewKan=false;
   }
   this.currentView=view;
  }
  hiddenadd:boolean=false
  openAddWindow(event){
    this.windowService.open(AddActionComponent, {title: 'Ajouter Action'});
  }placeholdervar;
   openDetailsWindow(event){
    this.windowService.open(ActionDetailsComponent, {title: 'Details Action', context: { text: event.data}});

  }

  openEditWindow(event){
    this.windowService.open(AddActionComponent, {title: 'Modifier Action', context: { text: event.data}});


  }

  confirmDelete(event){
    this.windowService.open(ConfirmDeleteActionComponent, {title: 'Confirmer Suppression', context: { text: event.data}});
  }
 create(event){
    console.log("do you open the thing?")
    event.newData.user=this.userService.getCurrentUserCell()
    console.log(event)
    //  this.windowService.open(AddActionComponent, {title: 'Ajouter Action'});
  }
addQuickAction(event){

  console.log("super fast adding");
  this.quickAction.user=this.userService.getCurrentUserCell()
  this.quickAction.actionName= event.newData.actionName
  this.quickAction.actionDateCreation=new Date()
  this.quickAction.actionDateLimite=event.newData.actionDateLimite
  this.quickAction.actionStatus=this.status.find(x=>x.statusPosition==1)
  this.quickAction.actionType=this.types.find(x=>x.typeName==event.newData.actionType)
  this.quickAction.lead=this.leads.find(x=>x.leadName==event.newData.lead)

  console.log(this.quickAction)
  this.actionService.addAction(this.quickAction).subscribe(
    data=>{
          //temporary control 
        if(data.actionName==this.quickAction.actionName)
         //   this.showToastr
       event.confirm.resolve()
    },
    error=>{
      console.log("this be an error",error)

    })

  
 
}
onCustom(event){
  if(event.action=="showAction")
          this.openDetailsWindow(event)
        console.log("hello show action")
  if(event.action=="editAction")
       this.openEditWindow(event)
        console.log("hello edit action")
  if(event.action=="deleteAction")
      this.confirmDelete(event)
      console.log("hello delete action")
}
  actionSettings={
    mode:"inline",
    actions:{
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Consulter" i18n="@@consulter"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Editer" i18n="@@editer"></i>',
          confirm:true
        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash" title="Supprimer" i18n="@@supprimer"></i>',
        }
      ],
        add:false,
        edit: false,
        delete: false,
   
     },
     
    columns: {

      actionType: {
        title: 'Action',
        type: 'list',
        valuePrepareFunction(cell,row){
      if (typeof cell === 'string')
          return cell
      if (cell !=null)
          return cell.typeName
         else return("++")
        },
        filterFunction(cell: any, search: string): boolean {
    
          if(cell.typeName===search)
             return true
           else return false
         },
        // filter:{ type: 'list',
        // config: {
        // selectText: 'Type',
        // list: this.types, 
        // },
        // } ,
        // editor: { 
        //   type: 'list',
        //   config: {
        //      selectText: 'Hello',
        //      list:this.types,//[ {value:1,title:"one"},{value:2,title:"two"},{value:3,title:"three"}],   
        //   },
        // },
        },
    actionDateLimite:{
    title: 'Deadline',
    type: 'Date',
    editor :{
      type: 'custom',
      component:ButtonViewConsignationComponent,
      },
   
    valuePrepareFunction(cell,row){
      let d =new Date(cell)
      return format(d,"DD MMM YYYY")+" |  "+d.toTimeString().substring(0,5)
      },
    
    },
    lead:{
      title:"Affaire",
      type:'text',
      editor: {
        type: 'completer',
        config: {
          completer: {              
            data: this.leads,            
            searchFields: 'leadName',
            titleField: 'leadName'
          },
        },
      },
      valuePrepareFunction(cell,row){
     //   console.log("the row",row)
        if (typeof cell === 'string')
          return cell
        if (cell!=null)
        return cell.leadName
     
          
        else return ("--")
       },
       filterFunction(cell: any, search: string): boolean {
         if (cell!=null)
           return (cell.leadName.includes(search))

         else return(true)
       }
    },
    user:{
      title:"Responsable",
      type:'string',
      editable:false,
      addable:false,
      defaultValue: this.userService.getCurrentUserCell().userName,
      editor:{
          config:{
      }},
      valuePrepareFunction(cell,row){
        if (typeof cell === 'string')
        return cell
        if (cell!=null)
        return cell.userName
        else return("**")
      },
      filterFunction(cell: any, search: string): boolean {

        if (cell=="")  {return false}
        else if (cell.userName!=null)
          { return (cell.userName.includes(search)) }
       
        else {return(true) }
      }
    }
    },
    }
}

@Component({
  selector: 'ngx-button-view',
  
  template: `
  Date: <input [ngClass]="inputClass"
  #date
  class="form-control short-input"
  [(ngModel)]="testDate"
  [name]="cell.getId()"
  [disabled]="!cell.isEditable()"
  [placeholder]="cell.getTitle()"
  [nbDatepicker]="sdatepicker" 
  (click)="onClick.emit($event)"
  (focus)="updateValue()"
  >

  <nb-datepicker #sdatepicker
  
  ></nb-datepicker>
  <br>
Temps: <nb-select outline=true 
name="time" 
[(ngModel)]="startTime" 
#time
[placeholder]="cell.getTitle()"
[name]="cell.getId()"
[disabled]="!cell.isEditable()"
(blur)="onClick.emit($event)"

status="info"  required>
<nb-option *ngFor="let time of times" [value]="{hours:time.hours,minutes:time.minutes}" 

(click)="updateValue()"
i18n="money">
  {{time.hours}}:{{time.minutes}}
</nb-option>
</nb-select> 
<div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>


`,
 })
export class ButtonViewConsignationComponent extends DefaultEditor implements AfterViewInit{
  @ViewChild('date') date: ElementRef;
  @ViewChild('time') time: ElementRef;
  @ViewChild('htmlValue') htmlValue: ElementRef;
  testDate;
  startTime={ hours:'08', minutes:'00'}
  Hours=['08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,'00','01','02','03','04','05','06','07']
  minutes=['00',15,30,45]
  times=[]
  constructor() {
    super();
    this.testDate=new Date()
    this.Hours.forEach(hour=>{
      this.minutes.forEach(minute=>{
        this.times.push({ hours:hour, minutes:minute})
      })
    })
    console.log("i'm assuming we get here ")
  }

  ngAfterViewInit() {
    console.log("so we're not getting here?")
    if (this.cell.newValue !== '') {
      this.date.nativeElement.value = this.getDate();
      this.time.nativeElement.value = this.getTime();
      console.log("do we even go after view?")
      console.log(this.testDate)
    }
    else console.log("here maybe? ")
  }

  updateValue() { 
    console.log("hello we updating")
    const date = this.date.nativeElement.value;
    const time = this.time.nativeElement;
    console.log("date",date)
    console.log("time",time)

    console.log("ng model time",this.testDate)
    console.log("ng model date ",this.startTime)
    this.testDate.setHours(this.startTime.hours,this.startTime.minutes)    
    this.cell.newValue =this.testDate;
  }

  getDate(): string {
    return this.htmlValue.nativeElement.innerText;
  }

  getTime(): string {
    return this.htmlValue.nativeElement.value;
  }
 }
