import { Component, OnInit } from '@angular/core';
import { AbattementService } from './abattement.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesAbattement } from '../../../authorisation/authoritiesAbattement' ;
@Component({
  selector: 'ngx-abattement',
  templateUrl: './abattement.component.html',
  styleUrls: ['./abattement.component.scss']
})
export class AbattementComponent implements OnInit {

  source: any;
  constructor(private service: AbattementService) { }

ngOnInit(): void {
  this.service.getAllAbattement().subscribe(
    data => {this.source = data; },
    error => {console.log(error); },
  );

  if(Authorities.hasAutorities(AuthoritiesAbattement.ABATTEMENT_ADD_VALUE)){
    this.settings.actions.add= true;
  }
  if(Authorities.hasAutorities(AuthoritiesAbattement.ABATTEMENT_DELETE_VALUE)){
    this.settings.actions.delete= true;
  }
  if(Authorities.hasAutorities(AuthoritiesAbattement.ABATTEMENT_UPDATE_VALUE)){
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
    situation: {
      title: 'Situation familliale',
      type: 'list',
      editable:false,

      filter: {
        type: 'list',
        config: {
          selectText: 'Situation familliale',
          list: [{ value: 'Celibataire', title: 'Célibataire' }, { value: 'Chef de famille', title: 'Chef de famille' },{ value: 'Chef de famille 1 enfant', title: 'Chef de famille 1 enfant' },{ value: 'Chef de famille 2 enfant', title: 'Chef de famille 2 enfant' },{ value: 'Chef de famille 3 enfant', title: 'Chef de famille 3 enfant' },{ value: 'Chef de famille 4 enfant où plus', title: 'Chef de famille 4 enfant où plus' }],
        },
      },
      editor: {
        type: 'list',
        config: {
          selectText: 'Situation familliale',
          list: [{ value: 'Celibataire', title: 'Célibataire' }, { value: 'Chef de famille', title: 'Chef de famille' },{ value: 'Chef de famille 1 enfant', title: 'Chef de famille 1 enfant' },{ value: 'Chef de famille 2 enfant', title: 'Chef de famille 2 enfant' },{ value: 'Chef de famille 3 enfant', title: 'Chef de famille 3 enfant' },{ value: 'Chef de famille 4 enfant où plus', title: 'Chef de famille 4 enfant où plus' }],
        },
      },
    },
    valeur: {
      title: 'Abattement',
      type: 'number',
      filter: true,
      valuePrepareFunction: (valeur) => {
        return valeur +' TND'  ;
    },
    },
  },
};

onDeleteConfirm(event): void {
  if (window.confirm(`Vous etes sure de supprimer ce abattement?`)) {
   
    event.confirm.resolve(this.service.deleteAbattement(event.data.idAbat).subscribe(
      
      data => {
      
        this.source.filter(p => p !== event.data);
      }),
    );
  } else {
    event.confirm.reject();
  }
}

onCreateConfirm(event): void {
  this.service.addAbattement(event.newData).subscribe(
    data => { this.source.add(event.newData).refresh(); },
    error => { alert(error); },
    event.confirm.resolve(event.newData),
  );
}

onSaveConfirm(event): any {
  this.service.updateAbattement(event.newData).subscribe(
    data => { this.source.update(event.newData); },
    error => { alert(error); },
    event.confirm.resolve(event.newData),
  );
}
}
