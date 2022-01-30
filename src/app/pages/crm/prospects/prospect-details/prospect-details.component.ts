import { Component, OnInit, Inject } from '@angular/core';
import { ButtonViewConsignationComponent } from '../../actions/actions.component';
import { format } from 'date-fns';
import { ActionTypeService } from '../../services/actiontype.service';
import { UserService } from '../../services/user.service';
import { ActiontypeRow } from '../../entities/row/ActionTypeRow';
import { ActionStatus } from '../../entities/cell/ActionStatus';
import { LeadStepCell } from '../../entities/cell/leadStepCell';
import { LeadStepService } from '../../services/leadStep.service';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ProspectFull } from '../../entities/full/ProspectFull';
import { ProspectService } from '../../services/prospect.service';
import { LeadAction } from '../../entities/cell/leadAction';
import { UserCell } from '../../entities/cell/UserCell';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionRow } from '../../entities/row/ActionRow';

@Component({
  selector: 'ngx-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrls: ['./prospect-details.component.scss']
})
export class ProspectDetailsComponent implements OnInit {
  placeholderVar;
  users:UserCell[]
  
  status:ActionStatus[]=[];
  leads:LeadAction[]=[];
  actions:ActionRow[]
  actionSource:LocalDataSource
  typePrimes=[];
  steps:LeadStepCell[]=[]
  prospect:ProspectFull;
  ancienClient=true
  prospectType= [
    { value: "Particulier", title: "Particulier"},
    { value: "Société", title: "Société" }
  ]
  testThis= "Particulier"
  types: ActiontypeRow[];
  constructor(
    private prospectService:ProspectService,
    private actionTypeService:ActionTypeService,
    private leadStepService:LeadStepService,
    private userService:UserService,
    @Inject(NB_WINDOW_CONTEXT) context,
  ) {
    this.actions=[]
    this.actionSource=new LocalDataSource()
    this.prospect=new ProspectFull()
     this.prospect.createdBy=new UserCell()
    this.prospectService.getFullProspect(context.id).subscribe(
      data=>{
      
        this.prospect=data 
        // this.prospect.prospectName=data.prospectName 
       // this.prospect.prospectRating=data.prospectRating 
         console.log(this.prospect)
        this.leads=this.prospect.leads
        this.leads.forEach(lead=>{

            lead.actions.forEach(action=>{
              this.actions.push(action)
            })
        })
        this.actionSource=new LocalDataSource(this.actions)
      },
      error=>{
        console.log("couldnt get prospect")
      }

    )
    this.actionTypeService.getActionTypesTable().subscribe(
      data=>{
      this.types=data;
     /*  if(this.types.length!=0)
      this.quickAction.actionType=this.types[0]
      else this.quickAction.actionType.typeName="ERROR" */
      let temptypes=[]
      data.forEach(typePrime=>{
       temptypes.push({value: typePrime.typeID, title: typePrime.typeName})
      })
     
      // this.actionSettings.columns.actionType.filter.config.list=temptypes
      // this.actionSettings.columns.actionType.editor.config.list=temptypes

      this.actionSettings = Object.assign({}, this.actionSettings)
    },
    error=>{
      console.log("ActionType get mistake")
    }
    )
   
  
  this.leadStepService.getSteps().subscribe(
    data=>{
      this.steps=data
      data.forEach(typePrime=>{
        this.typePrimes.push({value: typePrime.stepID, title: typePrime.stepName})
      })
     this.leadSettings.columns.leadStep.filter.config.list=this.typePrimes;
     // this.leadSettings.columns.leadStatus.editor.config.list=this.typePrimes;
      this.leadSettings = Object.assign({}, this.leadSettings)
    },
    error=>{
      console.log("cant get those steps yo ")
    }

)

}

  ngOnInit() {
  }


  leadSettings={
    mode:"external",
    pager:{
      perPage:"7"
  },
    actions:{
     add:false,
     edit:false,
     delete:false,
  },
    columns: {
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
        //  valuePrepareFunction: (cell,row) => { return this.getDuration(row.DateCreated,new Date()) }   
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

  actionSettings={
    mode:"inline",
    pager:{
      perPage:"7"
  },
    actions:{
      position: 'right',
      custom: [
        // {
        //   name: 'showAction',
        //   title: '<i class="nb-sunny" title="Consulter" i18n="@@consulter"></i>',
        // },
        // {
        //   name: 'editAction',
        //   title: '<i class="nb-edit" title="Editer" i18n="@@editer"></i>',
        //   confirm:true
        // },
        // {
        //   name: 'deleteAction',
        //   title: '<i class="nb-trash" title="Supprimer" i18n="@@supprimer"></i>',
        // }
      ],
        add:false,
        edit: false,
        delete: false,
   
     },
    // add: {
    // addButtonContent: '<i class="nb-plus"></i>',
    // createButtonContent: '<i class="nb-checkmark"></i>',
    // cancelButtonContent: '<i class="nb-close"></i>',
    // confirmCreate:true
    
    // },
    // edit: {
    // editButtonContent: '<i class="nb-edit"></i>',
    // saveButtonContent: '<i class="nb-checkmark"></i>',
    // cancelButtonContent: '<i class="nb-close"></i>',
    
    // },
    // delete: {
    // deleteButtonContent: '<i class="nb-trash"></i>',
    
    // },
        
    columns: {
      actionType: {
        title: 'Action',
        type: 'list',
        valuePrepareFunction(cell,row){
      if (typeof cell === 'string')
          return cell
      if (cell !=null)
          return cell.typeName
         else return("-")
        },
        filterFunction(cell: any, search: string): boolean {
    
          if(cell.typeID==search)
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
    intervenant:{
      title:"Créée par",
      type:'string',
      // editable:false,
      // addable:false,
      // defaultValue: this.userService.getCurrentUserCell().userName,
      // editor:{
      //     config:{
      // }},
      // valuePrepareFunction(cell,row){
      //   if (cell!=null)
      //   return cell.userName
      //   else return("**")
      // },
      // filterFunction(cell: any, search: string): boolean {

      //   if (cell=="")  {return false}
      //   else if (cell.userName!=null)
      //     { return (cell.userName.includes(search)) }
       
      //   else {return(true) }
      // }
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
    },
    }

   
}

