import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Plan } from '../plan-general/plan-general.service';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { PlanTiersService } from './plan-tiers.service';
import { ModalPlanTiersComponent } from './modal-plan-tiers/modal-plan-tiers.component';
import { ShowPlanTiersComponent } from './show-plan-tiers/show-plan-tiers.component';
import { ViewCell } from 'ng2-smart-table';
import { ChoisireExercicePlanTierComponent } from './choisire-exercice-plan-tier/choisire-exercice-plan-tier.component';
 
 

@Component({
  selector: 'ngx-button-view01',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="danger" value="   Consulter  "/>\n' +
    '    </div>',
  })
export class ButtonConsulter02Component implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService,
              private router: Router,) {
                
  }
  onClick() {
    console.log(this.rowData.id);
    localStorage.setItem('idPlanTiers',this.rowData.id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/pages/comptabilite/mouvement-tiers']));
  
  }
  }
@Component({
  selector: 'ngx-plan-tiers',
  templateUrl: './plan-tiers.component.html',
  styleUrls: ['./plan-tiers.component.scss']
})
export class PlanTiersComponent implements OnInit {
planTiers = new Plan ();
  source:any;
  constructor( private servicePlanTiers: PlanTiersService,
    private router: Router, 
    private windowService: NbWindowService,) { }

  ngOnInit() {

    this.planTiers = new Plan();
    this.servicePlanTiers.getAllPlanTiers().subscribe(
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
          }, nameCompte:{
            title: 'Intitulé',
            type: 'string'
          },
         
          consulter:  { 
            title: 'Consulter ',
           type: 'custom',
          renderComponent: ButtonConsulter02Component,


 
            },
        },
      };

      addPlanTiers(){
        localStorage.setItem("e", "0");
        this.windowService.open(  ModalPlanTiersComponent , {title: 'Ajouter un  Compte  tier'});
      }
      onCustom(event): any {
        if (event.action === 'editAction') {
          
          localStorage.setItem("e", "1");
          localStorage.setItem('idPlaTier',event.data.id.toString());
          this.windowService.open(ModalPlanTiersComponent , {title: 'Modifier les informations de ce  Compte tiers', context: event.data.id});
        }
        if (event.action === 'showAction') {
          
          localStorage.setItem('idPlaTier',event.data.id.toString());
           this.windowService.open(ShowPlanTiersComponent, {title: 'Afficher   les informations de ce    Compte tier', context: event.data.id});
        }
      }
      onDeleteConfirm(event):void {
        if (window.confirm(`Vous êtes sûre de vouloir supprimer cette  compte?`)) {
          
          event.confirm.resolve(this.servicePlanTiers.deletePlanTiers(event.data.id).subscribe(
            data => {this.source.filter(p => p !== event.data);},
            error => {console.log(error);})
          );
        } else {
          event.confirm.reject();
        }
      }

       

}
