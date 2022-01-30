import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

import { LeadService } from '../services/lead.service';
import { LeadRow } from '../entities/row/LeadRow';
import { addDays, subYears, differenceInYears, differenceInMonths, subMonths, differenceInDays, format } from 'date-fns';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { LeadList } from '../entities/row/LeadList';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { Router } from '@angular/router';
import { LeadStepService } from '../services/leadStep.service';
import { LeadStepCell } from '../entities/cell/leadStepCell';
import { EditAffaireComponent } from './edit-affaire/edit-affaire.component';
import { DetailsAffaireComponent } from './details-affaire/details-affaire.component';
// @Component({
//   selector: 'ngx-button-edit-affaire',
//   template:
//     '<div class="button-container">\n' +
//     '      <button (click)="onClick()" nbButton size="small" status="info" type="submit"><i class="nb-gear"></i> </button> \n'+ 
//     '    </div>',
// })
// export class ButtonEditAffaire implements ViewCell, OnInit {
//   renderValue: string;

//   @Input() value: string | number;
//   @Input() rowData: any;

//   @Output() save: EventEmitter<any> = new EventEmitter();
  
//   ngOnInit() {
//     this.renderValue = this.value.toString().toUpperCase();
//   }
//   constructor(private router: Router) {
//   }
//   onClick() {
//     localStorage.setItem('idAffaire', this.rowData.leadID);
//    this.router.navigate(['/pages/crm/affaire/edit']);
//   }
// }


@Component({
  selector: 'ngx-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  //@Output() dealToBeDeleted= new EventEmitter();
  currentView:Number=1
  viewKan:boolean=false;
  viewCal:boolean=false;
  viewTab:boolean=true;
  datasource3:LocalDataSource; datasource4:LocalDataSource;
  status:string[]=['Dénomination','Chiffre d\'affaires estimé','Responsable','Durée','Etape','Etat',];
  d:Date=new Date(2010,4,31);
  source2:LeadRow[] = Array.from<LeadRow>({length: 100}).map<LeadRow>((_, i) => new LeadRow( new Date(Math.round(Math.random()*3)*10,
                                                                                                       Math.round(Math.random()*11),
                                                                                                       Math.round(Math.random()*28)),
                                                                                              i+1,
                                                                                            `Lead #${i+1}`,
                                                                                              Math.round((i+1)*Math.random()*500),
                                                                                              Math.round(Math.random()*100),
                                                                                              this.status[Math.round(Math.random()*4)]),
                                                                                              );
  source:LocalDataSource= new LocalDataSource(this.source2);
  source3:LeadList[];source4:LeadList[];
  result:LeadRow[] ;
  typePrimes=[];
divided_leads=[]
connectedTo=[]
  steps:LeadStepCell[]=[]
  constructor(
    private windowService:NbWindowService,
    private leadService:LeadService, 
    private leadStepService:LeadStepService,
    private router:Router ) {
    
    }

  ngOnInit() {
    this.viewKan=false;
  this.viewCal=false;
  this.viewTab=true;

    this.leadStepService.getSteps().subscribe(
        data=>{
          this.steps=data
          data.forEach(typePrime=>{
            this.typePrimes.push({value: typePrime.stepID, title: typePrime.stepName})
          })
         // this.leadSettings.columns.leadStatus.filter.config.list=this.typePrimes;
       //   this.leadSettings.columns.leadStatus.editor.config.list=this.typePrimes;
          this.leadSettings = Object.assign({}, this.leadSettings)
        },
        error=>{
          console.log("cant get those steps yo ")
        }
    
    )
    this.leadService.getActiveLeads().subscribe(
      data => { this.source3=data;console.log(this.source3);
       /*  data.forEach(typePrime => {
          this.typePrimes.push({value: typePrime.leadID, title: typePrime.leadName});
       this.leadSettings.columns.status.filter.config.list=this.typePrimes;
          this.leadSettings.columns.status.editor.config.list=this.typePrimes;
          this.leadSettings = Object.assign({}, this.leadSettings)  */
          this.datasource3=new LocalDataSource(this.source3)
      },
    error => { console.log("error"); }); 
    this.leadService.getArchivedLeads().subscribe(
      data => { this.source4=data;console.log(this.source4);
          this.datasource4=new LocalDataSource(this.source4)
      },
    error => { console.log("error"); });
  }

  searchLeads(event:LeadList){
    console.log("on the receiving end");
    console.log(event)
    this.leadService.searchLeads(event).subscribe( data=>{

      let searchResult=data;
      console.log(searchResult)
      if(searchResult!= null)
      this.datasource3=new LocalDataSource(searchResult);

    },
    error=>{ console.log("Couldnt get search Results ",error)}
    )
    let el = document.getElementById("table");
    el.scrollIntoView({behavior:"smooth"});
   }


  switchViews(view:Number){
    
/*     this.leadStepService.getSteps().subscribe( data=>{this.steps=data;console.log("im doig it man dont get mad")},
    error=>{ console.log("cant get those steps yo ")})
this.leadService.getLeadsTable().subscribe( data => { this.source3=data;console.log("yeah man me too")},
     error => { console.log("error"); });  */
    if (view==1){
   this.viewCal=false;
   this.viewTab=true;
   this.viewKan=false;
   this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
   this.router.navigate(["/pages/crm/affaire"]));
 
 }
   else if (view==2){
     this.viewCal=false;
     this.viewTab=false;
     this.viewKan=true;

     //if ((this.connectedTo.length==0) || (this.divided_leads.length==0)){
     this.divided_leads=[]
     this.connectedTo=[]

     for(let i=0;i<this.steps.length;i++){
      console.log("push darling push")
      this.divided_leads.push({
          id:this.steps[i].stepName,
          stepID:this.steps[i].stepID,
          leads:this.source3.filter(x=>x.leadStep!=null).filter(x=>x.leadStep.stepID==this.steps[i].stepID)
      })
    }
    
      for (let divider of this.divided_leads) {
         this.connectedTo.push(divider.id);
      };         
   //}
    console.log("why are you like this?",this.divided_leads)

   }
   else if (view==3){
     this.viewCal=true;
     this.viewTab=false;
     this.viewKan=false;
   }
   this.currentView=view;
  }


  openAddWindow(event) { 
       this.windowService.open(AddLeadComponent, {title: 'Ajouter une nouvelle affaire'});
    // this.switchViews(this.currentView)
    }

 

  confirmDelete(event){
    this.windowService.open(ConfirmDeleteComponent, {
      title: 'Clôturer affaire', context: { 
        idAffaire: event.data.leadID}}); 
  }
   closeWindow(event){
        this.source2= Array.from<LeadRow>({length: 10}).map<LeadRow>((_, i) => new LeadRow(this.d,i+1,`Lead #${i+1}`,Math.round((i+1)*Math.random()*500),Math.round(Math.random()*100),this.status[Math.round(Math.random()*3)]),new Date(24,7,2018));
        this.source=new LocalDataSource(this.source2)
      //this.source.refresh() 
   }

   deletePermission(s){

    console.log('zero');
    console.log(s[0])
    /* if ((s[0])&(s[1])) {
      this.leadService.getByAttribute(s[0],s[1]).subscribe(result => {
        this.result = result;
      });
      this.source=new LocalDataSource(this.result)
    }
    else this.source=new LocalDataSource(this.source2) */
    
    if (s[0]) { 
      if (s[1]) { 
        if (s[1]==="")  {console.log('forth');this.source=new LocalDataSource(this.source2); }
        else if (s[0]==="Value")
         { this.source=new LocalDataSource(this.source2.filter(p=> p.value!<=s[1]));}
        else if (s[0]==="Progress")
         { console.log('second');this.source=new LocalDataSource(this.source2.filter(p=> p.progress!<=s[1]));}
         else if (s[0]==="Duration")
         { console.log('third');this.source=new LocalDataSource(this.source2.filter(p=> p.DateCreated!<=s[1]));}
        }
        else { 
          console.log('fourth');this.source=new LocalDataSource(this.source2);
    }

    }
    
    console.log(s[1]);
   }
   
   getDuration(start:Date,finish:Date){
      const result = [];
      const years = differenceInYears(finish, start);
      if (years > 0) {
        if(years===1) result.push(`${years} year`);
          else result.push(`${years} years`);
        finish = subYears(finish, years);
      }
      
      const months = differenceInMonths(finish, start);
      if (months > 0) {
        if(months===1) result.push(`${months} month`)
        else result.push(`${months} months`);
        finish = subMonths(finish, months);
      }
      
      const days = differenceInDays(finish, start);
      if (days > 0) {
        if (days===1) result.push(`${days} day`);
        else result.push(`${days} days`);
      }
      return result.join(' ');

  }

   onCustom(event){
    if (event.action === 'deleteAction') {
      this.confirmDelete(event)
    }
    else if (event.action === 'fixAction') {
      this.router.navigate(["/pages/crm/affaire/edit",event.data.leadID])
    }
    else if (event.action === 'showAction') {
    // this.windowService.open(LeadDetailsComponent, {title: 'Tous les détails de '+event.data.leadName, context:{lead:event.data.leadID}})
    this.windowService.open(DetailsAffaireComponent, {title: 'Tous les détails de '+event.data.leadName, context:{idAffaire:event.data.leadID}})
  }
  }
  leadSettings={ 
    mode:"external",
    actions:{
      position: 'right',
      add:false,
      edit:false,
      delete:false,
      custom:[

      {
        name:"showAction",
        title:'<i class="nb-sunny" title="Consulter" ></i>'
      },
      {
        name:"fixAction",
        title:'<i class="nb-gear" title="Editer"></i>'
      } ,
      {
        name: 'deleteAction',
        title: '<i class="nb-power" title="Clôturer"></i>',
      }, 
    ],
     },

    columns: {
      ref: {
        title: 'Référence',
        type: 'string',
        width: '7vw'
      },
      leadName: {
        title: 'Denomination',
        type: 'string',
      },
      leadValue: {
        title:'Valeur',
        type: 'number'
      },
      leadDateCreation:{
          title:'Date de création',
          type: 'Date',
          sortDirection: 'desc',
          valuePrepareFunction(cell,row){
            return format(cell,"DD MMM YYYY")
          }
        //  valuePrepareFunction: (cell,row) => { return this.getDuration(row.DateCreated,new Date()) }   
        },
        prospect:{
          title: 'Prospect',
          type: 'string',
         valuePrepareFunction(cell,row){    
            if(row.prospect != null)
             return cell.prospectName
            else 
             return ("--")
           }, filterFunction(cell: any, search: string): boolean {
            if (cell!=null)
              return (cell.prospectName.includes(search))
            else return(true)
          }
        },
        username:{
          title: 'Créée par',
          type: 'string'
        },
      //  users:{
      //     title: 'Responable',
      //     type: 'string',
      //     valuePrepareFunction(cell,row){
      //         if(row.users.length > 0) { 
      //             return row.users[0].userName;
      //           }else 
      //             return ("--");
      //       }, filterFunction(cell: any, search: string): boolean {
             
      //         if (cell.length>0)
      //           return (cell[0].userName.includes(search))
      //         else if (cell.length==0) return(false)
      //         else return(true)
      //       }
      //   },
        leadStep: {
          title: 'Etape',
          type: 'list',
          width: '12vw',
          valuePrepareFunction(cell,row){
            if(row.leadStep!=null) { 
                return row.leadStep.stepName;
              }else 
                return ("--");
          }, 
          filterFunction(cell: any, search: string): boolean {

            if(cell.stepID==search)
               return true
             else return false
           },
          filter:{ 
            type: 'list',
            config: {
              selectText: 'Etape',
              list:this.typePrimes , 
          },
          } ,
        editor: {
          type: 'list',
          config: {
            selectText: 'Type',
            list:this.typePrimes,   
            },
          },
        }, 
        // edit: {
        //   title: 'Config',
        //   type: 'custom',
        //   renderComponent: ButtonEditAffaire,
        // },
    },
  }

  archived={
    pager: {
      perPage: 15
    },
    mode:"external",
    actions:{
      position: 'right',
      add:false,
      edit:false,
      delete:false,
      custom:[
      {
        name:"showAction",
        title:'<i class="nb-sunny"></i>'
      }
    ],
 
     },
    columns: {
      ref: {
        title: 'Référence',
        type: 'string',
        width: '7vw'
      },
      leadName: {
        title: 'Denomination',
        type: 'string',
      },
      leadValue: {
        title:'Valeur',
        type: 'number',
      },
      leadDateCreation:{
          title:'Date creation',
          type: 'Date',
          valuePrepareFunction(cell,row){
            return format(cell,"DD MMM YYYY")
          }
        },
        prospect:{
          title: 'Prospect',
          type: 'string',
         valuePrepareFunction(cell,row){    
            if(row.prospect != null)
             return cell.prospectName
            else 
             return ("--")
           }, filterFunction(cell: any, search: string): boolean {
            if (cell!=null)
              return (cell.prospectName.includes(search))
            else return(true)
          }
        },
        username:{
          title: 'Crée par',
          type: 'string',
        },
        leadStep: {
          title: 'Etape',
          type: 'list',
          width: '12vw',
          valuePrepareFunction(cell,row){
            if(row.leadStep!=null) { 
                return row.leadStep.stepName;
              }else 
                return ("--");
          }, 
          filterFunction(cell: any, search: string): boolean {

            if(cell.stepID==search)
               return true
             else return false
           },
          filter:{ 
            type: 'list',
            config: {
              selectText: 'Etape',
              list:this.typePrimes , 
          },
          } ,
        editor: {
          type: 'list',
          config: {
            selectText: 'Type',
            list:this.typePrimes,   
            },
          },
        }, 
    },
  }
}
