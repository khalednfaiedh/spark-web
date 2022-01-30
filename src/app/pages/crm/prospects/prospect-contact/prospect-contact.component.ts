import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ProspectContactService } from './prospect_contact.service';

@Component({
  selector: 'ngx-prospect-contact',
  templateUrl: './prospect-contact.component.html',
  styleUrls: ['./prospect-contact.component.scss']
})
export class ProspectContactComponent {
  source: any;
  idProspect: number;
  constructor(private service: ProspectContactService,
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.idProspect = context.idProspect
      this.service.getAll(this.idProspect).subscribe(
        data => {this.source = data; },
        error => {console.log(error); },
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
    },
    columns: {
      nom: {
        title: 'Nom & prénom',
        type: 'string',
        filter: true,
        width:'12vw',
        valuePrepareFunction: (n) => {
          return n ? n : '-'
        }
      },
      tel: {
        title: 'Téléphone',
        type: 'number',
        filter: true,
        valuePrepareFunction: (tel) => {
          return tel ? tel : '-'
      },
      },
      mail: {
        title: 'E-mail',
        type: 'string',
        filter: true,
        width:'35vw',
        valuePrepareFunction: (mail) => {
          return mail ? mail : '-'
      },
      },
      fax: {
        title: 'Fax',
        type: 'number',
        filter: true,
        valuePrepareFunction: (fax) => {
          return fax ? fax : '-'
      },
      },

    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Êtes-vous sur(e) de vouloir supprimer ce contact ?`)) {
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
    this.service.save(this.idProspect,event.newData).subscribe(
      data => {
     //    this.source.add(event.newData).refresh();
         },
      error => { alert('error'); },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    this.service.save(this.idProspect,event.newData).subscribe(
      data => {
       //  this.source.update(event.newData);
         },
      error => { alert('error'); },
      event.confirm.resolve(event.newData),
    );
  }
}
