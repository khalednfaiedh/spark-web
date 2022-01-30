import { Component, OnInit } from '@angular/core';
import { LeadStepCell } from '../entities/cell/leadStepCell';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionStatus } from '../entities/cell/ActionStatus';
import { ActionTypeCell } from '../entities/cell/ActionTypeCell';
import { ActionTypeService } from '../services/actiontype.service';
import { LeadStepService } from '../services/leadStep.service';
import { ActionStatusService } from '../services/actionstatus.service';
import { NbToastrService,NbGlobalPhysicalPosition,} from '@nebular/theme';

import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { ToasterConfig } from "angular2-toaster";
@Component({
  selector: 'ngx-supervise',
  templateUrl: './supervise.component.html',
  styleUrls: ['./supervise.component.scss']
})
export class SuperviseComponent implements OnInit {
  stepData: LeadStepCell[];
  stepSource: LocalDataSource;
  statusData: ActionStatus[];
  statusSource: LocalDataSource;
  typeData: ActionTypeCell[];
  typeSource: LocalDataSource;
  
  numbers = new RegExp(/^[0-9]+$/);
  constructor(
    private actionTypeService:ActionTypeService,
    private leadStepService:LeadStepService,
    private actionStatusService:ActionStatusService,
    private toastrService: NbToastrService,
  ) { 
      
    this.leadStepService.getSteps().subscribe(
      data => {
        this.stepData = data;
        this.stepSource=new LocalDataSource(data)
      },
      error => {
        console.log("cant get those steps yo ");
      }
    );

    this.actionTypeService.getActionTypesTable().subscribe(
      data=>{
      this.typeData=data; 
      this.typeSource=new LocalDataSource(data)
    },
    error=>{
      console.log("ActionType get mistake")
    }
    )

    this.actionStatusService.getActionStatusTable().subscribe(
      data=>{
      this.statusData=data; 
      this.statusSource=new LocalDataSource(data)
    },
    error=>{
      console.log("ActionType get mistake")
    }
    )

  }

  ngOnInit() {
  }

  onTypeCreateConfirm(event) {
    console.log("type create",event);
    if (( (this.numbers.test(event.newData.typeCost.toString())) && this.numbers.test(event.newData.typeDuration.toString()) )){
    this.actionTypeService.addActionType(event.newData).subscribe(
      data=>{
        console.log("succesfully added survey",data)
        event.confirm.resolve();
        this.showToast(NbToastStatus.SUCCESS, "Success", "Type Ajouté");
      },
      error=>{
        console.log("survey add error \n",error)
        event.confirm.reject()
      }
    )
    }
    else {
      this.showToast(NbToastStatus.DANGER, "Erreur", "Duree/Cout Invalide");
    }
  }
 
 
  onTypeSaveConfirm(event) {
    console.log("type save",event);
    if (( (this.numbers.test(event.newData.typeCost.toString())) && this.numbers.test(event.newData.typeDuration.toString()) )){
    this.actionTypeService.addActionType(event.newData).subscribe(
      data=>{
        console.log("succesfully update survey",data)
        event.confirm.resolve();
        this.showToast(NbToastStatus.SUCCESS, "Success", "Type Modifié");
      },
      error=>{
        console.log("survey update error \n",error)
        this.showToast(NbToastStatus.DANGER, "Erreur", "Base de donnees indisponible");
        event.confirm.reject()
      }
    )}
    else {
      this.showToast(NbToastStatus.DANGER, "Erreur", "Valeur Invalide");
    }
    
  } 

  onStepCreateConfirm(event) {
    console.log("step create",event);
    if (  this.numbers.test(event.newData.stepOrder.toString())  ){

    this.leadStepService.addLeadStep(event.newData).subscribe(
      data=>{
        console.log("succesfully added survey",data)
        event.confirm.resolve();
        this.showToast(NbToastStatus.SUCCESS, "Success", "Etape Ajouté");
      },
      error=>{
        console.log("survey add error \n",error)
        event.confirm.reject()
        this.showToast(NbToastStatus.DANGER, "Erreur", "Base de donnees indisponible");
      }
    )  }else {
      this.showToast(NbToastStatus.DANGER, "Erreur", "Valeur Invalide");
    }
  }
 
 
  onStepSaveConfirm(event) {
    console.log("step save",event);
    if (( (this.numbers.test(event.newData.position.toString())) && this.numbers.test(event.newData.stepOrder.toString()) )){
    this.leadStepService.addLeadStep(event.newData).subscribe(
      data=>{
        console.log("succesfully update survey",data)
        event.confirm.resolve();
        this.showToast(NbToastStatus.SUCCESS, "Success", "Etape modifié");
      },
      error=>{
        console.log("survey update error \n",error)
        event.confirm.reject()
        this.showToast(NbToastStatus.DANGER, "Erreur", "Base de donnees indisponible");
      }
    ) }else {
      this.showToast(NbToastStatus.DANGER, "Erreur", "Valeur invalide");
    }
    
  } 

  onStatusCreateConfirm(event) {
    console.log("status create",event);
    if (this.numbers.test(event.newData.statusPosition.toString())) {
    this.actionStatusService.addActionStatus(event.newData).subscribe(
      data=>{
        console.log("succesfully added survey",data)
        event.confirm.resolve();
        this.showToast(NbToastStatus.SUCCESS, "Success", "Status Ajouté");
      },
      error=>{
        console.log("survey add error \n",error)
        event.confirm.reject()
        this.showToast(NbToastStatus.DANGER, "Erreur", "Base de donnees indisponible");
      }
    )  }else {
      this.showToast(NbToastStatus.DANGER, "Erreur", "Valeur invalide");
    }
  }
 
 
  onStatusSaveConfirm(event) {
    console.log("status save",event);
    if (this.numbers.test(event.newData.statusPosition.toString())) {
    this.actionStatusService.addActionStatus(event.newData).subscribe(
      data=>{
        console.log("succesfully update survey",data)
        event.confirm.resolve();
        this.showToast(NbToastStatus.SUCCESS, "Success", "Status modifié");
      },
      error=>{
        console.log("survey update error \n",error)
        event.confirm.reject()
        this.showToast(NbToastStatus.DANGER, "Erreur", "Base de donnees indisponible");
      }
    ) }else {
      this.showToast(NbToastStatus.DANGER, "Erreur", "Valeur invalide");
    }
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

  showToastr(status,title,content) {
    this.showToast(NbToastStatus.SUCCESS, this.title, this.content);
  }



  stepSettings = {
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
    }, actions:{
      position: 'right',
        delete: false,
     },
    columns: {
      stepName: {
        title: "Désignation",
        type: "string"
      },
      // position: {
      //   title: "Position Kanban",
      //   type: "string",

      // },
      stepOrder: {
        title: "Position",
        type: "string",

      }
    }
  };

  typeSettings = {
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
    },actions:{
      position: 'right',
        delete: false,
     },
    columns: {
      typeName: {
        title: "Désignation",
        type: "string"
      },
      typeDuration: {
        title: "Durée moyenne (min)",
        type: "string",
      },
      typeCost: {
        title: "Coût moyen (TND)",
        type: "string",
      }
    }
  };

  statusSettings = {
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
    },actions:{
      position: 'right',
        delete: false,
     },
    columns: {
      statusName: {
        title: "Désignation",
        type: "string"
      },
      statusPosition: {
        title: "Position",
        type: "string",
      }
    }
  };
}
