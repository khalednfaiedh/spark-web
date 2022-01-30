import { Component, OnInit } from '@angular/core';
import { ModeDePaiementService } from './service/mode-de-paiement.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesModeDePaiement } from '../../../authorisation/authorities-mode-de-paiement';

@Component({
  selector: 'ngx-mode-de-paiement',
  templateUrl: './mode-de-paiement.component.html',
  styleUrls: ['./mode-de-paiement.component.scss']
})
export class ModeDePaiementComponent implements OnInit {
  public static urlModeDePaiement = "/pages/admin/modeDePaiement";
  constructor(private service: ModeDePaiementService) { }
  source: any;
  add: any;
  idEntr = localStorage.getItem('current_entreprise')
  ngOnInit() {

    this.service.getAllModeDePaiement(+this.idEntr).subscribe(
      data => { this.source = data; console.log(this.source); },
      error => { console.log(error); },
    );
    if (Authorities.hasAutorities(AuthoritiesModeDePaiement.MODE_DE_PAIEMENT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesModeDePaiement.MODE_DE_PAIEMENT_UPDATE_VALUE)) {
      this.settings.actions.edit = true
    }
    if (Authorities.hasAutorities(AuthoritiesModeDePaiement.MODE_DE_PAIEMENT_ADD_VALUE)) {
      this.add = false;
      this.settings.actions.add = true
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
      typePaiement: {
        title: 'Mode de paiement',
        type: 'String',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    console.log('event.data.idPaiement', event.data.idPaiement)
    if (window.confirm(`Vous etes sure de supprimer cette mode de paiement?`)) {
      event.confirm.resolve(this.service.deleteModeDePaiement(event.data.idPaiement).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.service.addModeDePaiement(event.newData, +this.idEntr).subscribe(
      data => {
        //this.source.add(event.newData).refresh();
      },

      error => { alert(error); },
      event.confirm.resolve(event.newData),


    );


  }
  onSaveConfirm(event): any {
    this.service.updateModeDePaiement(event.newData).subscribe(
      data => {
        //  this.source.update(event.newData).refresh(); 
      },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }


}
