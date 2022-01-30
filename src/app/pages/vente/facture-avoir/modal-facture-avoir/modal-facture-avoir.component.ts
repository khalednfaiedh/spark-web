import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FactureClientModel } from '../../facture/Facture.model';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { CommandeModel } from '../../commande/commande.model';
import { ClientModel } from '../../../admin/client/client.model';
import { LocalDataSource } from 'ng2-smart-table';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { FactureService } from '../../facture/facture.service';
import { CommandeService } from '../../commande/commande.service';
import { ClientService } from '../../../admin/client/client.service';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';

import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { FactureAvoirModel } from '../FactureAvoir-model';
import { FactureAvoirService } from '../facture-avoir.service';
import { MonnaisModel } from '../../../admin/taxe/Monnais.Model';
import { Router } from '@angular/router';
import { FactureAvoirComponent } from '../facture-avoir.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { DatePipe } from '@angular/common';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';

@Component({
  selector: 'ngx-modal-facture-avoir',
  templateUrl: './modal-facture-avoir.component.html',
  styleUrls: ['./modal-facture-avoir.component.scss']
})
export class ModalFactureAvoirComponent implements OnInit {
  e = localStorage.getItem('e');
  id = localStorage.getItem('idFacture');
  facture: FactureClientModel = new FactureClientModel()
  factureAvoir: FactureAvoirModel = new FactureAvoirModel()
  devis: DevisClientModel = new DevisClientModel()
  commande: CommandeModel = new CommandeModel()
  client: ClientModel = new ClientModel();
  article: any[] = []
  devises = Object.values(MonnaisModel);
  referenceclient: string;
  settings: any
  source: LocalDataSource
  quantityProducts: any[]
  quantityProductModel: QuantityProductModel = new QuantityProductModel()
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel()
  modes: ModeDePaiementModel[]
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  conditions: ConditionDePaiementModel[]
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  echeancePaiementFCTAV: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  liste: any[] = []
  quantityNotNull: any = [];
  adresse: AdresseLivraison = new AdresseLivraison()
  adresses: any[] = []
  p: number
  modesPaiements: ModeDePaiementModel[];
  prixtot: number = 0
  totaleTVaPourcentage: number = 0
  totaleTVaPourcentageMontant: number = 0
  disabled = false;
  codFActure: number;
  idReclamation: number
  etat = ""
  idEntr = localStorage.getItem('current_entreprise')
  @ViewChild('contentToConvert') contentRef: ElementRef;
  constructor(
    private serviceFacture: FactureService,
    private serviceFactureAvoir: FactureAvoirService,
    private serviceBC: CommandeService,
    private serviceCLT: ClientService,
    private serviceDevis: DevisClientService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceConditionPaiement: ConditionDePaiementService,
    private serviceEcheanceDePaiement: EcheanceDePaiementServiceService,
    private serviceQuantityProduct: QuantityProductService,
    private router: Router,
    public datepipe: DatePipe,
    private serviceDemandeLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceLivraison: AdresseLivraisonClientService,
    private toastrService: NbToastrService,

    public windowRef: NbWindowRef,
    @Inject(NB_WINDOW_CONTEXT) context) {
    if (context.etat === "show") {
      this.factureAvoir = context.data;
      this.disabled = context.disabled
      console.log("data :", context.data)
    }


    this.codFActure = context.codFacture;
    this.idReclamation = context.idReclamation;
    console.log("code  reclamation::", this.idReclamation)
    this.etat = context.etat
  }

  ngOnInit() {

    this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(data => {
      this.modesPaiements = data;

    })

    this.serviceFacture.getFactureById(this.codFActure).subscribe(data => {
      this.facture = data
      console.log(data)
      this.serviceBC.getCommandeById(this.facture.code_cmd).subscribe(
        dataCommande => {
          this.commande = dataCommande;
          this.client.code_clt = this.commande.code_clt
          this.referenceclient = "CLT" + this.client.code_clt

          this.serviceCLT.getClientById(+this.client.code_clt).subscribe(
            data1 => {
              this.client = data1;
            },
            error => {
              console.log(error);
            },
          );
          this.serviceDevis.getDevisById(dataCommande.id_devis).subscribe(dataDevis => {
            this.devis = dataDevis
            this.serviceDemandeLivraison.getAdressesbyDemande(this.devis.code_list).subscribe(dataDemande => {
              for (let x = 0; x < dataDemande.length; x++) {
                this.serviceLivraison.getAdressebyid(dataDemande[x].idLivraison).subscribe(dataL => {
                  this.adresse = dataL;
                  this.adresses.push({
                    "adresse": dataL.adresse,
                    "codePostal": dataL.codePostal,
                    "ville": dataL.ville, "pays": dataL.pays
                  })
                  console.log("data====>", this.adresses)
                })

              }
            })
            this.serviceModePaiement.getModeDePaiementById(this.devis.idpaiement).subscribe(dataModeP => {
              this.modePaiement = dataModeP
              console.log("dataModeP", dataModeP)

            })
            this.serviceConditionPaiement.getConditionById(this.devis.idConditionpaiement).subscribe(dataCP => {
              this.conditionPaiement = dataCP
            })
            this.serviceEcheanceDePaiement.getEcheancheDePaiementDevis(this.devis.id_devis).subscribe(dataEP => {
              this.echeancePaiement = dataEP

            })
          })
          this.serviceQuantityProduct.getAllquantityProductDevis(dataCommande.id_devis).subscribe(data => {
            this.quantityProducts = data
            console.log('QP==>', this.quantityProducts)
            for (let i = 0; i < data.length; i++) {
              this.p = data[i].prix_unitaire * data[i].quantitytot
              this.liste.push({
                "idQuantityProduct": data[i].idQuantityProduct,
                "quantityStock": data[i].quantityStock,
                "designation": data[i].designation,
                "code": data[i].code,
                "idProduct": data[i].idProduct,
                "quantitytot": data[i].quantitytot,
                "prix_unitaire": data[i].prix_unitaire,
                "devise": data[i].devise,
                "qtemanquante": 0,
                "prix_tot": this.p,
                "productConditionnementEmballages": data[i].productConditionnementEmballages,
                "productsTaxe": data[i].productsTaxe

              })

            }
            this.source = new LocalDataSource(this.liste);

          })
        },
        error => {
          console.log(error);
        },
      );

    })
    this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(dataMP => {
      this.modes = dataMP
    })
    /*this.serviceConditionPaiement.getAllConditionDePaiementbyTypeEcheancier('Client').subscribe(dataC => {
      this.conditions = dataC
    })*/
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
        add: false,
        delete: true,
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
          title: 'Designation',
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
        prix_unitaire: {
          title: 'Prix Unitaire',
          type: 'number',
          filter: true,
        },
        quantitytot: {
          title: 'Quantité totale',
          type: 'number',
          filter: true
        },
        qtemanquante: {
          title: 'Quantité manquante',
          type: 'number',
          filter: true,
        },
        prix_tot: {
          title: 'Prix Total',
          type: 'number',
          filter: true,
          editable: false,
          addable: false,
          valuePrepareFunction(cell, row) {
            row.prix_tot = row.quantitytot * row.prix_unitaire
            return (row.prix_tot)
          }
        },
        productsTaxe: {
          title: 'Taxe',
          type: 'string',
          width: '200px',
          filter: true,
          valuePrepareFunction(cell, row) {
            for (let j = 0; j < cell.length; j++) {
              if (cell[j].taxe.devise == null) {
                cell[j].taxe.devise = "%"
              }

              return cell.map(data => data.taxe.name + "=" + data.taxe.pourcentage + " " + data.taxe.devise)

            }
          }
        }
      },
    };
  }



  show(event) {

    event.confirm.resolve()
    let t = 0;
    for (let i = 0; i < this.liste.length; i++) {
      if (this.liste[i].idProduct == event.newData.idProduct) {
        this.liste[i].quantitytot == event.newData.quantitytot
        this.liste[i].quantityStock = event.newData.quantityStock
        this.liste[i].prixdeventePropose == event.newData.prixdeventePropose
        this.liste[i].prix_unitaire == event.newData.prox_unitaire
        this.liste[i].code == event.newData.code
        this.liste[i].designation == event.newData.designation
        this.liste[i].devise == event.newData.devise
        this.liste[i].qtemanquante = +(event.newData.qtemanquante)
        this.liste[i].prix_tot = +(event.newData.prix_tot)
        this.liste[i].productsTaxe = event.newData.productsTaxe
        t = 1
        break
      }
    }
    if (t == 0) {
      this.liste.push({
        "quantityStock": event.newData.quantityStock,
        "desigantion": event.newData.designation,
        "code": event.newData.code,
        "idProduct": event.neData.idProduct,
        "devise": event.newData.devise,
        "prix_unitaire": event.newData.prix_unitaire,
        "qtemanquante": (+event.newData.qtemanquante),
        "quantitytot": +(event.newData.quantitytot),
        "prix_tot": +(event.newData.prixdeventePropose * event.newData.quantitytot),
        "productsTaxe": event.newData.productsTaxe

      })


    }


    this.source = new LocalDataSource(this.liste)

  }

  onAddRCM() {
    this.factureAvoir.facture = this.facture;
    console.log(this.factureAvoir)
    this.serviceFactureAvoir.addFactureAvoir(this.idReclamation, this.factureAvoir).subscribe(
      data => {
        this.factureAvoir = data; console.log(data);
        this.showToast(NbToastStatus.SUCCESS, "Facture Avoirs", "est ajouter avec succéss")
        this.router.navigate(['/pages/vente/factureAvoir']);
        this.windowRef.close();
      },
      err => { console.log('error add facture avoire') }
    )
  }

  // onAddRCM() {

  //   // this.factureAvoir.code_fac = this.facture.code_fac
  //   // this.factureAvoir.sommeTotaleHt = this.devis.sommeTotaleHt
  //   // this.factureAvoir.remise = this.devis.remise
  //   // this.factureAvoir.sommeRemise = this.devis.sommeRemise
  //   // this.factureAvoir.sommeTVA = this.devis.sommeTVA
  //   // this.factureAvoir.sommeTotaleavecTVA = this.devis.sommeTotaleavecTVA
  //   // this.factureAvoir.sommeFinale = this.devis.sommeFinale
  //   // this.factureAvoir.fraislivraison = this.devis.fraislivraison
  //   // this.factureAvoir.autrefrais = this.devis.autrefrais
  //   // this.factureAvoir.montantpayer = this.commande.montantpayer
  //   // this.factureAvoir.montantReste = this.commande.montantReste
  //   // this.factureAvoir.sommeFinaleLettre = this.commande.montantResteLettre
  //   // this.factureAvoir.date_fac_av = new Date();
  //   // this.factureAvoir.devise = this.devis.devise
  //   // this.factureAvoir.idPaiement = this.modePaiement.idPaiement
  //   // this.factureAvoir.typePaiement = this.devis.typePaiement
  //   // this.factureAvoir.idConditonement = this.conditionPaiement.id
  //   // this.factureAvoir.datePaiement = this.devis.datePaiement

  //   this.serviceFactureAvoir.addFactureAvoir(this.factureAvoir).subscribe(
  //     data => {
  //       this.factureAvoir = data
  //       if (this.factureAvoir.typePaiement = "Par période") {
  //         this.echeancePaiementFCTAV.option = this.echeancePaiement.option
  //         this.echeancePaiementFCTAV.nbrmois = this.echeancePaiementFCTAV.nbrmois
  //         this.serviceEcheanceDePaiement.addEcheanceDePaiementFactureAvoir(this.echeancePaiementFCTAV, this.factureAvoir.code_fac_av).subscribe(dataEP => {
  //           this.echeancePaiementFCTAV = dataEP
  //         })
  //       }


  //       for (let i = 0; i < this.liste.length; i++) {
  //         console.log("idQ", this.liste[i].idQuantityProduct)
  //         this.p = this.liste[i].quantitytot * this.liste[i].prix_unitaire;
  //         console.log("quantitytot", this.liste[i].quantitytot)
  //         this.quantityProductModel = {
  //           "idQuantityProduct": 0, "id_devis": null, "code_fac_av": data.code_fac_av, "quantitytot": this.liste[i].quantitytot, "idProduct": this.liste[i].idProduct,
  //           "prix_tot": this.p, "qtemanquante": this.liste[i].qtemanquante, "prix_unitaire": this.liste[i].prix_unitaire

  //         }
  //         this.serviceQuantityProduct.addQuntityProductFactureAvoir(this.quantityProductModel).subscribe(dataQP => {
  //           this.quantityProductModel = dataQP
  //         })


  //       }

  //       console.log("factureAvoir", data)
  //       localStorage.removeItem('e');
  //       localStorage.removeItem('idFactureAvoir');
  //       this.showToast(NbToastStatus.SUCCESS, "Facture Avoirs", "est ajouter avec succéss")
  //       this.router.navigate([FactureAvoirComponent.urlFactureAvoir]);
  //       this.windowRef.close();
  //     },
  //     error => {
  //       console.log('error');
  //     }


  //   );
  // }
  onDeleteConfirm(event) {
    if (window.confirm(`Vous êtes sure de supprimer cette demande de produit?`)) {

      event.confirm.resolve(this.quantityProducts = this.quantityProducts.filter(item => item !== event.data));
      this.source = new LocalDataSource(this.quantityProducts);
    } else {
      event.confirm.reject();

    }
  }
  calculeMontantHT() {
    console.log("this.quantityNotNull.length", this.liste.length)
    for (let j = 0; j < this.liste.length; j++) {
      this.prixtot += (this.liste[j].prix_unitaire * this.liste[j].quantitytot)
      console.log("this.prixtot", this.prixtot)
    }
    this.devis.sommeTotaleHt = +this.prixtot


  }
  CalculetotaleTVa() {
    let today = new Date()
    let datetoday = this.datepipe.transform(today, 'dd-MM-yyyy')
    let dateF = this.datepipe.transform(this.client.date_finExonerationTva, 'dd-MM-yyyy')
    console.log("datetoday", datetoday)
    console.log("dateF", dateF)
    if (this.client.exonerationTva == "Exonéré de la TVA" && dateF > datetoday) {
      this.devis.sommeTVA = 0
    } else {
      for (let i = 0; i < this.liste.length; i++) {
        for (let j = 0; j < this.liste[i].productTaxes.length; j++) {
          if (this.liste[i].productTaxes[j].taxe.type == "Pourcentage") {
            this.totaleTVaPourcentage += (this.liste[i].prix_unitaire * this.liste[i].quantitytot * this.liste[i].productTaxes[j].taxe.pourcentage) / 100
          }
          if (this.liste[i].productsTaxe[j].taxe.type == "Montant fixe") {
            this.totaleTVaPourcentageMontant += (this.liste[i].productTaxes[j].taxe.pourcentage * this.liste[i].quantitytot) + (this.liste[i].prix_unitaire * this.liste[i].quantitytot)
          }
        }
      }

      this.devis.sommeTVA = this.totaleTVaPourcentage + this.totaleTVaPourcentageMontant
    }
  }
  calculTotaleavecRemise() {
    if (this.devis.remise != null) {
      this.devis.sommeRemise = this.devis.sommeTotaleHt - ((this.devis.sommeTotaleHt * this.devis.remise) / 100)
    } else {
      this.devis.sommeRemise = this.devis.sommeTotaleHt
    }
  }
  calculPrixTotal() {
    if (this.devis.sommeRemise == null && this.devis.sommeTotaleavecTVA == null) {
      this.devis.sommeFinale = this.devis.sommeTotaleHt + this.devis.fraislivraison + this.devis.autrefrais
    }
    else if (this.devis.sommeTotaleavecTVA != null) {
      this.devis.sommeFinale = this.devis.sommeTotaleavecTVA + this.devis.fraislivraison + this.devis.autrefrais
    }
    else
      this.devis.sommeFinale = this.devis.sommeRemise + this.devis.fraislivraison + this.devis.autrefrais;
  }

  calculeTTC() {
    if (this.devis.sommeRemise == null) {
      this.devis.sommeTotaleavecTVA = this.devis.sommeTotaleHt + this.devis.sommeTVA
      console.log(" this.devis.sommeTotaleavecTVA", this.devis.sommeTotaleavecTVA)
    }
    else {
      this.devis.sommeTotaleavecTVA = this.devis.sommeRemise + this.devis.sommeTVA
    }
  }

  MontantRest() {
    if (this.commande.montantpayer < this.devis.sommeFinale) {
      this.commande.montantReste = this.devis.sommeFinale - this.commande.montantpayer
    } else {
      this.commande.montantReste = 0
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
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
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
}