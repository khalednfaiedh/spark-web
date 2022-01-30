import { Component, OnInit } from '@angular/core';
import { CaracteristiqueEmballageService } from './caracteristique-emballage.service';
import { CaracteristiqueEmballaheModel } from './caracteristique-emballage-model';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-caracteristique-emballage',
  templateUrl: './caracteristique-emballage.component.html',
  styleUrls: ['./caracteristique-emballage.component.scss']
})
export class CaracteristiqueEmballageComponent implements OnInit {
  caracteristique: CaracteristiqueEmballaheModel = new CaracteristiqueEmballaheModel()
  idC = localStorage.getItem('idC')
  source: any
  constructor(private serviceCE: CaracteristiqueEmballageService, public windowRef: NbWindowRef,
    public router: Router) { }

  ngOnInit() {
    this.serviceCE.getAllCaracteristique(+this.idC).subscribe(data => {
      this.source = data
    })
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
      add: true,
      edit: true,
      delete: true,
    },
    columns: {
      longueur: {
        title: 'Longueur',
        type: 'Number',
        filter: true,
      },
      largeur: {
        title: 'Largeur',
        type: 'Number',
        filter: true,
      },
      hauteur: {
        title: 'Hauteur',
        type: 'Number',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette Conditionnement?`)) {
      event.confirm.resolve(this.serviceCE.delete(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.serviceCE.addCaracteristiqueEmballege(event.newData, +this.idC).subscribe(
      data => { this.source.add(event.newData).refresh(); },

      error => { alert(error); },
      event.confirm.resolve(event.newData),


    );


  }
  onSaveConfirm(event): any {
    this.serviceCE.update(event.newData, event.data.id, +this.idC).subscribe(
      data => { this.source.update(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  onclose() {
    this.windowRef.close();
  }

}
