import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture/facture.service';
import { FactureClientModel } from '../facture/Facture.model';
import { CommandeService } from '../commande/commande.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SuividePaiementModel } from './Suivi-de-paiement-model';
import { SuiviDePaiementService } from './suivi-de-paiement.service';
import { NbWindowService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ModalSuiviDePaiementComponent } from './modal-suivi-de-paiement/modal-suivi-de-paiement.component';
import { ShowSuiviDePaiementComponent } from './show-suivi-de-paiement/show-suivi-de-paiement.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterService } from 'angular2-toaster';
import { BonsDePaiementComponent } from './bons-de-paiement/bons-de-paiement.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesSuiviPaiement } from '../../../authorisation/authorities-suivi-paiement';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-suivide-paiement',
  templateUrl: './suivide-paiement.component.html',
  styleUrls: ['./suivide-paiement.component.scss']
})
export class SuividePaiementComponent implements OnInit {
  public static urlSuiviPaiement = "/pages/vente/suiviPaiement";
  public static urlRefreshSuiviPaiement = "/pages/vente/refreshSuiviPaiement";
  factures: FactureClientModel[]
  facture = new FactureClientModel;
  source: LocalDataSource = new LocalDataSource()
  liste: any[] = []
  suiviPaiements: any[]
  count: number
  codFacture: number
  referenceFactureNP: any[] = []
  referenceFacturePP: any[] = []
  constructor(
    private serviceSP: SuiviDePaiementService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private factureService: FactureService) { }

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesSuiviPaiement.SUIVI_PAIEMENT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction', title: '<i class="nb-edit" title="Modifer"></i>'

      })
    }
    if (Authorities.hasAutorities(AuthoritiesSuiviPaiement.SUIVI_PAIEMENT_VALUE)) {
      this.settings.actions.custom.push({
        name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>'

      })
    }
    // if (Authorities.hasAutorities(AuthoritiesSuiviPaiement.SUIVI_PAIEMENT_VALUE)) {
    //   this.settings.actions.custom.push({
    //     name: 'downloadAction', title: `<i class="fas fa-file-download" title="Télécharger"></i>`

    //   }
    // )
    // }


    this.codFacture = this.route.snapshot.params['id'];
    this.factureService.getFactureById(this.codFacture).subscribe(
      response => { this.facture = response; console.log(response) }
    )

    console.log("data with url", this.codFacture)

    this.serviceSP.getSuiviPaiementByFacture(this.codFacture).subscribe(
      response => { this.source = response; console.log(this.source) },
      err => { console.log('err get  suivi paiement by id  facture') }
    )

    // this.serviceSP.findAllSuiviPaiement().subscribe(dataSP => {
    //   for (let i = 0; i < dataSP.length; i++) {
    //     this.liste.push({
    //       "id": dataSP[i].id,
    //       "code_fac": dataSP[i].code_fac,
    //       "option": dataSP[i].option,
    //       "designation": dataSP[i].designation,
    //       "devise": dataSP[i].devise,
    //       "datePaiement": dataSP[i].datePaiement,
    //       "dateCreation": dataSP[i].dateCreation,
    //       "montantPayer": dataSP[i].montantPayer,
    //       "montantReste": dataSP[i].montantReste,
    //       "statutPaiement": dataSP[i].statutPaiement,
    //       "typePaiement": dataSP[i].typePaiement,


    //     })

    //   }
    //   this.source = new LocalDataSource(this.liste);
    // })

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

      datePaiement: {
        title: 'Date de paiement',
        type: 'string',
        filter: true,

      },
      datemisjour: {
        title: 'Dérnier mis à jour',
        type: 'Date',
        filter: true,

      },
      modeDePaiement: {
        title: 'Mode paiement',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return cell.typePaiement
        }
      },
      statutPaiement: {
        title: 'Statut de paiement',
        type: 'string',
        valuePrepareFunction(cell, row) {
          if (cell === "nonPayee") {
            return "Non Payée"
          }
          else {
            return "Payée"
          }
        }

      },




      montantPayer: {
        title: 'Montant à payer',
        type: 'number',
        filter: true,
        valuePrepareFunction(cell, row) {
          return row.montantPayer + " " + row.devise
        }
      },
      echeance: {
        title: '   écheance',
        type: 'number',
        filter: true,
        sortDirection: 'asc'

      },
    }
  };

  getMontatRest() {
    // return this.facture.montantPayee - (this.facture.avence + this.facture.totalEchencePayee);
  }

  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idSP');
      localStorage.setItem('idSP', event.data.id);
      this.windowService.open(ModalSuiviDePaiementComponent,
        {
          title: 'Afficher les paiements',
          context: {
            idSuivi: event.data.id,
            id: 2,
            idfacture: this.codFacture
          }
        });
    }
    if (event.action === 'editAction') {

      localStorage.setItem('idSP', event.data.id);

      this.windowService.open(ModalSuiviDePaiementComponent,
        { title: 'Modifier paiement', context: { idSuivi: event.data.id, id: 1, idfacture: this.codFacture } });
    }
    if (event.action === 'downloadAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idSP');
      localStorage.setItem('idSP', event.data.id);

      this.windowService.open(BonsDePaiementComponent,
        {
          title: 'Télécharger cette paiement',
          context: { id: event.data.id }
        });

    }

  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 20000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };




    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
  countNP() {
    this.serviceSP.countSPNP().subscribe(dataSPNP => {

      console.log("test", dataSPNP.length)
      this.count = dataSPNP.length
      for (let i = 0; i < dataSPNP.length; i++) {
        this.referenceFactureNP.push({
          "code_fac": dataSPNP[i].code_fac
        })

      }
      console.log("referenceFacture", this.referenceFactureNP.map(dataRF => + dataRF.code_fac))
      this.showToast(NbToastStatus.DANGER, "Attention", "Il ya " + this.count + " " + "facture Non Payéé Totalement" + " " + this.referenceFactureNP.map(dataRF => "FCT" + dataRF.code_fac))

    })
    this.serviceSP.countSPPP().subscribe(dataSPPP => {
      console.log("DATASPPP", dataSPPP)
      this.count = dataSPPP.length
      for (let j = 0; j < dataSPPP.length; j++) {
        this.referenceFacturePP.push({
          "code_fac": dataSPPP[j].code_fac
        })
      }

      this.showToast(NbToastStatus.WARNING
        , "Attention", "Il ya " + this.count + " " + "facture Partiellement Payée " + this.referenceFacturePP.map(dataRF => "FCT" + dataRF.code_fac))

    })

  }
  openWindow() {
    this.windowService.open(ModalSuiviDePaiementComponent,
      { title: 'Ajouter un  suivi de Paiement', context: { id: -1, idfacture: this.codFacture } });
  }


}
