import { Component, OnInit } from '@angular/core';
import { CritereQualiteService } from './critere-qualite.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesCritereQualite } from '../../../authorisation/authorities-critere-qualite';

@Component({
  selector: 'ngx-critere-qualite',
  templateUrl: './critere-qualite.component.html',
  styleUrls: ['./critere-qualite.component.scss']
})
export class CritereQualiteComponent implements OnInit {
  private source: any;
  public static urlCritereQualite = "/pages/stock/critereQualite";

  ngOnInit(): void {
      this.service.getAllCritereQualite().subscribe(
        data => { this.source = data; console.log(this.source); },
        error => { console.log(error); },
      );
    if (Authorities.hasAutorities(AuthoritiesCritereQualite.CRITERE_QUALITE_ADD_VALUE)) {
      this.settings.actions.add = true;
    }
    if (Authorities.hasAutorities(AuthoritiesCritereQualite.CRITERE_QUALITE_UPDATE_VALUE)) {
      this.settings.actions.edit = true;
    }
    if (Authorities.hasAutorities(AuthoritiesCritereQualite.CRITERE_QUALITE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
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
      delete: false,
    },
    columns: {
      nom: {
        title: 'Nom',
        type: 'String',
        filter: true,
      },
    },
  };

  constructor(private service: CritereQualiteService) {
  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette Critére de qualité?`)) {
      event.confirm.resolve(this.service.deleteCritereQualite(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.addCritereQualite(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    console.log(event.newData);
    this.service.updateCritereQualite(event.newData).subscribe(
      data => { this.source.update(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
}