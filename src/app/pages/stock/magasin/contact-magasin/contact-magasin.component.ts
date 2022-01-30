import { Component, OnInit } from '@angular/core';
import { ContactMagasinService } from './contact-magasin.service';

@Component({
  selector: 'ngx-contact-magasin',
  templateUrl: './contact-magasin.component.html',
  styleUrls: ['./contact-magasin.component.scss']
})
export class ContactMagasinComponent implements OnInit {
  source: any;
  // add: boolean = true;
  constructor(private service: ContactMagasinService) { }

  ngOnInit() {
    let idMagasin = localStorage.getItem('idMagasin');
    this.service.getAllContactMagasinsByMagasin(+idMagasin).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });

    // if(Authorities.hasAutorities(AuthoritiesContact.CONTACT_PARTENAIRE_DELETE_VALUE)) {
    //   this.settings.actions.delete = true;
    // }

    // if(Authorities.hasAutorities(AuthoritiesContact.CONTACT_PARTENAIRE_UPDATE_VALUE)){
    //   this.settings.actions.edit = true
    // }
    // if(Authorities.hasAutorities(AuthoritiesContact.CONTACT_PARTENAIRE_ADD_VALUE)){
    //   this.add= false;
    //  this.settings.actions.add = true

    // }
  }
  settings = {
    actions: {
      "position": "right",
      // edit : false, 
      // delete : false ,
      // add : false , 
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
       
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
        filter: true,
       
      },
      fonction: {
        title: 'Fonction',
        type: 'string',
        filter: true,
        
      },
      telephone: {
        title: 'Téléphone',
        type: 'string',
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
        width:'20vw'
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce contact?`)) {
      event.confirm.resolve(this.service.deleteContactMagasins(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    let idMagasin = localStorage.getItem('idMagasin');
    this.service.addContactMagasinsMagasin(event.newData, +idMagasin).subscribe(
      data => {
        this.source.add(event.newData).refresh();
      },
      error => {
        console.log(error);
      },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    let idMagasin = localStorage.getItem('idMagasin');
    this.service.updateContactMagasinsMagasin(event.newData, +idMagasin).subscribe(
      data => {
        this.source.update(event.newData);
      },
      error => {
        console.log('erreur update');
      },
      event.confirm.resolve(event.newData),
    );
  }

}