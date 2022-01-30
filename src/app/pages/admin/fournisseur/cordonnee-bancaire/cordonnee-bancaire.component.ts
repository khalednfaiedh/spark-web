import { Component, OnInit } from '@angular/core';
import { CordonneeBancaireService } from './cordonnee-bancaire.service';
import { BanqueService } from '../../banque/banque.service';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesCoordonneesBancaire } from '../../../../authorisation/authorities-coordonnees-bancaire';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { FournisseurComponent } from '../fournisseur.component';

@Component({
  selector: 'ngx-cordonnee-bancaire',
  templateUrl: './cordonnee-bancaire.component.html',
  styleUrls: ['./cordonnee-bancaire.component.scss']
})
export class CordonneeBancaireComponent implements OnInit {
  source: any;
  add: boolean = true;
  banques: any = [];
  e = localStorage.getItem('e')
  constructor(private service: CordonneeBancaireService, private serviceBanque: BanqueService, private router: Router, private windowRef: NbWindowRef) { }

  ngOnInit() {

    let idFournisseur = localStorage.getItem('idFournisseur');
    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceBanque.getAllBanques(+idEntr).subscribe(
      data => {
        data.forEach(banque => {
          this.banques.push({ value: banque.id, title: banque.nom });
          this.settings.columns.idBanque.filter.config.list = this.banques;
          this.settings.columns.idBanque.editor.config.list = this.banques;
          this.settings = Object.assign({}, this.settings);

        });
      },
      error => {
        console.log("error");
      });

    this.service.getCoordonneesBancaireFournisseur(+idFournisseur).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });
    if (this.e === '1' || this.e === '0') {
      if (Authorities.hasAutorities(AuthoritiesCoordonneesBancaire.COORDOONEES_BANCAIRE_DELETE_VALUE)) {
        this.settings.actions.delete = true;
      }
      if (Authorities.hasAutorities(AuthoritiesCoordonneesBancaire.COORDOONEES_BANCAIRE_UPDATE_VALUE)) {
        this.settings.actions.edit = true
      }
      if (Authorities.hasAutorities(AuthoritiesCoordonneesBancaire.COORDOONEES_BANCAIRE_ADD_VALUE)) {
        this.settings.actions.add = true
        console.log(AuthoritiesCoordonneesBancaire.COORDOONEES_BANCAIRE_ADD_VALUE);
      }
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
      idBanque: {
        title: 'Banque',
        type: 'list',
        width: '350px',
        valuePrepareFunction: (cell, row) => {
          return row.nomBanque;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Banque',
            list: this.banques.nom,
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Banque',
            list: this.banques.nom,
            valuePrepareFunction: (cell, row) => {
              return row.nomBanque;
            },
          },
        },
      },
      rib: {
        title: 'Rib',
        type: 'string',
        filter: true,
        width: '400px',

        valuePrepareFunction: (data) => {
          if (data == '') {
            return '<p class="danger">' + data + '</p>'

          } else
            return '<p class="success">' + data + '</p>'

        }
      },
      bic: {
        title: 'Bic',
        type: 'string',
        filter: true,
        width: '200px',
      },
      iban: {
        title: 'Iban',
        type: 'string',
        filter: true,
        width: '400px',
      },
    }
  };
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sûr(e) de supprimer cet coordonnees bancaire?`)) {
      event.confirm.resolve(this.service.deleteCoordonneesBancaire(event.data.id).subscribe(
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
    this.service.AddCoordonneesBancaireFournisseur(event.newData, +idFournisseur).subscribe(
      data => {
        this.service.getCoordonneesBancaireFournisseur(+idFournisseur).subscribe(
          data => { this.source = data; },
          error => { console.log('error'); });
        this.source.add(event.newData).refresh();
      },
      error => {
        console.log(error);
      },
      event.confirm.resolve(event.newData),
    );
  }
  onSaveConfirm(event): any {
    let idFournisseur = localStorage.getItem('idFournisseur');
    this.service.updateCoordonneesBancaireFournisseur(event.newData, +idFournisseur).subscribe(
      data => {
        this.service.getCoordonneesBancaireFournisseur(+idFournisseur).subscribe(
          data => { this.source = data; },
          error => { console.log('error'); });
        this.source.update(event.newData);
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