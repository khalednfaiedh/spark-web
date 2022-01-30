import { Component, OnInit } from '@angular/core';

import { NbWindowService } from '@nebular/theme';
import { ModalCommandeComponent } from './modal-commande/modal-commande.component';
import { ShowCommandeComponent } from './show-commande/show-commande.component';
import { CommandeService } from './commande.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { FactureService } from '../facture/facture.service';
import { ShowFactureComponent } from '../facture/show-facture/show-facture.component';
import { CommandeModel } from './commande.model';
import { ModalFactureComponent } from '../facture/modal-facture/modal-facture.component';
import { ModalEvaluationClientComponent } from '../evaluation-client/modal-evaluation-client/modal-evaluation-client.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesBonCommande } from '../../../authorisation/authorities-bon-commande';
import { AuthoritiesFacture } from '../../../authorisation/authorities-facture';
import { DevisClientModel } from '../devis-client/devis-client.model';
import { DevisClientService } from '../devis-client/devis-client.service';
import { FactureClientModel } from '../facture/Facture.model';
import { ShowNumeriqueCommandeClientComponent } from './show-numerique-commande-client/show-numerique-commande-client.component';
import { EvaluationClientService } from '../evaluation-client/service/evaluationService';
import { EvaluationModel } from '../evaluation-client/evaluation-model';
import { AuthoritiesEvaluationClient } from '../../../authorisation/authorities-evaluation-client';
import { ModalCommandeClientContratComponent } from './modal-commande-client-contrat/modal-commande-client-contrat.component';

@Component({
  selector: 'ngx-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  public static urlCommande = "/pages/vente/commande";
  public static urlRefreshCommande = "/pages/vente/refreshCommande";
  commande: CommandeModel = new CommandeModel();
  devis: DevisClientModel = new DevisClientModel();
  evaluation: EvaluationModel = new EvaluationModel()
  commandes: CommandeModel[];
  facture: any = new Object()
  factures: FactureClientModel[]
  source: any;
  source2: any;
  i: any;
  t: number = 0;
  settings2: any
  constructor(private windowService: NbWindowService
    , private service: CommandeService,
    private router: Router,
    // public datepipe: DatePipe,
    private serviceDevis: DevisClientService,
    private toastrService: NbToastrService,
    private serviceFacture: FactureService, private serviceEvaluation: EvaluationClientService) { }


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

    // if (Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_VALUE)) {
    //   this.settings.actions.custom.push({ name: 'downloadAction', title: '<i class="fas fa-file-download" title="Télécharger"></i>' });

    //  }
    if (Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });

    }
    if (Authorities.hasAutorities(AuthoritiesFacture.FACTURE_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editFacture',
        title: '<i class="ion-clipboard ng-star-inserted" title="Facture"></i>',
      })

    }
    if (Authorities.hasAutorities(AuthoritiesEvaluationClient.EVALUATION_CLIENT_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'evaluation',
        title: '<i class="nb-star" title="Evaluation"></i>'
      })

    }
    this.serviceFacture.getAllFactures().subscribe(dataF => {
      this.factures = dataF
    })
    this.service.getAllcommandeDevis().subscribe(dataC => {
      this.commandes = dataC
      this.source = dataC

    })
    this.service.getAllcommandeContrat().subscribe(dataC => {
      // this.commandes = dataC
      this.source2 = dataC


    })
    this.settings2 = {
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: false,
      },

      actions: {
        add: false,
        edit: false,
        delete: false,
        position: 'right',

        custom: [{
          name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>'
        },
        {
          name: 'editFacture',
          title: '<i class="ion-clipboard ng-star-inserted" title="Facture"></i>',
        },
        {
          name: "showCommandeContrat",
          title: '<i class="nb-sunny" title="Afficher"></i>',

        }

        ],
      },
      columns: {
        code_cmd: {
          title: 'Référence commande',
          type: 'string',
          filter: true,

          valuePrepareFunction(cell, row) {
            return "CMD" + cell
          },
          width: "20%",

        },
        contrat: {
          title: 'Référence contrat',
          type: 'string',
          filter: true,

          valuePrepareFunction(cell, row) {
            return "CTR" + cell.idContrat
          },
          width: "15%",

        },
        code_clt: {
          title: 'Référence Client',
          type: 'string',
          valuePrepareFunction(cell, row) {
            return "CLT" + cell
          },
          width: "15%",


        },
        date_cmd: {
          title: 'Date Commande',
          type: 'Date',
          filter: true,
          width: "15%",

        },
        statut: {
          title: 'Statut',
          type: 'string',
          filter: true,
          width: "20%",

        },
      },
    };
  }

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
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
      code_cmd: {
        title: 'Référence commande',
        type: 'string',
        filter: true,

        valuePrepareFunction(cell, row) {
          return "CMD" + cell
        },
        width: "20%",

      },
      id_devis: {
        title: 'Référence devis',
        type: 'string',
        filter: true,

        valuePrepareFunction(cell) {
          if (cell === null) {
            return "Aucune"
          }
          else {
            return "DVS" + cell
          }
        },
        width: "15%",

      },
      code_clt: {
        title: 'Référence Client',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return "CLT" + cell
        },
        width: "15%",


      },
      date_cmd: {
        title: 'Date Commande',
        type: 'Date',
        filter: true,
        width: "15%",

      },
      statut: {
        title: 'Statut',
        type: 'string',
        filter: true,
        width: "20%",

      },
    },
  };

  openWindow() {


    this.windowService.open(ModalCommandeClientContratComponent,
      {
        title: 'Ajouter commande',
        context: { etat: "add" }
      });
  }
  onCustom(event) {
    if (event.action === 'showAction') {

      if (event.data.id_devis === null) {
        this.windowService.open(ModalCommandeClientContratComponent,
          {
            title: 'Modifier bon de commande',
            context: {
              id: event.data.code_cmd, data: event.data, etat: "show"
            }
          });
      }
      else {



        localStorage.removeItem('e');
        localStorage.removeItem('idCommande');
        localStorage.setItem('idCommande', event.data.code_cmd);

        this.windowService.open(ShowNumeriqueCommandeClientComponent,
          {
            title: 'Afficher commande',
            context: event.data.code_cmd
          });

      }
    }
    if (event.action === 'downloadAction') {

      localStorage.removeItem('e');
      localStorage.removeItem('idCommande');
      localStorage.setItem('idCommande', event.data.code_cmd);

      this.windowService.open(ShowCommandeComponent,
        {
          title: 'Afficher commande',
          context: event.data.code_cmd
        });

    }
    if (event.action === 'editAction') {

      localStorage.setItem('idDevis', event.data.id_devis);
      if (event.data.id_devis === null) {

        this.serviceFacture.getFactureByCommande(event.data.code_cmd).subscribe(
          dataC => {
            if (dataC == null) {

              this.windowService.open(ModalCommandeClientContratComponent,
                {
                  title: 'Modifier bon de commande',
                  context: {
                    id: event.data.code_cmd, data: event.data, etat: "edit"
                  }
                });

            } else { this.showToast(NbToastStatus.DANGER, "Attention", "Modification impossible pour CMD" + event.data.code_cmd + " sa facture est FCT" + dataC.code_fac) }
          })

      }
      else {

        localStorage.removeItem('e');
        localStorage.removeItem('idCommande');
        localStorage.setItem('e', '1');
        localStorage.setItem('idCommande', event.data.code_cmd);
        this.serviceFacture.getFactureByCommande(event.data.code_cmd).subscribe(
          dataC => {
            if (dataC == null) {
              this.windowService.open(ModalCommandeComponent,
                { title: 'Modifier bon de commande', context: { id: event.data.code_cmd } });

            } else { this.showToast(NbToastStatus.DANGER, "Attention", "Modification impossible pour CMD" + event.data.code_cmd + " sa facture est FCT" + dataC.code_fac) }
          })

      }
    }


    if (event.action === 'editFacture') {

      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idCmd', event.data.code_cmd);
      localStorage.setItem('e', '0');
      if (event.data.devis != null) {
        localStorage.setItem('idRC', event.data.devis.demandePrix.iddp);

        localStorage.setItem('idClient', event.data.devis.demandePrix.code_clt);
      }
      this.serviceFacture.getFactureByCommande(event.data.code_cmd).subscribe(
        dataFC => {
          if (dataFC != null) {
            this.serviceDevis.getDevisById(dataFC.id_devis).subscribe(dataDevis => {
              if (dataDevis.typePaiement == "Date fixe" && dataDevis.datePaiement == null) {
                this.showToast(NbToastStatus.DANGER, "Attention !!", "Indiquer le date de paiement pour la DVS" + dataDevis.id_devis)
              }
            })

            this.showToast(NbToastStatus.DANGER, "Facture existe déja", "référence du facture : FCT" + dataFC.code_fac)
          }
          else {
            this.windowService.open(ModalFactureComponent,
              { title: 'Facture', context: { id: event.data.code_cmd } });
          }
        })

    }

    if (event.action === 'showCommandeContrat') {

      this.windowService.open(ModalCommandeClientContratComponent,
        { title: 'Afficher commande', context: { id: event.data.code_cmd, data: event.data, etat: "show" } });
    }




    if (event.action === 'evaluation') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');

      localStorage.setItem('idRC', event.data.code_cmd);
      this.serviceEvaluation.getEvaluationbyIdBC(event.data.code_cmd).subscribe(data => {
        if (data == null) {
          this.windowService.open(ModalEvaluationClientComponent,
            { title: 'Evaluer la bon de commande', context: { id: event.data.code_cmd } });
        } else {
          this.showToast(NbToastStatus.DANGER, "Evaluation existe déja", "référence d'évaluation : EVL" + data.idEvaluation)
        }
      })


    }
  }
  onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer cette commande??`)) {
      event.confirm.resolve(this.service.deleteCommandes(event.data.code_cmd).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }


}

