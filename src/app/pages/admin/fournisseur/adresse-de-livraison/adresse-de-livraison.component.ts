import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { FournisseurComponent } from '../fournisseur.component';
import { AdresseDeLivraisonService } from './adresse-de-livraison.service';


@Component({
  selector: 'ngx-adresse-de-livraison',
  templateUrl: './adresse-de-livraison.component.html',
  styleUrls: ['./adresse-de-livraison.component.scss']
})
export class AdresseDeLivraisonComponent implements OnInit {
  source: any;
  e = localStorage.getItem('e')
  constructor(private service: AdresseDeLivraisonService, private router: Router, private windowRef: NbWindowRef) { }

  ngOnInit() {
    let idFournisseur = localStorage.getItem('idFournisseur');
    this.service.getadresseDeLivraisonsFournisseur(+idFournisseur).subscribe(
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
      adresse: {
        title: 'Adresse',
        type: 'string',
        filter: true,
        width: '300px',
      },
      ville: {
        title: 'Ville',
        type: 'string',
        filter: true,
      },
      pays: {
        title: 'Pays',
        type: 'string',
        filter: true,
      },
      codePostal: {
        title: 'Code postal',
        type: 'number',
        filter: true,

      },
      telephone: {
        title: 'Téléphone',
        type: 'string',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sûr(e) de supprimer cette adresse de livraisons ?`)) {
      event.confirm.resolve(this.service.deleteAdresseDeLivraisons(event.data.id).subscribe(
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
    this.service.AddAdresseDeLivraisonsFournisseur(event.newData, +idFournisseur).subscribe(
      data => {
      },
      error => {
        console.log(error);
      },
      event.confirm.resolve(event.newData),
    );
  }
  onSaveConfirm(event): any {
    let idFournisseur = localStorage.getItem('idFournisseur');
    this.service.updateadresseDeLivraisonsFournisseur(event.newData, +idFournisseur).subscribe(
      data => {
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


