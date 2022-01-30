import { Component, OnInit } from '@angular/core';
import { CoordonnesBancaireClientService } from './service/coordonnes-bancaire-client.service';
import { BanqueService } from '../../banque/banque.service';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesCoordonneesBancaire } from '../../../../authorisation/authorities-coordonnees-bancaire';
import { ClientComponent } from '../client.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AuthoritiesClient } from '../../../../authorisation/authorities-client';

@Component({
  selector: 'ngx-coordonnes-bancaire-client',
  templateUrl: './coordonnes-bancaire-client.component.html',
  styleUrls: ['./coordonnes-bancaire-client.component.scss']
})
export class CoordonnesBancaireClientComponent implements OnInit {
  source: any;
  add: boolean = true;
  banques: any = [];

  constructor(private service: CoordonnesBancaireClientService,
    private serviceBanque: BanqueService
    , private router: Router, private windowRef: NbWindowRef, private toastrService: NbToastrService) {

  }
  ngOnInit() {


    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceBanque.getAllBanques(+idEntr).subscribe(
      data => {
        console.log(data);
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

    /*this.serviceBanque.getAllBanques().subscribe(
      data => {
        console.log(data);
        data.forEach(banque => {
          this.banques.push({ value: banque.id, title: banque.nom });
          this.settings.columns.banque.filter.config.list = this.banques;
          this.settings.columns.banque.editor.config.list = this.banques;
          this.settings = Object.assign({}, this.settings);

        });

      },
      error => {
        console.log("error");
      });*/
    let codeCLT = localStorage.getItem('idClient');
    this.service.getCoordonneesBancairesClient(+codeCLT).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });
    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_VALUE)) {
      this.settings.actions.edit = true
    }
    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_VALUE)) {
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
      idBanque: {
        title: 'Banque',
        type: 'list',
        width: '200px',
        valuePrepareFunction: (cell, row) => {
          return row.nomBanque;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Banque',
            list: this.banques.nom,

          }

        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Banque',
            list: this.banques.nom,

          }
        },
        singleSelection: false,
      },
      rib: {
        title: 'Rib',
        type: 'string',
        filter: true,
        width: '400px',
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

    },
  };
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce coordonnée bancaire?`)) {
      event.confirm.resolve(this.service.deleteCoordonneesBancairesClient(event.data.idC).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
          this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est supprimer avec succéss")
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
      this.service.addCoordonneesBancairesClient(event.newData, +codeCLT).subscribe(
        data => {
          this.service.getCoordonneesBancairesClient(+codeCLT).subscribe(
            data => { this.source = data; },
            error => { console.log('error'); });
          this.source.add(event.newData).refresh();
          console.log("data==>", data)
          this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est ajouter avec succéss")

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
    this.service.updateCoordonneesBancairesClient(event.newData, event.newData.id, +codeCLT).subscribe(
      data => {

        this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est modifer avec succéss")
        this.service.getCoordonneesBancairesClient(+codeCLT).subscribe(
          data => { this.source = data; },
          error => { console.log('error'); });

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
