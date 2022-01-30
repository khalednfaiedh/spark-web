import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { CommandeModel } from '../commande.model'
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';
import { CommandeService } from '../commande.service';
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from "angular2-toaster"
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { DemandePrixClientService } from '../../demande-prix-client/demande-prix-client.service';
import { DemandePrixClientModel } from '../../demande-prix-client/demande-prix-client.model';
import { ContratClientService } from '../../contrat-client/contrat-client.service';
import { ClientModel } from '../../../admin/client/client.model';
import { ProductService } from '../../../admin/product/product.service';
import { TaxeService } from '../../../admin/taxe/services/taxe.service';
import { CommandeComponent } from '../commande.component';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { ProductModel } from '../../../admin/product/product.model';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'ngx-madal-commande',
  templateUrl: './modal-commande.component.html',
  styleUrls: ['./modal-commande.component.scss']
})

export class ModalCommandeComponent implements OnInit {
  devis: any = new Object();
  contrat: any[] = []
  commande: CommandeModel = new CommandeModel();
  sommeHT: number = 0;
  idP: number;
  product: ProductModel = new ProductModel()
  products: ProductModel[]
  ARCM: string;
  source: LocalDataSource = new LocalDataSource();
  idDevis = localStorage.getItem('idDevis')
  id = localStorage.getItem('idRC')
  taxes: any[] = []
  e = localStorage.getItem('e');
  quantityProduct: any[] = []
  liste: any[] = [];
  quantityProductClient: any[] = []
  settings: any
  referencedevis: string
  referencedemandePrix: string
  totaleTVaPourcentage: number;
  totaleTVaPourcentageMontant: number;
  thousands = ''
  decimal = ''
  precision: number = 0
  source2 = interval()
  subscription: Subscription
  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: CommandeService,
    private productService: ProductService,
    private toastrService: NbToastrService,
    private serviceQuantityProduct: QuantityProductService,
    private serviceDevis: DevisClientService,
    private serviceUniteTransaction: UniteDeTransactionService,
    private userService: UtilisateurService,
  ) { }



  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.commande.emisepar = this.userService.getCurrentUserCell().userName
    this.subscription = this.source2.subscribe(val =>
      this.commande.montantReste = this.devis.sommeFinale - this.commande.montantpayer
    )
    this.serviceQuantityProduct.getAllquantityProductDevis(+this.idDevis).subscribe(data => {
      this.quantityProductClient = data
      console.log("this.quantityProductClient", this.quantityProductClient)
      for (let i = 0; i < data.length; i++) {
        this.idP = data[i].idProduct
        this.liste.push({
          "idProduct": data[i].idProduct,
          "quantityStock": data[i].quantityStock,
          "designation": data[i].designation,
          "code": data[i].code,
          "quantitytot": data[i].quantitytot,
          "name": data[i].name,
          "pourcentage": data[i].pourcentage,
          "productConditionnementEmballages": data[i].productConditionnementEmballages,
          "prixUnitaire": data[i].prixUnitaire,
          "devise": data[i].devise,
          "qtemanquante": 0,
          "prixTot": data[i].prixTot,
          "uniteMesure": data[i].uniteMesure,
          "prixTotDecimal": data[i].prixTotDecimal,
          "prixUnitaireDecimal": data[i].prixUnitaireDecimal

        })

      }
      this.source = new LocalDataSource(this.liste);
    })

    if (this.e === "0") {
      this.ARCM = 'Ajouter';
      this.serviceDevis.getDevisById(+this.idDevis).subscribe(devis => {
        this.devis = devis
        this.commande.montantpayer = this.devis.avance;
        this.commande.fraisLaivraison = this.devis.fraisLaivraison
        this.commande.autreFais = this.devis.autreFais
        this.commande.montantHorsTaxe = this.devis.montantHorsTaxe
        this.commande.montantNetHorsTaxe = this.devis.montantNetHorsTaxe
        this.commande.sommeTotaleavecTVA = this.devis.sommeTotaleavecTVA
        this.commande.sommeFinale = this.devis.sommeFinale
        this.commande.sommeRemise = this.devis.sommeRemise
        this.commande.sommeTVA = this.devis.sommeTVA
        this.commande.sommeFinaleLettre = this.devis.sommeFinaleLettre
        this.commande.commentaire = this.devis.commentaire
        this.serviceUniteTransaction.getUniteDeTransactionById(this.devis.idUniteTransaction).subscribe(data => {
          this.setFormatNumber(data)

          this.devis.devise = data.sigle
        })


      })

      this.productService.getAllproduct(+id).subscribe(data => this.products = data)
    }
    if (this.e === '1') {
      let idC = localStorage.getItem('idCommande');
      this.ARCM = 'Modifier'
      this.service.getCommandeById(+idC).subscribe(dataC => {
        this.commande = dataC
        this.devis = this.commande.devis
        this.serviceUniteTransaction.getUniteDeTransactionById(this.commande.devis.idUniteTransaction).subscribe(data => {
          this.setFormatNumber(data)
          this.devis.devise = data.sigle
        })
      })

    }


    this.settings = {
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: false,
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
      }
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



  onAddRCM() {
    if (this.devis.typePaiement == 'Date fixe') {
      if (this.devis.datePaiement == null) {
        this.showToast(NbToastStatus.DANGER, 'Attention !!', 'Indiquer votre date de paiement de devis DVS' + this.devis.id_devis)
      }

    }
    let idEntr = localStorage.getItem('current_entreprise')
    this.commande.idEntreprise = +idEntr;
    // this.commande.code_clt = this.demandeprix.code_clt;
    this.commande.id_devis = this.devis.id_devis
    this.commande.dateCommande = new Date();
    this.commande.commentaire = this.devis.commentaire
    this.service.addCommande(this.commande).subscribe(
      data => {
        this.commande = data
        for (let j = 0; j < this.products.length; j++) {
          for (let i = 0; i < this.liste.length; i++) {

            if (this.liste[i].idProduct == this.products[j].idProduct) {
              this.product.familleDeProduit = this.products[j].familleDeProduit
              this.product.paysOrigine = this.products[j].paysOrigine
              this.product.garantie = this.products[j].garantie
              this.product.suiviStocks = this.products[j].suiviStocks
              this.product.commentaire = this.products[j].commentaire
              this.product.designation = this.products[j].designation
              this.product.code = this.products[j].code
              console.log("this.products[j].margeBenfecaire", this.products[j].margeBenfecaire)
              this.product.margeBenfecaire = this.products[j].margeBenfecaire
              this.product.quantityStock = this.products[j].quantityStock - this.liste[i].quantitytot
              console.log("dataUpdateP", this.product.quantityStock)
              this.productService.updateProducts2(this.product, this.products[j].idProduct).subscribe(dataUpdateP => {
                this.product = dataUpdateP

              })
            }
          }
        }

        localStorage.removeItem('e');
        localStorage.removeItem('idRC');
        this.showToast(NbToastStatus.SUCCESS, "Commande", "est ajouter avec succéss")
        this.showToast(NbToastStatus.SUCCESS, "Produit", "est modifier avec succéss")
        this.router.navigate([CommandeComponent.urlRefreshCommande]);
        this.windowRef.close();
      },
      error => {
        this.showToast(NbToastStatus.DANGER, "Erreur", "")
        console.log(error);
      });
    if (this.e === '1') {
      let idC = localStorage.getItem('idCommande');
      // this.commande.code_clt = this.demandeprix.code_clt;
      this.commande.id_devis = this.devis.id_devis
      this.commande.commentaire = this.devis.commentaire
      this.service.updateCommandes(this.commande, +idC).subscribe(dataC => {
        this.commande = dataC
        console.log("dataC", dataC)
        localStorage.removeItem('e');
        localStorage.removeItem('idCommande');
        this.showToast(NbToastStatus.SUCCESS, "Commande", "est modifier avec succéss")
        this.router.navigate([CommandeComponent.urlRefreshCommande]);
        this.windowRef.close();
      })


    }
  }

  onclose() {
    this.windowRef.close();
  }

  MontantRest() {
    this.commande.montantReste = this.devis.sommeFinale - this.commande.montantpayer
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
    this.commande.montantResteLettre = numberToLetter
    return numberToLetter;

  }






























}
