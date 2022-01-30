import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FormEmployeComponent } from './form-employe/form-employe.component';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ShowEmployeComponent } from './show-employe/show-employe.component';
import { EmployeListService } from './employe-list.service';
import { EmployeListModel } from './employe-list.model';
import { EmployeEnfantComponent } from '../../rh/employe-enfant/employe-enfant.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesEmploye } from '../../../authorisation/authoritiesEmploye';
import { Enterprise } from '../../spark-comptabilite/entreprise/entreprise';
import { EntrepriseService } from '../entreprise/entreprise.service';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" size="small" nbButton type="submit"><i class="fas fa-file-signature"></i> Contrat</button> </div>',
})
export class ButtonViewComponent implements ViewCell, OnInit {
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
    localStorage.setItem('idEmpl', this.rowData.matricule);

    this.router.navigate(['/pages/rh/contrat']);
  }
}

@Component({
  selector: 'ngx-button-view2',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" nbButton  size="small" type="submit" hero status="info"> <i class="fa fa-plus" aria-hidden="true"></i> </button></div>',
})
export class ButtonView2Component implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService, private router: Router) {
  }
  onClick() {

    localStorage.setItem('idEmpl', this.rowData.matricule);
    this.windowService.open(EmployeEnfantComponent);
  }
}

@Component({
  selector: 'ngx-button-view3',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" hero status="success" value="Presence"/> </div>',
})
export class ButtonView3Component implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService, private router: Router) {
  }
  onClick() {

    localStorage.setItem('idEmpl', this.rowData.matriculeEmploye);
    this.windowService.open(EmployeEnfantComponent);
  }
}


@Component({
  selector: 'ngx-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.scss'],
})
export class EmployeListComponent implements OnInit {
  constructor(private windowService: NbWindowService,
    private serviceEntreprsie: EntrepriseService,
    private service: EmployeListService, private router: Router) {
  }
  entreprise: Enterprise
  source: EmployeListModel[];
  authoritiesAdd = true;

  ngOnInit() {
    this.serviceEntreprsie.getAllEnterprise().subscribe(data => {
      this.entreprise = data[0]
    })
    let id = localStorage.getItem('current_entreprise')
    this.service.getAllEmployes(+id).subscribe(
      data => {
        this.source = data;
        console.log(data)
      },
      error => {
        console.log('error get employees')
      });


    if (Authorities.hasAutorities(AuthoritiesEmploye.EMPLOYEE_ADD_VALUE)) {
      this.authoritiesAdd = false;
      console.log('okkk')
    }
    if (Authorities.hasAutorities(AuthoritiesEmploye.EMPLOYEE_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesEmploye.EMPLOYEE_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }

    if (Authorities.hasAutorities(AuthoritiesEmploye.EMPLOYEE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
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
      custom: [],
    },
    columns: {
      matricule: {
        title: 'Matricule',
        type: 'string',
        filter: true,
        sort: true,
        sortDirection: 'asc',
      },
      nom: {
        title: 'Nom',
        type: 'string',
        filter: true,
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
        filter: true,
      },
      cin: {
        title: 'CIN',
        type: 'string',
        filter: true,
      },
      numCnss: {
        title: 'N° CNSS',
        type: 'number',
        filter: true,
      },
      tel: {
        title: 'Tel',
        type: 'string',
        filter: true,
      },

      contrat: {
        title: 'Contrats',
        filter: false,
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            localStorage.setItem('idEmp', row.nom);
          });
        },
      },
      enfant: {
        title: 'Enfant(s)',
        filter: false,
        type: 'custom',
        renderComponent: ButtonView2Component,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            localStorage.setItem('idEmp', row.nom);
          });
        },
      },
    },
  };
  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('matriculeEmploye');
      localStorage.setItem('matriculeEmploye', event.data.matricule);
      localStorage.setItem('e', '1');
      this.windowService.open(FormEmployeComponent, {
        title: 'Modifier cet Employé',
        context: event.data.matricule
      });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('matriculeEmploye');
      localStorage.setItem('matriculeEmploye', event.data.matricule);
      this.windowService.open(ShowEmployeComponent, {
        title: 'Afficher cet Employé',
        context: event.data.matricule
      });
    }
  }
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idEmploye');
    localStorage.setItem('e', '0');
    this.windowService.open(FormEmployeComponent, { title: 'Ajouter un employé' });
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sure de supprimer cet employé ?`)) {
      event.confirm.resolve(this.service.deleteEmployes(event.data.matricule).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}
