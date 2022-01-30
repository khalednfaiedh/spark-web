import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDateService, NbWindowRef, NbToastrService, NbWindowService } from '@nebular/theme';
import { DevisClientService } from '../devis-client.service';
import { ProductService } from '../../../admin/product/product.service';
import { ClientService } from '../../../admin/client/client.service';
import { QuantityClientService } from '../../demande-prix-client/quantity-client.service';

import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { DemandePrixClientService } from '../../demande-prix-client/demande-prix-client.service';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { DatePipe } from '@angular/common';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { LocalDataSource } from 'ng2-smart-table';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { DemandePrixClientModel } from '../../demande-prix-client/demande-prix-client.model';
import { ClientModel } from '../../../admin/client/client.model';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { DemandePrixClientAdresseDeLivraisonModel } from '../../demande-prix-client/demande-prix-client-adresses-de-livraison-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { DevisClientModel } from '../devis-client.model';
import { ProductModel } from '../../../admin/product/product.model';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { MonnaisModel } from '../../../admin/taxe/Monnais.Model';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-show-numerique-devis-client',
  templateUrl: './show-numerique-devis-client.component.html',
  styleUrls: ['./show-numerique-devis-client.component.scss']
})
export class ShowNumeriqueDevisClientComponent implements OnInit {

  modePaiementDevis: ModeDePaiementModel = new ModeDePaiementModel();
  modesPaiements: ModeDePaiementModel[];
  conditionPaiementDemandePrix: ConditionDePaiementModel = new ConditionDePaiementModel();
  conditionPaiementDevis: ConditionDePaiementModel = new ConditionDePaiementModel();
  conditionPaiements: ConditionDePaiementModel[];
  devis: DevisClientModel = new DevisClientModel();
  product: ProductModel = new ProductModel();
  products: ProductModel[];
  liste: any[] = [];
  quantityProductModel: QuantityProductModel;
  quantitysProduct: any[] = []
  e = localStorage.getItem('e');
  id = localStorage.getItem('idDevis');
  referencedevis: string;
  source: LocalDataSource = new LocalDataSource();
  settings: any

  monnaie: string;
  typeClient = ""
  starategiePaiement: string
  thousands = ''
  decimal = ''
  precision: number = 0
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: DevisClientService,
    private serviceQuantityProduct: QuantityProductService,
    private serviceModePaiement: ModeDePaiementService,
    private serivceConditionPaiement: ConditionDePaiementService,
    public datepipe: DatePipe,
    private serviceUniteTransaction: UniteDeTransactionService,
  ) { }

  ngOnInit() {
    this.service.getDevisById(+this.id).subscribe(
      data => {
        this.devis = data;
        this.serviceUniteTransaction.getUniteDeTransactionById(this.devis.idUniteTransaction).subscribe(data => {
          this.setFormatNumber(data)
          this.devis.devise = data.sigle
        })
        this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(data => {
          this.modesPaiements = data;

        })


        this.serviceModePaiement.getModeDePaiementById(this.devis.idpaiement).subscribe(dataModeP => {
          this.modePaiementDevis = dataModeP

        }),
          this.serivceConditionPaiement.getConditionById(this.devis.idConditionpaiement).subscribe(dataConditionP => {
            this.conditionPaiementDevis = dataConditionP
            this.starategiePaiement = this.conditionPaiementDevis.strategie
          }),

          this.serviceQuantityProduct.getAllquantityProductDevis(+this.id).subscribe(data => {
            this.quantitysProduct = data

            for (let i = 0; i < data.length; i++) {
              //console.log(" data[i].productConditionnementEmballages", data[i].productConditionnementEmballages)
              this.liste.push({
                "idQuantityProduct": data[i].idQuantityProduct,
                "quantityStock": data[i].quantityStock,
                "designation": data[i].designation,
                "code": data[i].code,
                "quantitytot": data[i].quantitytot,
                "uniteMesure": data[i].uniteMesure,
                "productConditionnementEmballages": data[i].productConditionnementEmballages,
                "prixUnitaire": data[i].prixUnitaire,
                "devise": data[i].devise,
                "qtemanquante": 0,
                "prix_tot": 0,
                "name": data[i].name,
                "pourcentage": data[i].pourcentage,
                "prixTotDecimal": data[i].prixTotDecimal,
                "prixUnitaireDecimal": data[i].prixUnitaireDecimal
              })

            }
            this.source = new LocalDataSource(this.liste);
          })

      })



    this.settings = {
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: false,
      },
      edit: {
        editButtonContent: '<i class="nb-plus"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: false,
        mode: "inline"
      },
      actions: {
        add: false,
        delete: false,
        edit: false,
        position: 'right',

      },


      columns: {

        code: {
          title: 'Code',
          type: 'string',
          filter: true,
          editable: false,
          addable: false,
        },
        designation: {
          title: 'Produit',
          type: 'string',
          width: '200px',
          filter: true,
          editable: false,
          addable: false,
        },
        uniteMesure: {
          title: 'Unité de mesure',
          type: 'string',
          filter: true,
          editable: false,
          addable: false,
        },
        productConditionnementEmballages: {
          title: 'Emballage',
          type: 'String',
          filter: true,
          valuePrepareFunction(cell, row) {
            return row.productConditionnementEmballages.map(data => data.conditionnementEmballage.typeConditionnement)
          }
        },
        /* quantityStock: {
            title: 'Quantité de stock',
            filter: true,
            type: 'number'
          },*/
        prixUnitaireDecimal: {
          title: 'Prix Unitaire',
          type: 'number',
          filter: true,
        },
        quantitytot: {
          title: 'Quantité totale',
          type: 'number',
          filter: true
        },
        /* qtemanquante: {
           title: 'Quantité manquante',
           type: 'number',
           filter: true,
         },*/
        prixTotDecimal: {
          title: 'Prix Total',
          type: 'number',
          filter: true,
          editable: false,
          addable: false,
          /* valuePrepareFunction(cell, row) {
             row.prix_tot = row.quantitytot * row.prixUnitaire
             return (row.prix_tot)
           }*/
        },

        name: {
          title: 'Taxe',
          type: 'string',

          filter: true,
          valuePrepareFunction(cell, row) {
            return cell + "= " + row.pourcentage + "%"

          }
        }
      }
    }

  }
  setFormatNumber(money: UniteDeTransactionModel) {
    if (money != null) {

      // partie entier
      if (money.separateur === "Point") {
        this.thousands = "."
      }
      if (money.separateur === "Espace") {
        this.thousands = ' '
      }
      if (money.separateur === "Virgule") {
        this.thousands = ','
      }
      if (money.separateur === "Point_Virgule") {
        this.thousands = ';'
      }
      if (money.separateur === "Double_Point") {
        this.thousands = ':'
      }
      // separateur partier entier et decimale partie  
      if (money.separateurVirguele === "Point") {
        this.decimal = '.'
      }
      if (money.separateurVirguele === "Espace") {
        this.decimal = ' '
      }
      if (money.separateurVirguele === "Virgule") {
        this.decimal = ','
      }
      if (money.separateurVirguele === "Point_Virgule") {
        this.decimal = ';'
      }
      if (money.separateurVirguele === "Double_Point") {
        this.decimal = ':'
      }

      this.precision = money.nbredecimale


    }
  }

  onclose() {
    this.windowRef.close();
  }

}
