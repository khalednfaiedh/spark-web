import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { FournisseurComponent } from '../fournisseur.component';
import { ContactFournisseurService } from './contact-fournisseur.service';



@Component({
  selector: 'ngx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  source: any;
  e = localStorage.getItem('e')
  add: boolean = true;
  constructor(private service: ContactFournisseurService, private router: Router, private windowRef: NbWindowRef) { }
  col1 = "7.5vw"
  col2 = "10vw"
  col3 = "17.5vw"
  ngOnInit() {
    let idFournisseur = localStorage.getItem('idFournisseur');
    this.service.getContactFournisseur(+idFournisseur).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });
    if (this.e === '1' || this.e === '0') {
      this.settings.actions.add = true;
      this.settings.actions.delete = true;
      this.settings.actions.edit = true
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
        width: this.col2,
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
        filter: true,
        width: this.col2,
      },
      fonction: {
        title: 'Fonction',
        type: 'string',
        filter: true,
        width: '200px',
      },
      telephone: {
        title: 'Téléphone',
        type: 'string',
        filter: true,
        width: '200px',

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
        width: '400px'
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sûr(e) de supprimer cet contact?`)) {
      event.confirm.resolve(this.service.deleteContact(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    let idFournisseur = localStorage.getItem('idFournisseur');
    this.service.addContactFournisseur(event.newData, +idFournisseur).subscribe(
      data => {
        //  this.source.add(event.newData).refresh();
      },
      error => {
        console.log(error);
      },
      event.confirm.resolve(event.newData),
    );
  }
  onSaveConfirm(event): any {
    let idFournisseur = localStorage.getItem('idFournisseur');
    this.service.updateContactFournisseur(event.newData, +idFournisseur).subscribe(
      data => {
        // this.source.update(event.newData);
      },
      error => {
        console.log('erreur update');
      },
      event.confirm.resolve(event.newData),
    );
  }
  onclose() {
    this.windowRef.close();
    this.router.navigate([FournisseurComponent.urlRefreshFournisseur]);
  }
}
// if(Authorities.hasAutorities(AuthoritiesContact.CONTACT_PARTENAIRE_DELETE_VALUE)) {
// this.settings.actions.delete = true;
//
// if(Authorities.hasAutorities(AuthoritiesContact.CONTACT_PARTENAIRE_DELETE_VALUE)) {
// this.settings.actions.delete = true;
// }
// if(Authorities.hasAutorities(AuthoritiesContact.CONTACT_PARTENAIRE_UPDATE_VALUE)){
// this.settings.actions.edit = true
// }
// if(Authorities.hasAutorities(AuthoritiesContact.CONTACT_PARTENAIRE_ADD_VALUE)){
// this.add= false;
// this.settings.actions.add = true
// }





