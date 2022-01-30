import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { EnfantService } from './enfant.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesAbattement } from '../../../authorisation/authoritiesAbattement';
import { AuthoritiesEnfant } from '../../../authorisation/authoritiesEnfant';

@Component({
  selector: 'ngx-employe-enfant',
  templateUrl: './employe-enfant.component.html',
  styleUrls: ['./employe-enfant.component.scss']
})
export class EmployeEnfantComponent implements OnInit {
  source: any;
  constructor(private service: EnfantService, private router:Router, private windowService : NbWindowRef) { }

  ngOnInit(): void {
    let idE = localStorage.getItem("idEmpl")
    
    this.service.getAllEnfant(+idE).subscribe(
      data => {this.source = data; },
      error => { },
    );
    if(Authorities.hasAutorities(AuthoritiesEnfant.ENFANT_ADD_VALUE)){
      this.settings.actions.add= true;
    }
    if(Authorities.hasAutorities(AuthoritiesEnfant.ENFANT_DELETE_VALUE)){
      this.settings.actions.delete= true;
    }
    if(Authorities.hasAutorities(AuthoritiesEnfant.ENFANT_UPDATE_VALUE)){
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
      add:false,
      edit: false,
      delete: false,
    },
    columns:{
      prenom:{
        title: 'Prenom',
        type:'string'
      },
      etatEnfant: {
        title: 'Etat Enfant',
        type: 'list',
        width: '350px',
        filter: {
          type: 'list',
          config: {
            selectText: 'Etat Enfant',
            list: [{ value: 'infirme', title: 'infirme' }, { value: 'enfant_moins_20', title: 'enfant moins de 20 ans' },{ value: 'etudiant_non_boursie_moins_26', title: 'etudiant non boursié moins de 26 ans' }],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Etat Enfant',
            list: [{ value: 'infirme', title: 'infirme' }, { value: 'enfant_moins_20', title: 'enfant moins de 20 ans' },{ value: 'etudiant_non_boursie_moins_26', title: 'etudiant non boursié moins de 26 ans' }],
          },
        },
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ?`)) {
      event.confirm.resolve(this.service.deleteEnfant(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    let idE = localStorage.getItem("idEmpl")
    this.service.addEnfant(event.newData, +idE).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => {
         alert("Changer la situation familliale d'abord");
         this.windowService.close() ;
        },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    let idE = localStorage.getItem("idEmpl")
    this.service.updateEnfant(event.newData, +idE).subscribe(
      data => { this.source.update(event.newData); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
}