import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { ClientService } from './client.service';
import { ViewCell } from 'ng2-smart-table';
import { AdresseLivraisonClientComponent } from './adresse-livraison-client/adresse-livraison-client.component';
import { CoordonnesBancaireClientComponent } from './coordonnes-bancaire-client/coordonnes-bancaire-client.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesClient } from '../../../authorisation/authorities-client';
import { ShowClientComponent } from './show-client/show-client.component';
import { ModalClientComponent } from './modal-client/modal-client.component'
import { SelectComponent } from '../../vente/select/select.component';
import { ModalDemandePrixClientComponent } from '../../vente/demande-prix-client/modal-demande-prix-client/modal-demande-prix-client.component';
import { AuthoritiesDemandePrixClient } from '../../../authorisation/authorities-demande-prix-client';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    ' <input (click)="onClick()" nbButton type="submit" value="Coordonnées Bancaire"/>\n' +
    ' </div>',
})
export class ButtonViewCoordonneesComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) {
  }

  onClick() {
    localStorage.setItem('codeCLT', this.rowData.code_clt);
    this.windowService.open(CoordonnesBancaireClientComponent);
  }
}


@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    ' <input (click)="onClickAdresse()" nbButton type="submit" value="Adresse Livraison"/>\n' +
    ' </div>',
})
export class ButtonViewAdresseComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) {
  }

  onClickAdresse() {
    localStorage.setItem('codeCLT', this.rowData.code_clt);
    this.windowService.open(AdresseLivraisonClientComponent);
  }
}

@Component({
  selector: 'ngx-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public static urlClient = "/pages/admin/client";
  public static urlRefreshClient = "/pages/admin/refreshClient";

  constructor(private windowService: NbWindowService,
    private service: ClientService, private toastrService:
      NbToastrService, ) { }
  source: any;
  add = true;
  ngOnInit() {
    let idEntr = localStorage.getItem('current_entreprise')
    console.log("idEN", +idEntr)
    this.service.getAllClient(+idEntr).subscribe(
      data => {
        this.source = data;
        console.log("dataClient", this.source)
      },
      error => { console.log('erreur'); });

    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_ADD_VALUE)) {

      this.settings.actions.custom.push({ name: 'demande', title: '<i class="ion-clipboard ng-star-inserted" title="Demande de prix"></i>' })
    }
    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesClient.CLIENT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
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
      "columkey": {
        type: 'html'
      },
      custom: [



      ],
    },
    columns: {
      code_clt: {
        title: 'Référence',
        type: 'string',
        filter: true,
        width: "10%",
        valuePrepareFunction(cell, row) {
          return "Clt" + cell
        }
      },
      nameC: {
        title: 'Raison sociale',
        type: 'string',
        filter: true,
        width: "20%",
      },

      tlfC: {
        title: 'Téléphone',
        type: 'number',
        filter: true,
        width: "20%",
      },

      emailC:
      {
        title: "Email",
        type: 'string',
        filter: true,
        width: "30%",
      },
      typeC: {
        title: "Etat",
        type: 'string',
        filter: true,
      }
    }
  }
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idClient');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalClientComponent,
      { title: 'Ajouter un client' });
  }

  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idClient');
      localStorage.setItem('idClient', event.data.code_clt);
      this.windowService.open(ShowClientComponent,
        {
          title: 'Afficher les informations de ce client',
          context: event.data.code_clt
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idClient');
      localStorage.setItem('e', '1');
      localStorage.setItem('idClient', event.data.code_clt);
      this.windowService.open(ModalClientComponent,
        { title: 'Modifier un client', context: event.data.code_clt });
    }

    if (event.action === 'demande') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('e', '3');
      localStorage.setItem('idClient', event.data.code_clt);
      if (event.data.typeC == "Bloqué") {
        this.showToast(NbToastStatus.DANGER, "Client", "CLT" + event.data.code_clt + " " + "est bloqué")
      } else {

        this.windowService.open(ModalDemandePrixClientComponent,
          { title: 'Ajouter une demande de prix  ', context: { id: event.data.code_clt } });
      }
    }



  }

  onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce client?`)) {
      event.confirm.resolve(this.service.deleteClient(event.data.code_clt).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
          this.showToast(NbToastStatus.SUCCESS, "Suppression", "CLT" + event.data.code_clt + " " + "avec succéss")
        }),
      );
    } else {
      event.confirm.reject();
    }
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