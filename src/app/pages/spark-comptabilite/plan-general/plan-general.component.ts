import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlanGeneralService, Plan } from './plan-general.service';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ModalPlanGeneralComponent } from './modal-plan-general/modal-plan-general.component';
import { ExcerciceService, Excercice } from '../excercice/excercice.service';
import { ShowPlanGeneralComponent } from './show-plan-general/show-plan-general.component';
import { ViewCell } from 'ng2-smart-table';
import { ChoisirExerciceComponent } from '../plan-general/choisir-exercice/choisir-exercice.component';
 
 

@Component({
  selector: 'ngx-button-view01',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit"  size="xsmall" status="danger" value="Consulter"/>\n' +
    '    </div>',
  })
export class ButtonConsulter01Component implements ViewCell, OnInit {
  excercice = new Excercice()
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService,
              private router: Router,
              private excerciceservice:ExcerciceService) {
                
  }
  onClick() {
    console.log(this.rowData.id);
    localStorage.setItem('idPlanGeneral',this.rowData.id);
    let idExcercice= localStorage.getItem('idExercice')
    this.excerciceservice.getExcerciceById(+idExcercice).subscribe(
      data=>{  localStorage.setItem('annee',data.annee)}
     
    )

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/pages/comptabilite/mouvement-general']));}
 
  
  
  }
@Component({
  selector: 'ngx-plan-general',
  templateUrl: './plan-general.component.html',
  styleUrls: ['./plan-general.component.scss']
})
export class PlanGeneralComponent implements OnInit {
planGeneral = new Plan();
source:any;
  constructor( private servicePlanGenerale:PlanGeneralService,
    private router: Router, 
    private windowService: NbWindowService,
    private exerciceService:ExcerciceService) { }

  ngOnInit() {
    
     
    this.planGeneral = new Plan();
    this.servicePlanGenerale.getAllPlanGeneral().subscribe(
      data => {this.source = data;
              },
      error => {console.log(error);}
      );
  }


  previousState() {
    window.history.back();
}

  settings = {
    actions :{
        position: 'right',
        custom: [
          {
            name: 'showAction',
            title: '<i class="nb-sunny" title="Show"></i>',
          },
          {
            name: 'editAction',
            title: '<i class="nb-edit" title="Edit"></i>',
    
          }, 
        ],
          add: false,
          edit: false,
    },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
         
          codeCompte:{
            title: 'Code',
            type: 'string',
          },
          nameCompte:{
            title: 'Intitulé',
            type: 'string'
          },
          // classe:{
          //   title: 'Classe',
          //   type: 'string',
          // },
           consulter:  { 
            title: 'Consulter ',
           type: 'custom',
          renderComponent: ButtonConsulter01Component,


 
            },
        },
      };

      creerCompteG(){
        localStorage.setItem("e", "0");
        this.windowService.open( ModalPlanGeneralComponent , {title: 'Ajouter un  compte générale'});
      }
      onCustom(event): any {
        if (event.action === 'editAction') {
          console.log(event.data.gaccountId);
          localStorage.setItem("e", "1");
          localStorage.setItem('idPlanGeneral',event.data.id.toString());
          this.windowService.open(ModalPlanGeneralComponent , {title: 'Modifier les informations de  ce  compte générale', context: event.data.id});
        }
        if (event.action === 'showAction') {
          console.log(event.data.gaccountId);
          localStorage.setItem('idPlanGeneral',event.data.id.toString());
           this.windowService.open( ShowPlanGeneralComponent, {title: 'Afficher les informations de ce  compte générale', context: event.data.id});
        }
      }
      onDeleteConfirm(event):void {
        if (window.confirm(`Vous êtes sûre de vouloir supprimer cette  compte?`)) {
          
          event.confirm.resolve(this.servicePlanGenerale.deletePlanGeneral(event.data.id).subscribe(
            data => {this.source.filter(p => p !== event.data);},
            error => {console.log(error);})
          );
        } else {
          event.confirm.reject();
        }
      }

       

}
