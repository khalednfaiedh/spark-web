import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ContratService } from './contrat.service';
import { ContratModel } from './contrat.model';
import { ShowContratComponent } from './show-contrat/show-contrat.component';
import { EmployeListService } from '../../admin/employe-list/employe-list.service';
import { EmployeListModel } from '../../admin/employe-list/employe-list.model';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesEmploye } from '../../../authorisation/authoritiesEmploye';
import { AuthoritiesContrat } from '../../../authorisation/authoritiesContrat';
@Component({
  selector: 'ngx-button-view',
  template:
    ' <div class="button-container">\n' +
    '      <button (click)="onClick()" nbButton type="submit"><i class="fas fa-award"></i> prime </button> \n'+ 
    '    </div>',
})
export class ButtonViewPrimeComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router) {
  }
  onClick() {
    localStorage.setItem('idCon', this.rowData.id);
    this.router.navigate(['/pages/rh/prime']);
  }
}
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" nbButton type="submit" hero status="info"><i class="fas fa-coins"></i> Pret  </button>\n' +
    '</div>',
})
export class ButtonViewPretComponent implements ViewCell, OnInit {
  renderValue: string;


  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor( private router: Router) {
  }
  onClick() {
    
    localStorage.setItem('idCon', this.rowData.id);
   
    this.router.navigate(['/pages/rh/pret']);
  }
}
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    ' <button (click)="onClick()" nbButton type="submit" hero status="warning"> <i class="fas fa-dollar-sign"></i> Avance </button>\n' +
    '  </div>',
})
export class ButtonViewAvanceMensComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor( private router: Router) {
  }
  onClick() {
    localStorage.setItem('idCon', this.rowData.id);
    this.router.navigate(['/pages/rh/avance']);
  }
}
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" nbButton status="success" type="submit"><i class="fas fa-minus-circle"></i> Logement </button> \n'+ 
    '    </div>',
})
export class ButtonViewDeductionLogementComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router) {
  }
  onClick() {
    localStorage.setItem('idContrat', this.rowData.id);
   this.router.navigate(['/pages/rh/deduction']);
  }
}

@Component({
  selector: 'ngx-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss'],
})
export class ContratComponent implements OnInit {
  source: ContratModel[];
  emp : EmployeListModel ;
  constructor(private windowService: NbWindowService, private service: ContratService,
    private employeService :EmployeListService, private router: Router) { }

  openWindow() {
    localStorage.setItem('e', '0');
    this.windowService.open(FormContratComponent, { title: 'Ajouter un Contrat' });
  }
  authoritiesAdd = false
  ngOnInit() {
    let id = localStorage.getItem('idEmpl');
    this.service.getAllContrats(+id).subscribe(
      data => { this.source = data; },
      error => {  });
    this.emp = new EmployeListModel();
    this.employeService.getEmployesById(+id).subscribe(
      data => {this.emp = data}
    )
    if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_ADD_VALUE)) {
      this.authoritiesAdd = true;  
    }
    if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_DELETE_VALUE)) {
      this.settings.actions.delete= true;
     }   
  }

  settings = {

    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
       
      ],
    },
    columns: {
      reference: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      typeContrat: {
        title: 'Type Contrat',
        type: 'list',
        width: '150px',
        filter: {
          type: 'list',
          config: {
            selectText: 'Type Contrat',
            list: [{ value: 'civp', title: 'CIVP' }, { value: 'karame', title: 'Karama' },
            { value: 'cdd', title: 'CDD' }, { value: 'cdi', title: 'CDI' }, { value: 'apprenti', title: 'Apprenti' }],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Type Contrat',
            list: [{ value: 'civp', title: 'CIVP' }, { value: 'karame', title: 'Karama' },
            { value: 'cdd', title: 'CDD' }, { value: 'cdi', title: 'CDI' }, { value: 'apprenti', title: 'Apprenti' }],
          },
        },
      },
      // dateDebut: {
      //   title: 'Date Début',
      //   type: 'date',
      //   filter: true,
      // },
      // dateFin: {
      //   title: 'Date Fin',
      //   type: 'Date',
      //   filter: true,
      // },


      fonction: {
        title: 'Poste',
        type: 'string',
        filter: true,
      }, 
      salaireBase: {
        title: 'Salaire de base',
        type: 'number',
        filter: true,
      },
      regime: {
        title: 'Régime',
        type: 'String',
        valuePrepareFunction: (regime) => {
          return regime.designation  ;
      },

      },

      // modePaie: {
      //   title: 'Mode Paiement',
      //   type: 'list',
      //   width: '350px',
      //   filter: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Type Paiement',
      //       list: [{ value: 'parCheque', title: 'Par Chéque' }, { value: 'enEspece', title: 'En Espéce' },
      //       { value: 'Par Virement Bancaire', title: 'Par Virement Bancaire' }],
      //     },
      //   },
      //   editor: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Type Paiement',
      //       list: [{ value: 'parCheque', title: 'Par Chéque' }, { value: 'enEspece', title: 'En Espéce' },
      //       { value: 'Par Virement Bancaire', title: 'Par Virement Bancaire' }],
      //     },
      //   },
      // },
      active: {
        title: 'Actif',
        type: 'list',
        width: '100px',
        filter: {
          type: 'list',
          config: {
            selectText: 'Actif',
            list: [{ value: '1', title: 'Oui'}, { value: '0', title: 'Non' },],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Actif',
            list: [{ value: '1', title: 'Oui' }, { value: '0', title: 'Non' },],
          },
        },
      },
      prime: {
        title: 'Primes',
        type: 'custom',
        renderComponent: ButtonViewPrimeComponent,
      },
     pret: {
        title: 'Prêts',
        type: 'custom',
        renderComponent: ButtonViewPretComponent,

      },
      avance: {
        title: 'Avances',
        type: 'custom',
        renderComponent: ButtonViewAvanceMensComponent,
      },
      // deduction: {
      //   title: 'Déductions',
      //   type: 'custom',
      //   renderComponent: ButtonViewDeductionLogementComponent,
      // },
    },
  };

  onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce contrat ?`)) {
      event.confirm.resolve(this.service.deleteContrat(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onBack() {
    this.router.navigate(['/pages/rh/employe'])
  }

  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idC');
      localStorage.setItem('idC', event.data.id);
      localStorage.setItem('e', '1');
      let idEmpl = localStorage.getItem('idEmpl');
      localStorage.setItem(idEmpl, "idEmpl");
      this.windowService.open(FormContratComponent, {
        title: 'Modifier ce contrat',
        context: event.data.id
      });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('idC');
      localStorage.setItem('idC', event.data.id);
      this.windowService.open(ShowContratComponent, {
        title: 'Afficher ce contrat',
        context: event.data.id
      });
    }
  }

}