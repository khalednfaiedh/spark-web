import { Component, OnInit } from '@angular/core';
import { TypeCongeService } from './typeConge.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesCongeType } from '../../../authorisation/authoritiesCongeType';

@Component({
  selector: 'ngx-type-conge',
  templateUrl: './type-conge.component.html',
  styleUrls: ['./type-conge.component.scss']
})
export class TypeCongeComponent implements OnInit {
  source: any;
  constructor(private service: TypeCongeService) { }

  ngOnInit(): void {
    this.service.getAllCongeTypes().subscribe(
      data => {this.source = data; },
      error => {console.log(error); },
    );
    if(Authorities.hasAutorities(AuthoritiesCongeType.CONGE_TYPE_ADD_VALUE)){
      this.settings.actions.add= true;
    }
    if(Authorities.hasAutorities(AuthoritiesCongeType.CONGE_TYPE_DELETE_VALUE)){
      this.settings.actions.delete= true;
    }
    if(Authorities.hasAutorities(AuthoritiesCongeType.CONGE_TYPE_UPDATE_VALUE)){
      this.settings.actions.edit= true;
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
      delete:false
    },
    columns: {
      designation: {
        title: 'Désignation',
        type: 'string',
        filter: true,
        sort : true ,
        sortDirection :	'asc',
      },
      nombreJours: {
        title: 'Nombre de jours',
        type: 'number',
        filter: true,
        valuePrepareFunction: (nombreJours) => {
          return nombreJours +' jours'  ;
      },
      },
      payer: {
        title: 'Payer',
        type: 'list',  
        filter: {
          type: 'list',
          config: {
            selectText: 'Payer',
            list: [{ value: 'Oui', title: 'Oui' }, { value: 'Non', title: 'Non' }],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Payer',
            list: [{ value: 'Oui', title: 'Oui' }, { value: 'Non', title: 'Non' }],          },
        },
      },


    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce type de congé ?`)) {
      event.confirm.resolve(this.service.deleteCongeTypes(event.data.idCongeType).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.addCongeTypes(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    this.service.updateCongeTypes(event.newData).subscribe(
      data => { this.source.update(event.newData); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
}
