import { Component, OnInit } from '@angular/core';
import { ContactClientService } from './service/contact-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesContact } from '../../../../authorisation/authorities-contact';
import { ClientComponent } from '../client.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-contact-client',
  templateUrl: './contact-client.component.html',
  styleUrls: ['./contact-client.component.scss']
})
export class ContactClientComponent implements OnInit {
  source: any;

  add: boolean = true;
  constructor(private service: ContactClientService, private router: Router, private route: ActivatedRoute,
    private windowRef: NbWindowRef, private toastrService: NbToastrService) {

  }
  ngOnInit() {
    let codeCLT = localStorage.getItem('idClient');
    // let id = this.route.snapshot.paramMap.get('idRC');
    this.service.getContactClient(+codeCLT).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });
    if (Authorities.hasAutorities(AuthoritiesContact.CONTACT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesContact.CONTACT_UPDATE_VALUE)) {
      this.settings.actions.edit = true
    }
    if (Authorities.hasAutorities(AuthoritiesContact.CONTACT_ADD_VALUE)) {
      this.add = false;
      this.settings.actions.add = true
    }
  }
  settings = {
    actions: {
      "position": "right",
      edit: false,
      delete: false,
      add: false,
    },
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
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
        filter: true,
        width: '201px',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
        filter: true,
        width: '200px',
      },

      fonction: {
        title: 'Fonction',
        type: 'string',
        filter: true,
        width: '200px',
      },
      telephone: {
        title: 'Téléphone1',
        type: 'number',
        filter: true,
      },
      telephone2: {
        title: 'Téléphone2',
        type: 'number',
        filter: true,
      },
      fax: {
        title: 'Fax',
        type: 'string',
        filter: true,
        width: '200px',
      },
      email: {
        title: 'E-mail',
        type: 'email',
        filter: true,
        width: '210px',
      },
    },
  };
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce contact?`)) {
      event.confirm.resolve(this.service.deleteContactClient(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
          this.showToast(NbToastStatus.SUCCESS, "Contact", " est supprimer avec succéss")
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    let codeCLT = localStorage.getItem('idClient');
    if (+codeCLT == null) {
      this.showToast(NbToastStatus.DANGER, "Error", "Client introuvable !!")
    } else {
      this.service.addContactClient(event.newData, +codeCLT).subscribe(
        data => {
          this.source.add(event.newData).refresh();
          this.showToast(NbToastStatus.SUCCESS, "Contact", " est ajouter avec succéss")
        },
        error => {
          this.showToast(NbToastStatus.DANGER, "Erreur", "")
        },
        event.confirm.resolve(event.newData)
      );
    }
  }
  onSaveConfirm(event): any {
    let codeCLT = localStorage.getItem('idClient');
    this.service.updateContactClient(event.newData, +codeCLT).subscribe(
      data => {
        this.source.update(event.newData);
        this.showToast(NbToastStatus.SUCCESS, "Contact", " est modifier avec succéss")
      },
      error => {
        console.log('erreur update');
      },
      event.confirm.resolve(event.newData),
    );
  }
  onclose() {
    this.windowRef.close();
    this.router.navigate([ClientComponent.urlRefreshClient]);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}