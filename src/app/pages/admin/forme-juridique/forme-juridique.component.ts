import { Component, OnInit } from '@angular/core';
import { FormeJuridiqueService } from './forme-juridique.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesFormeJuridique } from '../../../authorisation/authorities-forme-juridique';

@Component({
  selector: 'ngx-forme-juridique',
  templateUrl: './forme-juridique.component.html',
  styleUrls: ['./forme-juridique.component.scss']
})
export class FormeJuridiqueComponent implements OnInit {
  public static urlFormeJuridique = "/pages/admin/formeJuridique"
  private source: any;
  idEntr = localStorage.getItem('current_entreprise')
  ngOnInit(): void {
    this.service.getAllFormeJuridique(+this.idEntr).subscribe(
      data => { this.source = data; console.log(this.source); },
      error => { console.log(error); },
    );
    if (Authorities.hasAutorities(AuthoritiesFormeJuridique.FORME_JURIDIQUE_ADD_VALUE)) {
      this.settings.actions.add = true;
    }
    if (Authorities.hasAutorities(AuthoritiesFormeJuridique.FORME_JURIDIQUE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesFormeJuridique.FORME_JURIDIQUE_UPDATE_VALUE)) {
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
      delete: false,
    },
    columns: {
      nom: {
        title: 'Libellé',
        type: 'String',
        filter: true,
      },
    },
  };

  constructor(private service: FormeJuridiqueService) {
  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette FormeJuridique?`)) {
      event.confirm.resolve(this.service.deleteFormeJuridique(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.addFormeJuridique(event.newData, +this.idEntr).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    this.service.updateFormeJuridique(event.newData).subscribe(
      data => { this.source.update(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

}