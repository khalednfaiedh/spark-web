import { Component, OnInit, Inject } from "@angular/core";
import { NbWindowRef } from "@nebular/theme";
import { LeadService } from "../../services/lead.service";
import { NB_WINDOW_CONTEXT } from "@nebular/theme/components/window/window.options";
import { LeadRow } from "../../entities/row/LeadRow";
import { LeadFull } from "../../entities/full/LeadFull";
import { NoteRow } from "../../entities/row/NoteRow";
import { LocalDataSource } from "ng2-smart-table";
import { ActionRow } from "../../entities/row/ActionRow";
import { ProspectCell } from "../../entities/cell/ProspectCell";
import { UserCell } from "../../entities/cell/UserCell";
import { UserService } from "../../services/user.service";
import { ActionService } from "../../services/action.service";
import { ActionFull } from "../../entities/full/ActionFull";
import { ActionTypeService } from "../../services/actiontype.service";

import { ButtonViewConsignationComponent } from "../../actions/actions.component";
import { format } from "date-fns";
import { ActionStatusService } from "../../services/actionstatus.service";
import { SurveyService } from "../../services/survey.service";
import { ActionModel } from "../edit-affaire/apopup/action";

@Component({
  selector: "ngx-lead-details",
  templateUrl: "./lead-details.component.html",
  styleUrls: ["./lead-details.component.scss"]
})
export class LeadDetailsComponent implements OnInit {
  lead: LeadFull;
  leadRow: LeadRow;
  id: Number;
  noteData: NoteRow[];
  noteSource: LocalDataSource;
  productSource: LocalDataSource;
  actionData: ActionModel[];
  actionSource: LocalDataSource;
  types = [];

  constructor(
    private windowRef: NbWindowRef,
    private leadService: LeadService,
    private userService: UserService,
    private surveyService: SurveyService,
    private actionService: ActionService,
    private actionTypeService: ActionTypeService,
    private actionStatusService:ActionStatusService,
    @Inject(NB_WINDOW_CONTEXT) context
  ) {
    this.id = context.lead;
  }
  defaultUser: UserCell;
  placeholdervar;
  ngOnInit() {
    this.defaultUser = new UserCell();

    this.lead = new LeadFull();
    this.lead.prospect = new ProspectCell();
    // this.lead.user=new UserCell[10];
    console.log("here");
    //this.lead.name=this.leadRow.leadName
    this.leadService.getLead(this.id).subscribe(
      data => {
        this.lead.leadID= data.leadID ;
        this.lead.leadName = data.leadName;
        this.lead.leadValue = data.leadValue;
        this.lead.leadStatus = data.leadStatus;
        this.lead.leadScore = data.leadScore;
        this.lead.leadDateCreation = data.leadDateCreation;
        this.lead.leadDateDeadline = data.leadDateDeadline;
        this.lead.actions = data.actions;
        console.log("supossedly null user here", data);

        if (data.prospect != null) this.lead.prospect = data.prospect;
        else this.lead.prospect.prospectName = "--";

        if (data.users.length > 0) {
          this.defaultUser = data.users[0];
          this.lead.users = [this.defaultUser];
          console.log("not null user", this.lead.users);
        } else {
          console.log("its null", this.lead.users);
          this.defaultUser.userName = "Default";
          this.defaultUser.userID = 100000000;
          this.lead.users = [this.defaultUser];
        }
        console.log("data");
        console.log(data);
        console.log("lead|");
        console.log(this.lead);
      },
      error => {
        console.log(" this error");
      }
    );
    this.lead = this.lead;

    this.leadService.getLeadSurveys(this.id).subscribe(
      data => {
        this.noteData = data;
        this.noteSource = new LocalDataSource(data);
       
      },
      error => {
        console.log("notes error");
      }
    );
    this.leadService.getLeadProducts(this.id).subscribe(
      data => {
        
        this.productSource = new LocalDataSource(data);
        console.log("in the products");
        console.log(data);
      },
      error => {
        console.log("products error");
      }
    );
    this.actionTypeService.getActionTypesTable().subscribe(
      data => {
        this.types = data;
        /*  if(this.types.length!=0)
      this.quickAction.actionType=this.types[0]
      else this.quickAction.actionType.typeName="ERROR" */
        let temptypes = [];
        console.log("type data", data);
        console.log("types", this.types);
        data.forEach(typePrime => {
          temptypes.push({
            value: typePrime.typeName,
            title: typePrime.typeName
          });
        });

        this.actionSettings.columns.actionType.filter.config.list = temptypes;
        this.actionSettings.columns.actionType.editor.config.list = temptypes;

        this.actionSettings = Object.assign({}, this.actionSettings);
        console.log(this.actionSettings);
      },
      error => {
        console.log("ActionType get mistake");
      }
    );
    this.leadService.getLeadActions(this.id).subscribe(
      data => {
        this.actionData = data;

      },
      error => {
        console.log("action error");
      }
    );
  }
  test() {
    this.windowRef.close();
  }
  quickAction: ActionFull;
  addQuickAction(event) {
    this.quickAction=new ActionFull()
    this.quickAction.user = this.userService.getCurrentUserCell();
    
    this.quickAction.actionName = event.newData.actionName;
    this.quickAction.actionDateCreation = new Date();
    this.quickAction.actionDateLimite = event.newData.actionDateLimite;
    
    this.actionStatusService.getActionStatusTable().subscribe( data=>{
      
      this.quickAction.actionStatus=data.find(x=>x.statusPosition==1)
      },
    error=>{ console.log("cant get those statuses yo ")})
    
    this.quickAction.actionType=this.types.find(x=>x.typeName==event.newData.actionType)
    this.quickAction.lead = this.lead;
    console.log(this.lead.users.find(x=>x.userName==event.newData.user));
    if (this.lead.users.find(x=>x.userName==event.newData.user)==null)
         { event.confirm.reject();
          //call up toaster here
          console.log("cant let you do that ")
        }
   else{ this.actionService.addAction(this.quickAction).subscribe(
      data => {
        //temporary control
        if (data.actionName == this.quickAction.actionName)
          //   this.showToastr
          event.confirm.resolve();
      },
      error => {
        console.log("this be an error", error);
      }
    );
   }
  }

  actionSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>'
    },

    columns: {
      actionName: {
        title: "Action",
        type: "string"
      },
      actionDateLimite: {
        title: "Deadline",
        type: "Date",
        editor: {
          type: "custom",
          component: ButtonViewConsignationComponent
        },

        valuePrepareFunction(cell, row) {
          let d = new Date(cell);
          return (
            format(d, "DD MMM YYYY") + " |  " + d.toTimeString().substring(0, 5)
          );
        }
      },
      user: {
        title: "Responsable",
        type: "string",
        editable:false,
        addable:false,
        defaultValue: this.userService.getCurrentUserCell().userName,
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
      },
      actionType: {
        title: "Type Action",
        type: "list",
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
        filter: {
          type: "list",
          config: {
            selectText: "Type",
            list: this.types
          }
        },
        editor: {
          type: "list",
          config: {
            selectText: "Type",
            list: this.types
          }
        }
      }
    }
  };

 productSettings={
    mode:"inline",
    pager:{
      perPage:"7"
  },
    actions:{
      position: 'right',
      
        edit: false,
        delete: false,
        add:false
   
     },
    add: {
    addButtonContent: '<i class="nb-plus"></i>',
    createButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmCreate:true
    
    },
    edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    
    },
    delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    
    },
        
    columns: {
    
    productName:{
      title:"Produit",
      type:'text',
    },
    productstatus:{
      title:"Status",
      type:'string',
    },
   
    },
    }


  /**
   * Config of notes smart table in lead popup
   * (called when clicking on  a lead)
   */
  noteSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      surveyTitle: {
        title: "Titre",
        type: "string"
      },
      surveyContent: {
        title: "Contenu",
        type: "textarea",
        editor: { type: "textarea" },
        width: "400em"
        /*        valuePrepareFunction: (cell, row) => {
          console.log('1'+row.isInEditing);
          console.log('2'+cell);
          row.isInEditing
         return cell;      }  */
      }
    }
  };
  
 onCreateConfirm(event) {
    console.log("general kenobi",event);
    this.leadService.addLeadSurvey(this.lead.leadID,event.newData).subscribe(
      data=>{
        console.log("succesfully added survey",data)
        event.confirm.resolve();
      },
      error=>{
        console.log("survey add error \n",error)
        event.confirm.reject()
      }
    )
  }
 
 
  onSaveConfirm(event) {
    console.log("hello to you too",event);
    this.leadService.addLeadSurvey(this.lead.leadID,event.newData).subscribe(
      data=>{
        console.log("succesfully update survey",data)
        event.confirm.resolve();
      },
      error=>{
        console.log("survey update error \n",error)
        event.confirm.reject()
      }
    )
    
  } 
  onDeleteConfirm(event) {
    console.log("hello there",event);
    this.surveyService.deleteSurvey(event.data.surveyID).subscribe(
        data=>{
          console.log("Survey Deleted",data);
            event.confirm.resolve();
        },
        error=>{
          console.log("couldnt delete that survey ",error)
        }

    )
  
  }
}
