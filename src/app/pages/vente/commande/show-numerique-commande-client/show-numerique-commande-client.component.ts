import { Component, OnInit } from '@angular/core';
import { ContratClientService } from '../../contrat-client/contrat-client.service';
import { Router } from '@angular/router';
import { NbDateService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { CommandeService } from '../commande.service';
import { ProductService } from '../../../admin/product/product.service';
import { ClientService } from '../../../admin/client/client.service';
import { TaxeService } from '../../../admin/taxe/services/taxe.service';

import { DevisClientService } from '../../devis-client/devis-client.service';
import { DemandePrixClientService } from '../../demande-prix-client/demande-prix-client.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { LocalDataSource } from 'ng2-smart-table';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { DemandePrixClientModel } from '../../demande-prix-client/demande-prix-client.model';
import { ClientModel } from '../../../admin/client/client.model';
import { CommandeModel } from '../commande.model';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-show-numerique-commande-client',
  templateUrl: './show-numerique-commande-client.component.html',
  styleUrls: ['./show-numerique-commande-client.component.scss']
})
export class ShowNumeriqueCommandeClientComponent implements OnInit {
  devis: DevisClientModel = new DevisClientModel();
  contrat: any[] = []
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel()
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel()
  demandeprix: DemandePrixClientModel = new DemandePrixClientModel()
  client: ClientModel = new ClientModel();
  commande: CommandeModel = new CommandeModel();
  source: LocalDataSource = new LocalDataSource();
  idDevis = localStorage.getItem('idDevis')
  id = localStorage.getItem('idRC')
  referencedevis: string
  referencedemandePrix: string
  referenceclient: string
  quantityProductClient: any[]
  settings: any
  liste: any[] = [];
  thousands = ''
  decimal = ''
  precision: number = 0
  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: CommandeService,
    private serviceUniteTransaction: UniteDeTransactionService,
    private serviceQuantityProduct: QuantityProductService,

    private seviceContrat: ContratClientService) { }

  ngOnInit() {

    let idC = localStorage.getItem('idCommande');
    this.service.getCommandeById(+idC).subscribe(dataC => {
      this.commande = dataC
      this.devis = this.commande.devis
      this.serviceUniteTransaction.getUniteDeTransactionById(this.commande.devis.idUniteTransaction).subscribe(money => {
        this.devis.devise = money.sigle
        this.setFormatNumber(money)
      })
      console.log(" this.devis", this.devis)
      this.serviceQuantityProduct.getAllquantityProductDevis(dataC.id_devis).subscribe(data => {
        this.quantityProductClient = data
        for (let i = 0; i < data.length; i++) {

          this.liste.push({
            "idProduct": data[i].idProduct,
            "quantityStock": data[i].quantityStock,
            "designation": data[i].designation,
            "code": data[i].code,
            "quantitytot": data[i].quantitytot,
            "name": data[i].name,
            "pourcentage": data[i].pourcentage,
            "productConditionnementEmballages": data[i].productConditionnementEmballages,
            "prix_unitaire": data[i].prix_unitaire,
            "devise": data[i].devise,
            "qtemanquante": 0,
            "prix_tot": data[i].prix_tot,
            "uniteMesure": data[i].uniteMesure,
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
        confirmDelete: true,
      },
      edit: {
        editButtonContent: '<i class="nb-plus"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
        mode: "inline"
      },
      actions: {
        edit: false,
        add: false,

        delete: false,

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
        /*  quantityStock: {
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
        /*   qtemanquante: {
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
             row.prixTot = row.quantitytot * row.prixUnitaire
             return (row.prixTot)
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
      },

    };
  }
  onclose() {
    this.windowRef.close();
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
}
