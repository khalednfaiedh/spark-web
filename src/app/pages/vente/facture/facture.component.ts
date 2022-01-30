import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NbWindowService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FactureService } from './facture.service';
import { DatePipe } from '@angular/common';
import { ShowFactureComponent } from './show-facture/show-facture.component';
import { ModalFactureAvoirComponent } from '../facture-avoir/modal-facture-avoir/modal-facture-avoir.component';
import { ModalBonDeLivraisonComponent } from '../bon-de-livraison/modal-bon-de-livraison/modal-bon-de-livraison.component';
import { QuantityProductService } from '../quantity-product/quantity-product.service';
import { CommandeService } from '../commande/commande.service';
import { BonDeLivraisonService } from '../bon-de-livraison/service/bon-de-livraison.service';
import { BonDeLivraisonClientModel } from '../bon-de-livraison/Bon-de-livraison-client-model';
import { QuantityProductClientLivreModel } from '../bon-de-livraison/quantity-product-livre-client-model';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DevisClientService } from '../devis-client/devis-client.service';
import { ConditionDePaiementService } from '../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../echeance-de-paiement/echeance-de-paiement-service.service';
import { ConditionDePaiementModel } from '../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../echeance-de-paiement/echeance-de-paiement-model';
import { SuiviDePaiementService } from '../suivide-paiement/suivi-de-paiement.service';
import { DevisClientModel } from '../devis-client/devis-client.model';
import { SuividePaiementModel } from '../suivide-paiement/Suivi-de-paiement-model';
import { FactureClientModel } from './Facture.model';
import { CommandeModel } from '../commande/commande.model';
import { Router } from '@angular/router';
import { FactureAvoirService } from '../facture-avoir/facture-avoir.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesFacture } from '../../../authorisation/authorities-facture';
import { AuthoritiesFactureAvoirs } from '../../../authorisation/authorities-facture-avoirs';
import { AuthoritiesLivraison } from '../../../authorisation/authorities-livraison';
import { ModalReclamationComponent } from './modal-reclamation/modal-reclamation.component';
import { ShowFactureNumeriqueComponent } from './show-facture-numerique/show-facture-numerique.component';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="danger" value="reclamation "/>\n' +
    '    </div>',
})
export class ButtonReclamation implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) { }
  onClick() {

    this.windowService.open(ModalReclamationComponent,
      { title: 'Ajouter    Reclamation  ', context: { id: this.rowData.code_fac } });
  }
}


@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="success" value="Suivi "/>\n' +
    '    </div>',
})
export class ButtonSuiviPaiement implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) { }
  onClick() {

    this.router.navigate(['/pages/vente/suiviPaiement', this.rowData.code_fac]);
  }
}

@Component({
  selector: 'ngx-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  public static urlFacture = "/pages/vente/facture";
  public static urlRefreshFacture = "/pages/vente/refreshFacture";
  quantityProducts: any[] = []
  quantityProductsLivre: QuantityProductClientLivreModel[]
  bonLivraisons: BonDeLivraisonClientModel[];
  devis: DevisClientModel = new DevisClientModel();
  conditionP: ConditionDePaiementModel = new ConditionDePaiementModel()
  echeanceP: EcheanceDePaiementModel = new EcheanceDePaiementModel()
  suiviPaiement: SuividePaiementModel = new SuividePaiementModel()
  commande: CommandeModel = new CommandeModel()
  referenceBL: any[] = []
  selectList: any[] = [];
  idBL: number
  facture: any
  statutP: string
  factures: FactureClientModel[]
  source: LocalDataSource = new LocalDataSource();
  config: ToasterConfig;
  sumQuatitytot = 0
  sumQuatityLivre = 0
  constructor(public datepipe: DatePipe, private windowService: NbWindowService, private service: FactureService,
    private servicequantityProduct: QuantityProductService,
    private serviceCommande: CommandeService,
    private serviceBonLivraison: BonDeLivraisonService,
    private serviceDevis: DevisClientService,
    private serviceFactureAvoir: FactureAvoirService,
    private servicecondition: ConditionDePaiementService,
    private serviceEcheance: EcheanceDePaiementServiceService,
    private servicesuiviPaiement: SuiviDePaiementService,
    private toastrService: NbToastrService, private router: Router) { }


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
    if (Authorities.hasAutorities(AuthoritiesFactureAvoirs.FACTURE_AVOIRS_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editFactureAvoir',
        title: '<i class="ion-clipboard ng-star-inserted" title="Facture avoir"></i>'
      })
    }
    if (Authorities.hasAutorities(AuthoritiesFacture.FACTURE_VALUE)) {
      /*   this.settings.actions.custom.push({
         name: 'show',
         title: '<i class="fas fa-file-download" title="Télécharger"></i>',
       })*/
      this.settings.actions.custom.push({
        name: 'showNumerique',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      })
    }
    /* if (Authorities.hasAutorities(AuthoritiesLivraison.LIVRAISON_ADD_VALUE)) {
       this.settings.actions.custom.push({
         name: 'bonlivraison',
         title: '<i class="fas fa-truck-moving fa-lg" title="Bon de livraison"></i>'
 
       })
     }*/

    this.selectList.push({ value: 'Non réglée', title: 'Non réglée' }, { value: 'En cours de règlement', title: 'En cours de règlement' }, { value: 'Réglée', title: 'Réglée' }, { value: 'En contentieux', title: 'En contentieux' });
    console.log("selectList", this.selectList)
    this.service.getAllFactures().subscribe(data => {
      this.factures = data
      this.settings.columns.statut.filter.config.list = this.selectList;
      this.settings.columns.statut.editor.config.list = this.selectList;
      this.settings = Object.assign({}, this.settings);
      this.source = new LocalDataSource(data)
      // this.source = data;
      console.log("this.source", this.source)
    })
  }
  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },

    actions: {
      add: false,
      edit: true,
      delete: false,
      position: 'right',
      custom: [

      ],
    },

    columns: {

      code_fac: {
        title: 'Référence Facture',
        type: 'string',
        filter: true,
        width: "10%",
        valuePrepareFunction(cell, row) {
          return ("FAC" + row.code_fac)
        }
      },
      code_cmd: {
        title: 'Référence Commande',
        type: 'number',
        filter: true,
        width: "20%",

        valuePrepareFunction(cell, row) {
          return "CMD" + cell
        }
      },

      date_fac: {
        title: 'Date Facture',
        type: 'number',
        filter: true,
        width: "15%",
      },
      statut: {
        title: 'Statut',
        type: 'string',
        width: "15%",
        filter: {
          type: 'list',
          config: {
            selectText: 'Statut',
            list: this.selectList
          }
        },
        editor: {
          type: "list",
          config: {
            selectText: 'Statut',
            list: this.selectList
          },

        },


      },
      suiviPaiement: {
        title: 'Paiement',
        type: 'custom',
        width: "10%",
        renderComponent: ButtonSuiviPaiement
      },
      reclamation: {
        title: 'Réclamation',
        type: 'custom',
        width: "10%",
        renderComponent: ButtonReclamation
      },


    },

  };

  onSaveConfirm(event) {
    event.newData.code_cmd = event.data.code_cmd
    this.service.updateFacture(event.newData, event.data.code_fac).subscribe(
      data => {
        event.newData = data
        console.log('data', data);
        this.showToast(NbToastStatus.SUCCESS, "Facture", " est modifier avec succéss")
      },
      error => {
        this.showToast(NbToastStatus.DANGER, "Erreur", "")
        console.log('erreur update');
      },

      event.confirm.resolve(event.newData),
    );
  }




  onCustom(event) {

    if (event.action === 'show') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.code_fac);
      this.windowService.open(ShowFactureComponent,
        { title: 'Afficher Facture', context: { id: event.data.code_fac } });
    }
    if (event.action === 'showNumerique') {
      localStorage.removeItem('e');
      localStorage.removeItem('idFacture');
      localStorage.setItem('idFacture', event.data.code_fac);
      this.windowService.open(ShowFactureNumeriqueComponent,
        { title: 'Afficher Facture', context: { id: event.data.code_fac } });
    }
    if (event.action === 'editFactureAvoir') {
      localStorage.removeItem('e');
      localStorage.removeItem('idFacture');
      localStorage.setItem('idFacture', event.data.code_fac);
      this.serviceFactureAvoir.findByFacture(event.data.code_fac).subscribe(data => {
        if (data == null) {
          this.windowService.open(ModalFactureAvoirComponent,
            { title: "Ajouter une facture d'avoirs", context: { id: event.data.code_fac } });
        } else {
          this.showToast(NbToastStatus.DANGER, "Attention", "Facture d'avoirs existe déja ,référence du facture d'avoirs : FCTAV" + data.code_fac_av + "-" + event.data.code_fac)
        }
      })
    }

    if (event.action === 'bonlivraison') {
      localStorage.removeItem('e');
      localStorage.removeItem('idFacture');
      localStorage.setItem('idFacture', event.data.code_fac);
      this.serviceCommande.getCommandeById(event.data.code_cmd).subscribe(dataCommande => {
        this.commande = dataCommande
        this.serviceDevis.getDevisById(dataCommande.id_devis).subscribe(dataDEvis => {
          this.devis = dataDEvis
          this.servicecondition.getConditionById(dataDEvis.idConditionpaiement).subscribe(dataC => {
            this.conditionP = dataC
            this.serviceEcheance.getEcheancheDePaiementDevis(dataCommande.id_devis).subscribe(dataE => {
              this.echeanceP = dataE

              this.serviceBonLivraison.getAllBonLivraisonFacture(event.data.code_fac).subscribe(dataBL => {
                this.bonLivraisons = dataBL

                this.servicequantityProduct.getAllquantityProductDevisLivre(dataCommande.id_devis).subscribe(dataQP => {
                  this.quantityProducts = dataQP

                  console.log(" this.quantityProducts ", this.quantityProducts)
                  this.sumQuatityLivre = this.quantityProducts.reduce((sum, current) => sum + current.quantityLivre, 0);
                  console.log('  this.sumQuatityLivre', this.sumQuatityLivre)
                  this.sumQuatitytot = this.quantityProducts.reduce((sum, current) => sum + current.quantitytot, 0);
                  console.log('  this.sumQuatitytot', this.sumQuatitytot)

                  this.servicesuiviPaiement.getSuiviPaiementByFacture(event.data.code_fac).subscribe(dataSP => {
                    this.suiviPaiement = dataSP
                    console.log("this.suiviPaiement[j].facture.code_fac", this.suiviPaiement.statutPaiement)
                    console.log("this.devis.typePaiement", this.devis.typePaiement)
                    /*   if (this.devis.typePaiement == 'Par période' && this.conditionP.designation == 'Paiement immédiate' && this.echeanceP.option == 'A la date de commande' || this.echeanceP.option == "A la date de facturation" && this.suiviPaiement.statutPaiement != 'Payée totalement') {
                         this.showToast(NbToastStatus.DANGER, "Attention", " La commande CMD" + event.data.code_cmd + " " + "son situation financiére non reglée")
   
                       } else if (this.devis.typePaiement == 'Date fixe' && this.devis.datePaiement < new Date()) {
                         this.showToast(NbToastStatus.DANGER, "Attention", " La commande CMD" + event.data.code_cmd + " " + "son situation financiére non reglée")
                         this.router.navigate([FactureComponent.urlRefreshFacture]);
                       }
                       else
                         if (this.sumQuatityLivre == this.sumQuatitytot) {
                           for (let i = 0; i < this.bonLivraisons.length; i++) {
                             if (this.bonLivraisons[i].code_fac = event.data.code_fac) {
                               this.referenceBL.push({
                                 "id": this.bonLivraisons[i].id
                               })
                             }
                           }
                           this.showToast(NbToastStatus.DANGER, "Attention", " La commande CMD" + event.data.code_cmd + " " + "est totalement livrée" + " " + this.referenceBL.map(dataRF => "LVR" + dataRF.id))
                           this.router.navigate([FactureComponent.urlRefreshFacture]);
   
                         }
   
                         else {
                           this.windowService.open(ModalBonDeLivraisonComponent,
                             { title: 'Ajouter bon de livraison', context: { id: event.data.code_fac } });
                         } }*/

                  })

                })
              })
            })
          })
        })
      })
    }
  }
}





