import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowService } from '@nebular/theme';
import { ContratClientService } from './contrat-client.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesContratClient } from '../../../authorisation/authorities-contrat-client';
import { ModalContratClientComponent } from './modal-contrat-client/modal-contrat-client.component';
import { AuthoritiesCommande } from '../../../authorisation/authorities-commande';
import { ModalCommandeClientContratComponent } from '../commande/modal-commande-client-contrat/modal-commande-client-contrat.component';

@Component({
  selector: 'ngx-contrat-client',
  templateUrl: './contrat-client.component.html',
  styleUrls: ['./contrat-client.component.scss']
})
export class ContratClientComponent implements OnInit {
  public static urlContratClient = "/pages/vente/contratClient";
  public static urlRefreshContratClient = "/pages/vente/refreshContratClient";

  source: any;
  add: any;
  constructor(private windowService: NbWindowService,
    private serviceContrat: ContratClientService) { }

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesContratClient.CONTRAT_CLIENT_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesContratClient.CONTRAT_CLIENT_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesContratClient.CONTRAT_CLIENT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesContratClient.CONTRAT_CLIENT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesCommande.COMMANDE_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editCommande',
        title: '<i class="ion-clipboard ng-star-inserted" title="Commande"></i>',
      })
    }
    this.serviceContrat.getAllContrat().subscribe(data => { this.source = data },
      error => { console.log(error) })
  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',

      custom: [

      ],
    },
    columns: {
      idContrat: {
        title: 'Référence',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return "CTR" + row.idContrat
        }
      },
      codeClt: {
        title: 'Client',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return "CLT" + row.codeClt
        }
      },
      type: {
        title: 'Type',
        type: 'string',
        filter: true,
      },
      datecreation: {
        title: 'Date de création',
        type: 'Date',
        filter: true,
      },
      active: {
        title: 'Active',
        type: 'String',
        filter: true,
      }
    }
  }
  openWindow() {
    localStorage.removeItem('etatContrat');
    this.windowService.open(ModalContratClientComponent, {
      title: 'Ajouter un contrat',
      context: { etat: 'add' }

    })
  }

  onCustom(event) {
    if (event.action === 'showAction') {

      this.windowService.open(ModalContratClientComponent,
        {
          title: 'Afficher les informations de ce   Contrat',
          context: {
            data: event.data,
            etat: 'show',
            disabled: true
          }
        });
    }
    if (event.action === 'editAction') {
      this.windowService.open(ModalContratClientComponent,
        {
          title: ' Modfier   les informations de ce  Contrat ',
          context: {
            data: event.data,
            etat: 'edit',
            disabled: false,

          }
        });
    }
    if (event.action === 'editCommande') {
      localStorage.removeItem('e');
      localStorage.removeItem('idContrat');
      localStorage.setItem('idContrat', event.data.idContrat);
      localStorage.setItem('e', '0');
      localStorage.setItem('etatContrat', 'show');
      this.windowService.open(ModalCommandeClientContratComponent,
        { title: 'Commande', context: { id: event.data.idContrat, etat: 'add', } });




    }
  }

  onDeleteConfirm(event) {

    this.serviceContrat.getContratById(event.data.idContrat).subscribe(dataC => {

      if (window.confirm(`Vous êtes sure de supprimer ce devis??`)) {
        event.confirm.resolve(this.serviceContrat.deleteContrat(event.data.idContrat).subscribe(
          data => {
            this.source.filter(p => p !== event.data);
          }),
        );

      } else {
        event.confirm.reject();
      }
    }

    )

  }

}
