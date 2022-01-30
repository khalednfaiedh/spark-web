import { Component, OnInit } from '@angular/core';
import { UniteMesureService } from './unite-mesure.service';
import { UniteMesureModel } from './Unite-mesure.model';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesUniteMesure } from '../../../authorisation/authorities-unite-mesure';

@Component({
  selector: 'ngx-unite-mesure',
  templateUrl: './unite-mesure.component.html',
  styleUrls: ['./unite-mesure.component.scss']
})
export class UniteMesureComponent implements OnInit {
  public static urlUniteMesure = "/pages/admin/uniteMesure";
  source: any;
  uniteMesure = UniteMesureModel;
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: UniteMesureService) { }

  /* onCreateConfirm(event): void {
    this.banqueService.addBanque(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  
   */

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesUniteMesure.UNITE_MESURE_LIST_VALUE)) {
      this.service.getAllUniteMesure(+this.idEntr).subscribe(
        data => { this.source = data; console.log(this.source); },
        error => { console.log(error); },
      );
    }
    if (Authorities.hasAutorities(AuthoritiesUniteMesure.UNITE_MESURE_ADD_VALUE)) {
      this.settings.actions.add = true;
    }
    if (Authorities.hasAutorities(AuthoritiesUniteMesure.UNITE_MESURE_UPDATE_VALUE)) {
      this.settings.actions.edit = true;
    }
    if (Authorities.hasAutorities(AuthoritiesUniteMesure.UNITE_MESURE_DELETE_VALUE)) {
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
      unite: {
        title: 'Unité de mesure',
        type: 'String',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette unité de mesure?`)) {
      event.confirm.resolve(this.service.deleteUniteMesure(event.data.idUnite).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.service.addUniteMesure(event.newData, +this.idEntr).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  onSaveConfirm(event): any {
    this.service.updateUniteMesure(event.newData).subscribe(
      data => { this.source.update(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }


}
