import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DemandePrixClientService } from './demande-prix-client.service';
import { ModalDemandePrixClientComponent } from './modal-demande-prix-client/modal-demande-prix-client.component';
import { ShowDemandePrixClientComponent } from './show-demande-prix-client/show-demande-prix-client.component';
import { DatePipe } from '@angular/common';
import { ModalDevisClientComponent } from '../devis-client/modal-devis-client/modal-devis-client.component';
import { Authorities } from '../../../authorisation/authorities';
import { DevisClientService } from '../devis-client/devis-client.service';
import { CommandeService } from '../commande/commande.service';
import { CommandeModel } from '../commande/commande.model';
import { DevisClientModel } from '../devis-client/devis-client.model';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ShowNumeriqueDemandePrixClientComponent } from './show-numerique-demande-prix-client/show-numerique-demande-prix-client.component';
import { AuthorisationVente } from '../../../authorisation/authorisationVente';
import { AuthoritiesDemandePrixClient } from '../../../authorisation/authorities-demande-prix-client';
import { AuthoritiesDevisClient } from '../../../authorisation/authorities-devis-client';

@Component({
  selector: 'ngx-demande-prix-client',
  templateUrl: './demande-prix-client.component.html',
  styleUrls: ['./demande-prix-client.component.scss']
})
export class DemandePrixClientComponent implements OnInit {
  public static urlDemandePrixClient = "/pages/vente/demandePrixClient";
  public static urlRefreshDemandePrixClient = "/pages/vente/refreshDemandePrixClient";
  commandes: CommandeModel[]
  listDevis: DevisClientModel[]
  idEntr = localStorage.getItem('current_entreprise')
  constructor(
    private windowService: NbWindowService,
    private service: DemandePrixClientService,
    private serviceDevis: DevisClientService,
    private serviceCommande: CommandeService,
    private toastrService: NbToastrService,
    public datepipe: DatePipe, ) { }

  source: any;

  i: any

  config: ToasterConfig;

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

  ngOnInit() {

    console.log(Authorities.getUserInfo())

    this.service.getAllDemandePrix(+this.idEntr).subscribe(
      data => {
        for (this.i = 0; this.i < data.length; this.i++) {
          var dateCommande = new Date(data[this.i].date_list)
          var dateCommandestr = this.datepipe.transform(dateCommande, 'dd-MM-yyyy')
          data[this.i].date_list = dateCommandestr
        }
        this.source = data
        console.log(data)
      },
      error => { console.log(error); });
    console.log("ok ", Authorities.hasAutorities(AuthorisationVente.VENTE))
    if (Authorities.hasAutorities(AuthorisationVente.VENTE)) {
      this.settings.actions.custom.push({ name: 'downloadAction', title: '<i class="fas fa-file-download" title="Télécharger"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesDemandePrixClient.DEMANDE_PRIX_CLIENT_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesDemandePrixClient.DEMANDE_PRIX_CLIENT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesDemandePrixClient.DEMANDE_PRIX_CLIENT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }

    if (Authorities.hasAutorities(AuthoritiesDevisClient.DEVIS_CLIENT_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editDevis',
        title: '<i class="ion-clipboard ng-star-inserted" title="Devis"></i>',
      })
    }
  }

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },

    position: 'right',

    /* custom: [{ name: 'View', title: `<i class="fa fa-eye" aria-hidden="true"></i>` },
     { name: 'View', title: `<i class="fa fa-eye" aria-hidden="true"></i>` },
     { name: 'View', title: `<i class="fa fa-eye" aria-hidden="true"></i>` },
     ],*/

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    actions: {
      width: "50%",
      add: false,
      edit: false,
      delete: false,
      position: 'right',

      custom: [
      ],
    },
    columns: {

      iddp: {
        title: 'Référence demande prix',
        type: 'string',
        filter: true,

        valuePrepareFunction(cell, row) {
          return "DMD" + cell
        }
      },
      code_clt: {
        title: 'Référence Client',
        type: 'string',
        filter: true,

        valuePrepareFunction(cell, row) {
          return "CLT" + cell
        }
      },
      date_list: {
        title: 'Date Demande Prix',
        type: 'Date',
        filter: true,

      },

      status: {
        title: 'Status',
        type: 'string',
        filter: true,
        width: "10%"
      }
    },
  };

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalDemandePrixClientComponent,
      { title: 'Ajouter un demande' });
  }

  onCustom(event) {
    if (event.action === 'downloadAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      this.windowService.open(ShowDemandePrixClientComponent,
        {
          title: 'Afficher les informations de cette demande prix',
          context: event.data.iddp
        });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      this.windowService.open(ShowNumeriqueDemandePrixClientComponent,
        {
          title: 'Afficher les informations de cette demande prix',
          context: event.data.iddp
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      localStorage.setItem('idClient', event.data.code_clt);
      localStorage.setItem('e', '1');
      this.serviceDevis.getDeVisByDMD(event.data.iddp).subscribe(dataD => {
        console.log("dataD", dataD)
        if (dataD.length == 0) {
          this.windowService.open(ModalDemandePrixClientComponent,
            {
              title: 'Modifier les informations de cette demande prix',
              context: { id: event.data.iddp }
            });
        } else {
          for (let i = 0; i < dataD.length; i++) {
            this.serviceCommande.getCommandeByDevis(dataD[i].id_devis).subscribe(dataC => {
              if (dataC == null) {
                this.windowService.open(ModalDemandePrixClientComponent,
                  {
                    title: 'Modifier les informations de cette demande prix',
                    context: { id: event.data.iddp }
                  });
              }
              else {
                this.showToast(NbToastStatus.DANGER, "Impossible", "cette demande de prix sa bons de commande est CMD" + dataC.code_cmd)
              }
            })
          }
        }
      })


    }
    if (event.action === 'editDevis') {
      localStorage.removeItem('e');
      localStorage.removeItem('idDP');
      localStorage.removeItem('idUniteTransaction')
      localStorage.setItem('idRC', event.data.iddp);
      localStorage.setItem('idUniteTransaction', event.data.idUniteTransaction)

      localStorage.setItem('idClient', event.data.code_clt);
      localStorage.setItem('e', '0');
      this.windowService.open(ModalDevisClientComponent,
        { title: 'Devis', context: { id: event.data.iddp } });
    }
  }
  onDeleteConfirm(event) {
    console.log(event.data)
    if (window.confirm(`Vous êtes sure de supprimer cette demande prix?`)) {
      this.serviceDevis.getDeVisByDMD(event.data.iddp).subscribe(dataD => {
        console.log("dataD", dataD)
        if (dataD.length == 0) {
          event.confirm.resolve(this.service.deleteDemandePrix(event.data.iddp).subscribe(
            data => {
              this.showToast(NbToastStatus.SUCCESS, "Demande de prix", "est supprimer avec succéss")
              this.source.filter(p => p !== event.data);
            }),
          );
        } else {
          for (let i = 0; i < dataD.length; i++) {
            this.serviceCommande.getCommandeByDevis(dataD[i].id_devis).subscribe(dataC => {

              this.showToast(NbToastStatus.DANGER, "Impossible", " de supprimer cette demande de prix sa bons de commande est CMD" + dataC.code_cmd)

            })
          }
        }
      })

    } else {
      event.confirm.reject();
    }
  }
}
