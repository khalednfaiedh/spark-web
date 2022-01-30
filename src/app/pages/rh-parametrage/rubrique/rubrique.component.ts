import { Component, OnInit } from '@angular/core';
import { RubriqueService } from './rubrique.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesImpot } from '../../../authorisation/authoritiesImpot';

@Component({
  selector: 'ngx-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.scss']
})
export class RubriqueComponent implements OnInit {

  source: any;
  constructor(private service: RubriqueService) { }

ngOnInit(): void {
  this.service.getAllRubrique().subscribe(
    data => {this.source = data; },
    error => {console.log(error); },
  );
  if(Authorities.hasAutorities(AuthoritiesImpot.IMPOT_ADD_VALUE)){
    this.settings.actions.add= true;
  }
  if(Authorities.hasAutorities(AuthoritiesImpot.IMPOT_DELETE_VALUE)){
    this.settings.actions.delete= true;
  }
  if(Authorities.hasAutorities(AuthoritiesImpot.IMPOT_UPDATE_VALUE)){
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
    // nom: {
    //   title: 'Nom',
    //   type: 'string',
    //   filter: true,
    //   editable:false,
    // },
    nom: {
      title: 'Designation',
      type: 'list',  
      filter: {
        type: 'list',
        config: {
          selectText: 'Designation',
          list: [{ value: 'CNSS', title: 'CNSS' }, { value: 'Impot FP', title: 'Impot FP' }, { value: 'Contribution Sociale', title: 'Contribution Sociale' }],
        },
      },
      editor: {
        type: 'list',
        config: {
          selectText: 'Designation',
          list: [{ value: 'CNSS', title: 'CNSS' }, { value: 'Impot FP', title: 'Impot FP' }, { value: 'Contribution Sociale', title: 'Contribution Sociale' }], 
         },
      },
    },

    pourcentage: {
      title: 'Pourcentage %',
      type: 'number',
      filter: true,
      valuePrepareFunction: (pourcentage) => {
        return pourcentage +' %'  ;
    },
    },
  },
};

onDeleteConfirm(event): void {
  if (window.confirm(`Vous etes sure de supprimer cette rubrique?`)) {
    event.confirm.resolve(this.service.deleteRubrique(event.data.idImpotRev).subscribe(
      data => {
        this.source.filter(p => p !== event.data);
      }),
    );
  } else {
    event.confirm.reject();
  }
}

onCreateConfirm(event): void {
  this.service.addRubrique(event.newData).subscribe(
    data => { this.source.add(event.newData).refresh(); },
    error => { alert(error); },
    event.confirm.resolve(event.newData),
  );
}

onSaveConfirm(event): any {
  this.service.updateRubrique(event.newData).subscribe(
    data => { this.source.update(event.newData); },
    error => { alert(error); },
    event.confirm.resolve(event.newData),
  );
}
}
