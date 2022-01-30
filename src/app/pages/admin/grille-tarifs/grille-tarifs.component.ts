import { Component, OnInit } from '@angular/core';
import { GrilleTarifsService } from './grille-tarifs.service';

@Component({
  selector: 'ngx-grille-tarifs',
  templateUrl: './grille-tarifs.component.html',
  styleUrls: ['./grille-tarifs.component.scss']
})
export class GrilleTarifsComponent implements OnInit {
  public static urlGrilleTarifs = "/pages/admin/grilleTarifs";
  source: any;
  add: any;
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: GrilleTarifsService) { }

  ngOnInit() {
    this.service.getAllGrilleTarifs(+this.idEntr).subscribe(data => {
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
      designation: {
        title: 'Grille de tarif ',
        type: 'String',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    console.log('event.data.idPaiement', event.data.idPaiement)
    if (window.confirm(`Vous etes sure de supprimer cette mode de paiement?`)) {
      event.confirm.resolve(this.service.delete(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.service.addGrilleTarifs(event.newData, +this.idEntr).subscribe(
      data => {
        //this.source.add(event.newData).refresh();
      },

      error => { alert(error); },
      event.confirm.resolve(event.newData),


    );


  }
  onSaveConfirm(event): any {
    this.service.updategrilleTarif(event.newData, event.data.id).subscribe(
      data => {
        //  this.source.update(event.newData).refresh(); 
      },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }



}
