import { Component, OnInit } from '@angular/core';
import { ModalDevisClientComponent } from './modal-devis-client/modal-devis-client.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ShowDevisClientComponent } from './show-devis-client/show-devis-client.component';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DevisClientService } from './devis-client.service';
import { Router } from '@angular/router';
import { DevisClientModel } from './devis-client.model';
import { CommandeService } from '../commande/commande.service';
import { ToasterConfig } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { ModalCommandeComponent } from '../commande/modal-commande/modal-commande.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesDevisClient } from '../../../authorisation/authorities-devis-client';
import { AuthoritiesCommande } from '../../../authorisation/authorities-commande';
import { CommandeModel } from '../commande/commande.model';
import { ShowNumeriqueDevisClientComponent } from './show-numerique-devis-client/show-numerique-devis-client.component';

@Component({
  selector: 'ngx-devis-client',
  templateUrl: './devis-client.component.html',
  styleUrls: ['./devis-client.component.scss']
})
export class DevisClientComponent implements OnInit {
  public static urlDevisClient = "/pages/vente/devisClient";
  public static urlRefreshDevisClient = "/pages/vente/refreshDevisClient";
  devis: DevisClientModel = new DevisClientModel();
  commande: CommandeModel = new CommandeModel();
  commandes: CommandeModel[];
  devises: DevisClientModel[];
  facture: any = new Object()
  source: any;
  i: any;
  t: number = 0;
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private windowService: NbWindowService
    , private service: DevisClientService,

    private router: Router,
    public datepipe: DatePipe,
    private toastrService: NbToastrService,
    private serviceCommande: CommandeService) { }


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

    this.service.getAllDevis(+this.idEntr).subscribe(
      data => {
        this.devises = data
        console.log("Devis", data)
        for (this.i = 0; this.i < data.length; this.i++) {
          var dateCommande = new Date(data[this.i].dateDevis)
          //   var dateCommandestr = this.datepipe.transform(dateCommande, 'dd-MM-yyyy')
          //  data[this.i].dateDevis = dateCommandestr

        }




        this.source = data
      },
      error => { console.log(error); });


    if (Authorities.hasAutorities(AuthoritiesDevisClient.DEVIS_CLIENT_VALUE)) {
      this.settings.actions.custom.push({ name: 'downloadAction', title: '<i class="fas fa-file-download" title="Télécharger"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesDevisClient.DEVIS_CLIENT_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesDevisClient.DEVIS_CLIENT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Modifier"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesDevisClient.DEVIS_CLIENT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesCommande.COMMANDE_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editCommande',
        title: '<i class="ion-clipboard ng-star-inserted" title="Commande"></i>',
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
    custom: [{ name: 'View', title: `<i class="fa fa-eye" aria-hidden="true"></i>` },
    { name: 'View', title: `<i class="fa fa-eye" aria-hidden="true"></i>` },
    { name: 'View', title: `<i class="fa fa-eye" aria-hidden="true"></i>` },
    ],
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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

      id_devis: {
        title: 'Référence devis',
        type: 'string',
        filter: true,
        width: "20%",
        valuePrepareFunction(cell, row) {
          return "DVS" + cell
        }
      },
      demandePrix: {
        title: 'Référence Demande prix',
        type: 'string',
        filter: true,
        width: "20%",
        valuePrepareFunction(cell, row) {
          return "DMD" + cell.iddp;
        }
      },
      dateDevis: {
        title: 'Date devis',
        type: 'Date',
        filter: true,
        width: "15%",
      },
      validite_devis: {
        title: 'Validité(Jours)',
        type: 'number',
        filter: true,
        width: "15%"
      },
      statusDevis: {
        title: 'Status',
        type: 'string',
        filter: true,
        width: "15%"
      }
    },
  };



  onCustom(event) {
    if (event.action === 'downloadAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.id_devis);
      this.windowService.open(ShowDevisClientComponent,
        {
          title: 'Afficher devis',
          context: event.data.id
        });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.removeItem('idClient');
      localStorage.setItem('idDevis', event.data.id_devis);
      localStorage.setItem('idRC', event.data.demandePrix.iddp);
      localStorage.setItem('idClient', event.data.demandePrix.code_clt);
      localStorage.setItem('idUniteTransaction', event.data.idUniteTransaction)
      this.windowService.open(ShowNumeriqueDevisClientComponent,
        {
          title: 'Afficher devis',
          context: event.data.id_devis
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idDevis');
      localStorage.setItem('e', '1');
      localStorage.setItem('idRC', event.data.demandePrix.iddp);
      localStorage.setItem('idClient', event.data.demandePrix.code_clt);
      localStorage.setItem('idDevis', event.data.id_devis);
      localStorage.setItem('idUniteTransaction', event.data.idUniteTransaction)
      this.serviceCommande.getCommandeByDevis(event.data.id_devis).subscribe(dataC => {

        if (dataC != null) {
          this.showToast(NbToastStatus.DANGER, "Attention", "Modification impossible pour DVS" + event.data.id_devis + " sa bons de commande est CMD" + dataC.code_cmd)
        } else {
          this.windowService.open(ModalDevisClientComponent,
            { title: 'Modifier devis', context: { id: event.data.id_devis } });
        }
      })
    }

    if (event.action === 'editCommande') {
      localStorage.removeItem('e');
      localStorage.removeItem('idDevis');
      localStorage.setItem('idDevis', event.data.id_devis);
      localStorage.setItem('e', '0');

      if (event.data.status != "Accepté par le client") {
        this.showToast(NbToastStatus.DANGER, "Attention", "DVS" + event.data.id_devis + "  doit accepter par le client pour passer la bons de commande")
      } else this.serviceCommande.getCommandeByDevis(event.data.id_devis).subscribe(dataC => {
        this.commande = dataC
        if (dataC != null) {
          this.showToast(NbToastStatus.DANGER, "Attention", "Commande existe déja ,référence du commande : CMD" + this.commande.code_cmd)
        }
        else {
          this.windowService.open(ModalCommandeComponent,
            { title: 'Commande', context: { id: event.data.id_devis } });

        }
      })

    }

  }
  onDeleteConfirm(event) {

    this.serviceCommande.getCommandeByDevis(event.data.id_devis).subscribe(dataC => {
      if (dataC != null) {
        this.showToast(NbToastStatus.DANGER, "Impossible", " de supprimer ce devis sa bons de commande est CMD" + dataC.code_cmd)
      } else {
        if (window.confirm(`Vous êtes sure de supprimer ce devis??`)) {
          event.confirm.resolve(this.service.deleteDeviss(event.data.id_devis).subscribe(
            data => {
              this.source.filter(p => p !== event.data);
            }),
          );

        } else {
          event.confirm.reject();
        }
      }
    })


  }



}
