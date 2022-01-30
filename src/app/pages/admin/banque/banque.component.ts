import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { BanqueService } from './banque.service';
import { BanqueModel } from './Banque.modal';

@Component({
  selector: 'ngx-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit {
  public static urlBanque = "/pages/admin/banque";
  constructor(private service: BanqueService) {
  }

  source: any;
  banque = BanqueModel;
  idEntr = localStorage.getItem('current_entreprise')

  /* onCreateConfirm(event): void {
    this.banqueService.addBanque(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  
   */


  ngOnInit() {

    this.service.getAllBanques(+this.idEntr).subscribe(
      data => { this.source = data; console.log(this.source); },
      error => { console.log(error); },
    );
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
      /* add: false,
      edit: false,
      delete: false, */
    },
    columns: {
      nom: {
        title: 'Raison sociale',
        type: 'String',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette Banque ?`)) {
      event.confirm.resolve(this.service.deleteBanque(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.service.addBanque(event.newData, +this.idEntr).subscribe(
      data => {

      },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  onSaveConfirm(event): any {
    this.service.updateBanque(event.newData).subscribe(
      data => {
        // this.source.update(event.newData).refresh();
      },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

}







