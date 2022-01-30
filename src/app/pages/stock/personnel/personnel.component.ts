import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { PersonnelService } from './services/personnel.service';
import { ModalPersonnelComponent } from './modal-personnel/modal-personnel.component';
import { ShowPersonnelComponent } from './show-personnel/show-personnel.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesPersonnel } from '../../../authorisation/authorities-personnel';
import { EntrepriseService } from '../../admin/entreprise/entreprise.service';

@Component({
  selector: 'ngx-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  public static urlPersonnel = "/pages/stock/personnel";
  constructor(private windowService: NbWindowService,
    private serviceEntreprise: EntrepriseService,
    private service: PersonnelService) { }
  add = true;
  source: any;
  entreprises: any;
  idEntreprise: number;

  ngOnInit() {
    this.serviceEntreprise.getAllEnterprise().subscribe(data => {
      this.entreprises = data;
    },
      error => { console.log("error") });

    if(Authorities.hasAutorities(AuthoritiesPersonnel.PERSONNEL_LIST_VALUE)){
    this.service.getAllPersonnels().subscribe(
      data => { this.source = data; },
      error => { console.log('erreur'); });
    }
    if (Authorities.hasAutorities(AuthoritiesPersonnel.PERSONNEL_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesPersonnel.PERSONNEL_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesPersonnel.PERSONNEL_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesPersonnel.PERSONNEL_DELETE_VALUE)) {
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
      custom: [
      ],
    },
    columns: {
      // idPersonnel: {
      //   title: 'Référence',
      //   type: 'string',
      //   filter: true,
      //   filterFunction(cell, search) {
      //     let cellS = "P2019" + cell
      //     return (cellS.toUpperCase().includes(search.toUpperCase()))
      //   },
      //   valuePrepareFunction(cell, row) {
      //     let date = new Date()
      //     return "P2019" + row.idPersonnel
      //   }
      // },
      nomP: {
        title: 'Nom complet',
        type: 'string',
        filter: true,
      },

      typeP: {
        title: 'Type',
        type: 'string',
        filter: true,
      },

      tlfP: {
        title: 'Téléphone',
        type: 'number',
        filter: true,
      },
    },
  };

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalPersonnelComponent,
      { title: 'Ajouter un personnel' });
  }

  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idPersonnel);
      console.log(event.data);
      this.windowService.open(ShowPersonnelComponent,
        { title: 'Afficher le personnel', context: { id: event.data.idPersonnel } });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('e', '1');
      localStorage.setItem('idRC', event.data.idPersonnel);
      this.windowService.open(ModalPersonnelComponent,
        { title: 'Ajouter un personnel', context: event.data.idPersonnel });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce personnel?`)) {
      event.confirm.resolve(this.service.deletePersonnel(event.data.idPersonnel).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onChargeentreprise(event) {
    if (this.idEntreprise != null) {
      this.service.getPersonnelsByEntreprise(this.idEntreprise).subscribe(data => {
        this.source = data;
      },
        error => {
          console.log("error");
        })
    }
    else{
      this.source= null;
    }
  }
}
