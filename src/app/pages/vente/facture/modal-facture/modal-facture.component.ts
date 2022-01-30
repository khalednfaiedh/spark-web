import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef, NbDateService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { LocalDataSource } from 'ng2-smart-table';
import { CommandeModel } from '../../commande/commande.model';
import { CommandeService } from '../../commande/commande.service';
import { FactureService } from '../facture.service';
import { FactureComponent } from '../facture.component';
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';
import { FactureClientModel } from '../Facture.model';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DemandePrixClientService } from '../../demande-prix-client/demande-prix-client.service';
import { DemandePrixClientModel } from '../../demande-prix-client/demande-prix-client.model';
import { SuiviDePaiementService } from '../../suivide-paiement/suivi-de-paiement.service';
import { SuividePaiementModel } from '../../suivide-paiement/Suivi-de-paiement-model';
import { TaxeService } from '../../../admin/taxe/services/taxe.service';
import { TaxeModel } from '../../../admin/taxe/Taxe.Model';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';
import { interval, Subscription } from 'rxjs';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service';
import { ContratClientModel } from '../../contrat-client/contrat-client-model';

@Component({
  selector: 'ngx-modal-facture',
  templateUrl: './modal-facture.component.html',
  styleUrls: ['./modal-facture.component.scss']
})
export class ModalFactureComponent implements OnInit {


  id1 = localStorage.getItem('idCmd');
  ttc: number;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  idClient = localStorage.getItem('idClient')
  facture: FactureClientModel = new FactureClientModel();
  commande: CommandeModel = new CommandeModel()
  devis: DevisClientModel = new DevisClientModel();
  client: ClientModel = new ClientModel();
  quantityProducts: QuantityProductModel[];
  liste: any[] = []
  source: LocalDataSource = new LocalDataSource();
  referenceclient: string;
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel()
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  demandeprix: DemandePrixClientModel = new DemandePrixClientModel();
  referencedemandePrix: string;
  referencedevis: string;
  referencecommande: string;
  settings: any
  taxes: TaxeModel[]
  taxe: TaxeModel
  suividePaiement: SuividePaiementModel = new SuividePaiementModel()
  thousands = ''
  decimal = ''
  precision: number = 0
  source2 = interval()
  contrat: ContratClientModel = new ContratClientModel()
  subscription: Subscription
  referenceContrat: String
  constructor(
    protected dateService: NbDateService<Date>,
    private router: Router,
    private serviceFacture: FactureService,
    private serviceBC: CommandeService,
    private serviceDevis: DevisClientService,
    private serviceDemandePrix: DemandePrixClientService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceConditionPaiement: ConditionDePaiementService,
    private serviceUniteTransaction: UniteDeTransactionService,
    private serviceQuantityProduct: QuantityProductService,
    public serviceCLT: ClientService,
    public serviceSP: SuiviDePaiementService,
    private userService: UtilisateurService,
    private serviceTaxe: TaxeService) { }

  ngOnInit() {
    this.facture.emisepar = this.userService.getCurrentUserCell().userName
    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceTaxe.getAllTaxes(+idEntr).subscribe(res => {
      let ress: any[]; ress = res; ress.map((i) => {
        i.fullName = i.name + '= ' + i.pourcentage
        return i;
      });
      this.taxes = res;
      console.log("taxes", this.taxes)
      // this.productTaxeID = [this.taxes[0], this.taxes[1]]
    })

    this.serviceBC.getCommandeById(+this.id1).subscribe(
      dataCommande => {
        this.commande = dataCommande;
        this.facture.sommeFinale = this.commande.sommeFinale
        this.facture.montantpayer = this.commande.montantpayer
        this.facture.montantReste = this.commande.montantReste
        this.facture.montantResteLettre = this.commande.montantResteLettre
        this.facture.sommeFinaleLettre = this.commande.sommeFinaleLettre
        this.facture.sommeTotaleavecTVA = this.commande.sommeTotaleavecTVA
        this.referencecommande = "CMD" + this.commande.code_cmd
        if (this.commande.typeCommande == "Devis") {
          this.devis = this.commande.devis
          console.log("this.devis", this.devis)
          this.serviceUniteTransaction.getUniteDeTransactionById(this.devis.idUniteTransaction).subscribe(money => {
            this.setFormatNumber(money)
            this.devis.devise = money.sigle
          })
          this.referencedevis = "DVS" + this.devis.id_devis
          this.demandeprix = this.devis.demandePrix
          console.log("this.demandeprix", this.demandeprix)
          this.referencedemandePrix = "DMD" + this.demandeprix.iddp

          this.serviceCLT.getClientById(this.demandeprix.code_clt).subscribe(
            data1 => {
              this.client = data1;
              this.referenceclient = "CLT" + this.client.code_clt
            },
            error => {
              console.log(error);
            },
          );

          this.serviceModePaiement.getModeDePaiementById(this.devis.idpaiement).subscribe(dataModeP => {
            this.modePaiement = dataModeP
            console.log("dataP", dataModeP)
          })



          this.serviceConditionPaiement.getConditionById(this.devis.idConditionpaiement).subscribe(dataCP => {
            this.conditionPaiement = dataCP
          })


          this.serviceQuantityProduct.getAllquantityProductDevis(this.devis.id_devis).subscribe(dataQP => {
            this.quantityProducts = dataQP
            for (let i = 0; i < dataQP.length; i++) {

              this.liste.push({
                "quantityStock": dataQP[i].quantityStock,
                "designation": dataQP[i].designation,
                "code": dataQP[i].code,
                "quantitytot": dataQP[i].quantitytot,
                "prixUnitaire": dataQP[i].prixUnitaire,
                "devise": dataQP[i].devise,
                "qtemanquante": 0,
                "prixTot": dataQP[i].prixTot,
                "productConditionnementEmballages": dataQP[i].productConditionnementEmballages,
                "name": dataQP[i].name,
                "pourcentage": dataQP[i].pourcentage,
                "prixTotDecimal": dataQP[i].prixTotDecimal,
                "prixUnitaireDecimal": dataQP[i].prixUnitaireDecimal


              })

            }
            this.source = new LocalDataSource(this.liste);
          })
        }
        if (this.commande.typeCommande == "Contrat") {
          this.contrat = this.commande.contrat
          this.referenceContrat = "CTR" + this.contrat.idContrat
          console.log("this.devis", this.devis)
          this.serviceUniteTransaction.getUniteDeTransactionById(this.contrat.idUniteTransaction).subscribe(money => {
            this.setFormatNumber(money)
            this.devis.devise = money.sigle
          })


          this.serviceCLT.getClientById(this.contrat.codeClt).subscribe(
            data1 => {
              this.client = data1;
              this.referenceclient = "CLT" + this.client.code_clt
            },
            error => {
              console.log(error);
            },
          );

          this.serviceModePaiement.getModeDePaiementById(this.contrat.idPaiement).subscribe(dataModeP => {
            this.modePaiement = dataModeP
            console.log("dataP", dataModeP)
          })



          this.serviceConditionPaiement.getConditionById(this.contrat.idConditionpaiement).subscribe(dataCP => {
            this.conditionPaiement = dataCP
          })


          this.serviceQuantityProduct.getAllquantityProductContratCommande(this.commande.code_cmd).subscribe(dataQP => {
            this.quantityProducts = dataQP
            for (let i = 0; i < dataQP.length; i++) {

              this.liste.push({
                "quantityStock": dataQP[i].quantityStock,
                "designation": dataQP[i].designation,
                "code": dataQP[i].code,
                "quantitytot": dataQP[i].quantitytot,
                "prixUnitaire": dataQP[i].prixUnitaire,
                "devise": dataQP[i].devise,
                "qtemanquante": 0,
                "prixTot": dataQP[i].prixTot,
                "productConditionnementEmballages": dataQP[i].productConditionnementEmballages,
                "name": dataQP[i].name,
                "pourcentage": dataQP[i].pourcentage,
                "prixTotDecimal": dataQP[i].prixTotDecimal,
                "prixUnitaireDecimal": dataQP[i].prixUnitaireDecimal


              })

            }
            this.source = new LocalDataSource(this.liste);
          })
        }
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
        /* quantityStock: {
           title: 'Quantité de stock',
           type: 'number',
           filter: true,
           editable: false,
           addable: false,
         },*/
        prixUnitaireDecimal: {
          title: 'Prix Unitaire',
          type: 'number',
          filter: true,
          editable: false,
          addable: false,
        },
        quantitytot: {
          title: 'Quantité',
          type: 'number',
          filter: true,
        },
        /*  qtemanquante: {
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
          // valuePrepareFunction(cell, row) {
          //  row.prix_tot = row.quantitytot * row.prix_unitaire
          //  return (row.prix_tot)
          // }
        },
        name: {
          title: 'Taxe',
          type: 'string',
          width: '200px',
          filter: true,
          valuePrepareFunction(cell, row) {
            return cell + "= " + row.pourcentage + "%"

          }
        }
      }
    }
  }

  calculeTTC() {
    this.serviceTaxe.getTaxebyId(this.facture.idTaxe).subscribe(data => {
      this.taxe = data

      if (this.taxe.type == "Montant fixe") {
        this.facture.sommeTotaleavecTVA = this.facture.sommeTotaleavecTVA + this.taxe.pourcentage
      } else {
        this.facture.sommeTotaleavecTVA = this.facture.sommeTotaleavecTVA + (this.facture.sommeTotaleavecTVA * this.taxe.pourcentage) / 100
      }
      this.calculeMontantPayer()
      this.calculeMontantReste()
      this.NumberToLetter(this.facture.sommeFinale)
      this.NumberToLetter(this.facture.montantReste)
    })
  }
  calculeMontantPayer() {
    this.facture.sommeFinale = this.facture.sommeTotaleavecTVA + this.commande.fraislivraison + this.commande.autrefrais
  }
  calculeMontantReste() {
    this.facture.montantReste = this.facture.sommeFinale - this.facture.montantpayer

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

  onclose() {
    this.windowRef.close();
  }

  onAddRCM() {
    if (this.devis.typePaiement == 'Date fixe' && this.devis.datePaiement == null) {
      this.showToast(NbToastStatus.DANGER, "Attention", "vous ne pouvez pas créer cette facture,il doit vérifier la date de paiement de la CMD" + this.commande.code_cmd + "  " + "de DVS" + this.devis.id_devis)
    }
    this.facture.code_cmd = this.commande.code_cmd
    this.facture.date_fac = new Date();

    /* this.facture.numberJourByEcheance=this.devis.numberJourByEcheance;
     this.facture.modePaiement=this.modePaiement.idPaiement;
     this.facture.typePaiement= this.devis.typePaiement;*/

    this.serviceFacture.addFacture(this.facture).subscribe(
      data => {
        this.facture = data
        console.log("code_fac==>", this.facture)
        localStorage.removeItem('e');
        localStorage.removeItem('idFacture');
        this.showToast(NbToastStatus.SUCCESS, "Facture", "est ajouter avec succéss")

        this.router.navigate([FactureComponent.urlRefreshFacture]);
        this.windowRef.close();
      },
      error => {
        console.log('error');
        this.showToast(NbToastStatus.DANGER, "Erreur", "")
      });
  }
  NumberToLetter(nombre) {

    var letter = {
      0: "zéro",
      1: "un",
      2: "deux",
      3: "trois",
      4: "quatre",
      5: "cinq",
      6: "six",
      7: "sept",
      8: "huit",
      9: "neuf",
      10: "dix",
      11: "onze",
      12: "douze",
      13: "treize",
      14: "quatorze",
      15: "quinze",
      16: "seize",
      17: "dix-sept",
      18: "dix-huit",
      19: "dix-neuf",
      20: "vingt",
      30: "trente",
      40: "quarante",
      50: "cinquante",
      60: "soixante",
      70: "soixante-dix",
      80: "quatre-vingt",
      90: "quatre-vingt-dix",
    };

    var i, j, n, quotient, reste, nb;
    var ch
    var numberToLetter = '';
    //__________________________________

    if (nombre.toString().replace(/ /gi, "").length > 15) return "dépassement de capacité";
    if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

    nb = parseFloat(nombre.toString().replace(/ /gi, ""));
    //if (Math.ceil(nb) != nb) return "Nombre avec virgule non géré.";
    if (Math.ceil(nb) != nb) {
      nb = nombre.toString().split('.');
      return this.NumberToLetter((nb[0]) + (nb[1]));

    }

    n = nb.toString().length;
    switch (n) {
      case 1:
        numberToLetter = letter[nb];
        break;
      case 2:
        if (nb > 19) {
          quotient = Math.floor(nb / 10);
          reste = nb % 10;
          if (nb < 71 || (nb > 79 && nb < 91)) {
            if (reste == 0) numberToLetter = letter[quotient * 10];
            if (reste == 1) numberToLetter = letter[quotient * 10] + "-et-" + letter[reste];
            if (reste > 1) numberToLetter = letter[quotient * 10] + "-" + letter[reste];
          } else numberToLetter = letter[(quotient - 1) * 10] + "-" + letter[10 + reste];
        } else numberToLetter = letter[nb];
        break;
      case 3:
        quotient = Math.floor(nb / 100);
        reste = nb % 100;
        if (quotient == 1 && reste == 0) numberToLetter = "cent";
        if (quotient == 1 && reste != 0) numberToLetter = "cent" + " " + this.NumberToLetter(reste);
        if (quotient > 1 && reste == 0) numberToLetter = letter[quotient] + " cents";
        if (quotient > 1 && reste != 0) numberToLetter = letter[quotient] + " cent " + this.NumberToLetter(reste);
        break;
      case 4:
      case 5:
      case 6:
        quotient = Math.floor(nb / 1000);
        reste = nb - quotient * 1000;
        if (quotient == 1 && reste == 0) numberToLetter = "mille";
        if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + this.NumberToLetter(reste);
        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " mille";
        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
        break;
      case 7:
      case 8:
      case 9:
        quotient = Math.floor(nb / 1000000);
        reste = nb % 1000000;
        if (quotient == 1 && reste == 0) numberToLetter = "un million";
        if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + this.NumberToLetter(reste);
        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " millions";
        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
        break;
      case 10:
      case 11:
      case 12:
        quotient = Math.floor(nb / 1000000000);
        reste = nb - quotient * 1000000000;
        if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
        if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " milliards";
        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
        break;
      case 13:
      case 14:
      case 15:
        quotient = Math.floor(nb / 1000000000000);
        reste = nb - quotient * 1000000000000;
        if (quotient == 1 && reste == 0) numberToLetter = "un billion";
        if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
        if (quotient > 1 && reste == 0) numberToLetter = this.NumberToLetter(quotient) + " billions";
        if (quotient > 1 && reste != 0) numberToLetter = this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
        break;
    }//fin switch
    /*respect de l'accord de quatre-vingt*/
    if (numberToLetter.substr(numberToLetter.length - "quatre-vingt".length, "quatre-vingt".length) == "quatre-vingt") numberToLetter = numberToLetter + "s";
    console.log("numberToLetter", numberToLetter)
    this.facture.sommeFinaleLettre = numberToLetter
    this.facture.montantResteLettre = numberToLetter
    return numberToLetter;

  }
}




