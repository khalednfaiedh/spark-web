import { Component, OnInit, Inject } from '@angular/core';
import { ClientModel } from '../../../admin/client/client.model';
import { ContratClientService } from '../../contrat-client/contrat-client.service';
import { Contrat } from '../../contrat/contrat';
import { ContratClientModel } from '../../contrat-client/contrat-client-model';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { CommandeModel } from '../commande.model';
import { NbWindowRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MonnaisModel } from '../../../admin/taxe/Monnais.Model';
import { CommandeService } from '../commande.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { CommandeComponent } from '../commande.component';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ClientService } from '../../../admin/client/client.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { ThemeSettingsComponent } from '../../../../@theme/components';
import { LocalDataSource } from 'ng2-smart-table';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { timingSafeEqual } from 'crypto';
import { interval, Subscription } from 'rxjs';
import { UserService } from '../../../../@core/mock/users.service';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';

@Component({
  selector: 'ngx-modal-commande-client-contrat',
  templateUrl: './modal-commande-client-contrat.component.html',
  styleUrls: ['./modal-commande-client-contrat.component.scss']
})
export class ModalCommandeClientContratComponent implements OnInit {
  devises = Object.values(MonnaisModel);
  client = new ClientModel;
  contrat = new ContratClientModel()
  clients = []
  montantResteLettre2 = ""
  ref = "";
  disabled: boolean = true;
  modesPaiements = []
  conditionPaiements = [];
  commande: CommandeModel = new CommandeModel();

  quantityNotNull = []
  montantPayyeLettre = ""
  etat = ""
  ARCM: string
  disabled2: boolean = false;
  thousands = ""
  decimal = ""
  precision = 0
  liste: any[] = [];
  source: LocalDataSource = new LocalDataSource();
  idEntr = localStorage.getItem('current_entreprise')
  idContrat = localStorage.getItem('idContrat')
  totaleTVaPourcentage: number = 0
  prixtot: number = 0
  source2 = interval()
  subscription: Subscription
  devise: string
  quantityProductModel: any
  constructor(@Inject(NB_WINDOW_CONTEXT) context,
    private router: Router,
    private commandeService: CommandeService,
    private contratClientService: ContratClientService,
    private serviceModePaiement: ModeDePaiementService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private serviceQuantityProduct: QuantityProductService,
    private userService: UtilisateurService,
    private uniteTransactionServicee: UniteDeTransactionService
  ) {
    if (context.etat === "edit") {
      this.etat == "edit"
      console.log(context.data)
      this.commande = context.data;
      this.contrat = this.commande.contrat;
      //  this.source = this.commande.quantityProducts
      this.ARCM = 'Modifier'
      this.settings.actions.delete = true
      this.settings.actions.edit = true

    }
    if (context.etat === "show") {
      this.disabled2 = true;
      console.log(context.data)
      this.commande = context.data;
      this.contrat = this.commande.contrat;
      //  this.source = this.commande.quantityProducts
    }

    if (context.etat == "add") {
      this.etat = "add"
      this.ARCM = 'Ajouter'
      this.settings.actions.delete = true
      this.settings.actions.edit = true
    }

  }

  ngOnInit() {
    /**
     *  get list Client with contrat
     */

    this.commande.emisepar = this.userService.getCurrentUserCell().userName
    this.uniteTransactionServicee.getUniteDeTransactionById(this.contrat.idUniteTransaction).subscribe(moeny => {
      this.setFormatNumber(moeny)
      this.devise = moeny.sigle
    })
    if (this.etat == 'add') {

      this.contratClientService.getContratById(+this.idContrat).subscribe(data => {
        this.contrat = data
        this.serviceQuantityProduct.getAllquantityProductContrat(data.idContrat).subscribe((data: any) => {
          for (let i = 0; i < data.length; i++) {
            this.liste.push({
              "quantityStock": data[i].quantityStock,
              "designation": data[i].designation,
              "uniteMesure": data[i].uniteMesure,
              "code": data[i].code,
              "quantitytot": data[i].quantitytot,
              "productConditionnementEmballages": data[i].productConditionnementEmballages,
              "prixUnitaire": data[i].prixUnitaire,
              "devise": data[i].devise,
              "qtemanquante": 0,
              "prixTot": data[i].prixUnitaire * data[i].quantitytot,
              "idProduct": data[i].idProduct,
              "name": data[i].name,
              "pourcentage": data[i].pourcentage,
              "idUnite": data[i].idUnite

            })

          }
          this.source = new LocalDataSource(this.liste);
          this.calculeMontantHT()
        })

        this.uniteTransactionServicee.getUniteDeTransactionById(data.idUniteTransaction).subscribe(moeny => {
          this.setFormatNumber(moeny)
          this.devise = moeny.sigle
        })
      })
    }
    if (this.etat == "edit" || this.etat == "show") {
      this.serviceQuantityProduct.getAllquantityProductContratCommande(this.commande.code_cmd).subscribe(data => {
        console.log("dataQP==>", data)
        for (let i = 0; i < data.length; i++) {
          this.liste.push({
            "idQuantityProduct": data[i].idQuantityProduct,
            "quantityStock": data[i].quantityStock,
            "designation": data[i].designation,
            "uniteMesure": data[i].uniteMesure,
            "code": data[i].code,
            "quantitytot": data[i].quantitytot,
            "productConditionnementEmballages": data[i].productConditionnementEmballages,
            "prixUnitaire": data[i].prixUnitaire,
            "devise": data[i].devise,
            "qtemanquante": 0,
            "prixTot": data[i].prixUnitaire * data[i].quantitytot,
            "idProduct": data[i].idProduct,
            "name": data[i].name,
            "pourcentage": data[i].pourcentage,
            "idUnite": data[i].idUnite

          })

        }
        this.source = new LocalDataSource(this.liste);
        this.calculeMontantHT()

      })
      this.contratClientService.getListClientContractuel().subscribe(
        data => { this.clients = data; console.log(data) },
        err => { console.log("error get Client") }
      )
    }
    this.subscription = this.source2.subscribe(val =>
      this.commande.montantReste = this.commande.sommeFinale - this.commande.montantpayer

    )
    /**
     * get mode et condtion de paimment
     */
    this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(data => {
      this.modesPaiements = data;
      console.log(data)
    })

    /**
     * get mode et condtion de paimment
     */
    /*this.serivceConditionPaiement.getAllConditionDePaiementbyTypeEcheancier('Client').subscribe(data => {
      this.conditionPaiements = data
      console.log(data)
    })*/



  }


  getReferenceclient() {
    this.ref = "CLT" + this.client.code_clt;
    this.commande.code_clt = this.client.code_clt;

    this.contratClientService.getContratActiveByClient(this.client.code_clt).subscribe(
      data => {
        this.contrat = data;
        /** get list produit by contrat */
        this.commande.contrat = this.contrat
        this.contratClientService.getListProductByContrat(data.idContrat).subscribe(
          data => { this.source = data }
        )
      }



    )
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

  close() {
    this.windowRef.close();
  }
  settings = {
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
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          return row.productConditionnementEmballages.map(data => data.conditionnementEmballage.typeConditionnement)
        }
      },
      /*  quantityStock: {
          title: 'Quantité de stock',
          filter: true,
          type: 'number'
        },*/
      prixUnitaire: {
        title: 'Prix Unitaire',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
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
      prixTot: {
        title: 'Prix Total',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          row.prixTot = row.quantitytot * row.prixUnitaire
          return (row.prixTot)
        }
      },

      name: {
        title: 'Taxe',
        type: 'string',
        width: '200px',
        filter: true,
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          return cell + "= " + row.pourcentage + "%"

        }
      }
    }
  }




  onCustom(event) {


    console.log(event)
  }
  show(event) {
    this.prixtot = 0

    event.confirm.resolve()
    let t = 0;
    for (let i = 0; i < this.liste.length; i++) {
      if (this.liste[i].idProduct == event.newData.idProduct) {
        this.liste[i].idQuantityProduct == event.newData.idQuantityProduct
        this.liste[i].quantitytot == event.newData.quantitytot
        this.liste[i].prixUnitaire == event.newData.prixUnitaire
        this.liste[i].code == event.newData.code
        this.liste[i].quantityStock == event.newData.quantityStock,
          this.liste[i].designation == event.newData.designation
        this.liste[i].id_devis == event.newData.id_devis
        this.liste[i].qtemanquante = +(event.newData.qtemanquante)
        this.liste[i].prixTot = +(event.newData.prixTot)
        this.liste[i].idUnite = event.newData.idUnite
        this.liste[i].conditionnementEmballage = event.newData.conditionnementEmballage

        t = 1
        break
      }
    }
    if (t == 0) {
      this.liste.push({
        "idQuantityProduct": event.newData.idQuantityProduct,
        "idProduct": event.newData.idProduct,
        "id_devis": (+event.newData.id_devis),
        "quantityStock": event.newData.quantityStock,
        "code": event.newData.code,
        "designation": event.newData.designation,
        "qtemanquante": (+event.newData.qtemanquante),
        "prixUnitaire": (+event.newData.prixUnitaire),
        "quantitytot": +(event.newData.quantitytot),
        "prixTot": (+event.newData.prixUnitaire) * (+event.newData.quantitytot),
        "productConditionnementEmballages": event.newData.productConditionnementEmballages,
        "idUnite": event.newData.idUnite,
      })

    }
    this.source = new LocalDataSource(event)
    this.calculeMontantHT()


  }

  calculeMontantHT() {

    for (let j = 0; j < this.liste.length; j++) {
      this.prixtot += this.liste[j].prixUnitaire * this.liste[j].quantitytot

    }
    this.commande.sommeTotaleHt = this.prixtot
    console.log(" this.commande.sommeTotaleHt", this.commande.sommeTotaleHt)
    this.calculTotaleavecRemise()
    this.CalculetotaleTVa2()
  }

  calculTotaleavecRemise() {
    if (this.commande.remise != null) {
      this.commande.sommeRemise = this.prixtot - ((+this.prixtot * this.commande.remise) / 100)

    } else {
      this.commande.sommeRemise = this.prixtot

    }
    this.calculeTTC()
  }
  calculPrixTotal() {
    this.commande.autreFais = 0
    this.commande.fraisLaivraison = 0
    this.commande.sommeFinale = this.commande.sommeTotaleavecTVA + this.commande.fraisLaivraison + this.commande.autreFais
    this.NumberToLetter(this.commande.sommeFinale)
  }

  calculeTTC() {
    this.commande.sommeTotaleavecTVA = this.commande.sommeRemise + this.commande.sommeTVA
    this.calculPrixTotal()
  }


  CalculetotaleTVa2() {
    this.totaleTVaPourcentage = 0
    for (let i = 0; i < this.liste.length; i++) {

      this.totaleTVaPourcentage += (this.liste[i].prixUnitaire * this.liste[i].quantitytot * this.liste[i].pourcentage) / 100
    }
    this.commande.sommeTVA = this.totaleTVaPourcentage
    this.calculeTTC()
  }
  onclose() {
    this.windowRef.close()
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
    this.commande.sommeFinaleLettre = numberToLetter
    this.commande.montantResteLettre = numberToLetter
    return numberToLetter;

  }
  montantPayeeToLettre(nombre) {
    this.commande.montantPayeeLettre = this.NumberToLetter(nombre);
  }

  claculMontatReste() {
    this.commande.montantReste = this.commande.montantpayer - this.commande.avence;
    this.NumberToLetter(this.commande.montantReste)
  }

  montantResteLettre() {
    this.montantResteLettre2 = this.NumberToLetter(this.commande.montantReste)
    console.log(this.montantResteLettre2)
  }

  onAddRCM() {
    let idEntr = localStorage.getItem('current_entreprise')
    this.commande.idEntreprise = +idEntr;
    if (this.etat == "add") {

      console.log("this.commande.quantityProducts===>", this.commande.quantityProducts)
      this.commande.contrat = this.contrat
      this.commande.dateCommande = new Date()
      this.commandeService.addCommande2(this.commande).subscribe(
        data => {
          this.commande = data; console.log("ok"); console.log(data);

          for (let i = 0; i < this.liste.length; i++) {

            this.prixtot = this.liste[i].quantitytot * this.liste[i].prixUnitaire;

            this.quantityProductModel = {
              "idQuantityProduct": 0, "idCommande": data.code_cmd, "code_fac_av": null, "quantitytot": this.liste[i].quantitytot, "idProduct": this.liste[i].idProduct,
              "prixTot": this.prixtot, "qtemanquante": this.liste[i].qtemanquante, "prixUnitaire": this.liste[i].prixUnitaire, "idUnite": this.liste[i].idUnite

            }


            this.serviceQuantityProduct.addquantityProduct(this.quantityProductModel).subscribe(dataQP => {
              this.quantityProductModel = dataQP
            })
          }
          this.showToast(NbToastStatus.SUCCESS, "Commande", "est ajouter avec succéss")
          this.router.navigate([CommandeComponent.urlRefreshCommande]);
          this.windowRef.close();
        },
        err => { console.log('err with add commande 2') }
      )

    }

    if (this.etat == "edit") {

      console.log(this.commande)
      this.commandeService.updateCommandes(this.commande, this.commande.code_cmd).subscribe(
        data => {
          for (let i = 0; i < this.liste.length; i++) {
            console.log("this.liste===>", this.liste)
            this.prixtot = this.liste[i].quantitytot * this.liste[i].prixUnitaire;
            this.quantityProductModel = {

              "idQuantityProduct": this.liste[i].idQuantityProduct, "code_fac_av": null, "idcommande": data.code_cmd, "quantitytot": this.liste[i].quantitytot, "idProduct": this.liste[i].idProduct,
              "prixTot": this.prixtot, "qtemanquante": this.liste[i].qtemanquante, "prixUnitaire": this.liste[i].prixUnitaire, "idUnite": this.liste[i].idUnite
            }
            this.serviceQuantityProduct.updatequantityProductCommandeContrat(this.quantityProductModel, this.commande.code_cmd, this.liste[i].idQuantityProduct).subscribe(data => {
              this.quantityProductModel = data
              console.log("    this.quantityProductModel", this.quantityProductModel)
            })
          }

          ;
          this.showToast(NbToastStatus.SUCCESS, "Commande", "est  MOdfier avec succéss")

          this.router.navigate([CommandeComponent.urlRefreshCommande]);
          this.windowRef.close();
        },
        err => { console.log('err with add commande 2') }
      )
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

  onDeleteConfirm(event) {
    if (this.etat == 'add') {
      if (window.confirm(`Vous êtes sure de supprimer cette demande de produit?`)) {


        event.confirm.resolve(this.liste = this.liste.filter(item => item !== event.data));

        this.source = new LocalDataSource(this.liste);
      } else {
        event.confirm.reject();
      }
    }
    if (this.etat == 'edit') {
      if (window.confirm(`Vous êtes sure de supprimer cette demande de produit?`)) {

        event.confirm.resolve(this.serviceQuantityProduct.delete(event.data.idQuantityProduct).subscribe(
          data => {

          }),
        );
        this.source = new LocalDataSource(event)
      } else {
        event.confirm.reject();
      }
    }
  }

}

