import { Component, OnInit } from '@angular/core';
import { irppService } from './irpp.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesIRPP } from '../../../authorisation/authoritiesIRPP';

@Component({
  selector: 'ngx-irpp',
  templateUrl: './irpp.component.html',
  styleUrls: ['./irpp.component.scss']
})
export class IrppComponent implements OnInit {

  source: any;
  constructor(private service: irppService) { }

  ngOnInit(): void {
    this.service.getAllIRPP().subscribe(
      data => { this.source = data; },
      error => { console.log(error); },
    );

    if (Authorities.hasAutorities(AuthoritiesIRPP.IRPP_ADD_VALUE)) {
      this.settings.actions.add = true;
    }
    if (Authorities.hasAutorities(AuthoritiesIRPP.IRPP_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesIRPP.IRPP_UPDATE_VALUE)) {
      this.settings.actions.edit = true;
    }
  }
  settings = {

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      min: {
        title: 'Borne inférieure',
        type: 'number',
        filter: true,
        valuePrepareFunction: (min) => {
          return min + ' TND';
        },
      },
      max: {
        title: 'Borne supérieure',
        type: 'number',
        filter: true,
        valuePrepareFunction: (max) => {
          return max + ' TND';
        },
      },
      pourcentage: {
        title: 'Pourcentage',
        type: 'number',
        filter: true,
        valuePrepareFunction: (pourcentage) => {
          return pourcentage + ' %';
        },
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce type d'IRPP'?`)) {
      event.confirm.resolve(this.service.deleteIRPP(event.data.idIRPP).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.addIRPP(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    this.service.updateIRPP(event.newData).subscribe(
      data => { this.source.update(event.newData); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
}
