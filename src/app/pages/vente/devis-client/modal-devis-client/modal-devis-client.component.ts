import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDateService, NbWindowRef, NbToastrService, NbGlobalPhysicalPosition, NbWindowService } from '@nebular/theme';
import { DevisClientService } from '../devis-client.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DevisClientModel } from '../devis-client.model';
import { LocalDataSource } from 'ng2-smart-table';
import { DemandePrixClientService } from '../../demande-prix-client/demande-prix-client.service';
import { DemandePrixClientModel } from '../../demande-prix-client/demande-prix-client.model';
import { ProductService } from '../../../admin/product/product.service';
import { ClientService } from '../../../admin/client/client.service';
import { ClientModel } from '../../../admin/client/client.model';
import { ProductModel } from '../../../admin/product/product.model';
import { DevisClientComponent } from '../devis-client.component';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { QuantityClientService } from '../../demande-prix-client/quantity-client.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { DemandePrixClientAdresseDeLivraisonModel } from '../../demande-prix-client/demande-prix-client-adresses-de-livraison-model';
import { DatePipe } from '@angular/common';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { MonnaisModel } from '../../../admin/taxe/Monnais.Model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';
import { ListEcheanceVenteModel } from '../../echeance-de-paiement/list-echeance-model';
import { ListEcheanceService } from '../../echeance-de-paiement/list-echeance.service';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js';
import { Subscription, interval } from 'rxjs';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-modal-devis-client',
  templateUrl: './modal-devis-client.component.html',
  styleUrls: ['./modal-devis-client.component.scss'],

})
export class ModalDevisClientComponent implements OnInit {
  totaleTVaPourcentage: number = 0;
  totaleTVaPourcentageMontant: number = 0;
  demandeprix: DemandePrixClientModel = new DemandePrixClientModel();
  client: ClientModel = new ClientModel();
  adresse: AdresseLivraison;
  modePaiementDevis: ModeDePaiementModel = new ModeDePaiementModel();

  modesPaiements: ModeDePaiementModel[];

  conditionPaiementDevis: ConditionDePaiementModel = new ConditionDePaiementModel();
  conditionPaiements: ConditionDePaiementModel[];

  //echeancePaiementDemandePrix: EcheanceDePaiementModel = new EcheanceDePaiementModel()
  devis: DevisClientModel = new DevisClientModel();
  product: ProductModel = new ProductModel();
  products: ProductModel[];
  quantitys: any[];
  quantityProductModel: QuantityProductModel;
  quantitysProduct: any[] = []
  addProductList: ProductModel[] = []
  liste: any[] = [];
  demandeList: any[] = []
  p: number = 0;
  prixtot: number = 0;
  referenceclient: string;
  referencedemande: string;
  referencedevis: string;
  ARCM: string;
  taxePourcentage: any;
  ttc: number = 0;
  //quantityProducts: QuantityProductModel[];
  source: LocalDataSource = new LocalDataSource();
  id2 = localStorage.getItem('idRC');
  id1 = localStorage.getItem('idClient');
  e = localStorage.getItem('e');
  today = new Date();
  id = localStorage.getItem('idDevis')
  idP: number;
  settings: any
  monnaie: string;

  adresses: any[] = []
  typeClient = ""
  listEcheanceForm: FormGroup
  listeEcheance: ListEcheanceVenteModel = new ListEcheanceVenteModel()
  idEntr = localStorage.getItem('current_entreprise')
  starategiePaiement: string
  //value: any
  entreprise: Entreprise
  sommeNETHTaecRemise: number = 0;
  sommeTVA: number = 0;
  sommeTTC: number = 0
  sommeTotale = 0
  idUniteTransaction = localStorage.getItem('idUniteTransaction')
  thousands: any
  decimal: any
  precision: any
  source2 = interval()
  subscription: Subscription
  public mask = createNumberMask({
    allowDecimal: true,
    decimalLimit: null
  });
  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: DevisClientService,

    private toastrService: NbToastrService,

    private serviceQuantity: QuantityClientService,
    private serviceQuantityProduct: QuantityProductService,
    private serviceModePaiement: ModeDePaiementService,
    private serivceConditionPaiement: ConditionDePaiementService,
    private serviceEntrprise: EntrepriseService,
    private serviceDevis: DevisClientService,
    private uniteTransactionService: UniteDeTransactionService,
    public datepipe: DatePipe,
    private serviceEcheance: EcheanceDePaiementServiceService,
    private _fb: FormBuilder,
    private serviceTransaction: UniteDeTransactionService,
    private userService: UtilisateurService,
    private serviceListeEcheance: ListEcheanceService,
  ) { }

  ngOnInit() {
    this.devis.emisepar = this.userService.getCurrentUserCell().userName
    this.serviceEntrprise.getEnterpriseById(+this.idEntr).subscribe(data => {
      this.entreprise = data
    }

    )

    this.listEcheanceForm = this._fb.group({
      listeEcheance: this._fb.array([this.addListEcheanceGroup()])
    });

    this.devis.autrefrais = 0;
    this.devis.fraislivraison = 0;
    this.devis.avance = 0

    this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(data => {
      this.modesPaiements = data;

    })
    this.uniteTransactionService.getUniteDeTransactionById(+this.idUniteTransaction).subscribe(data => {
      this.monnaie = data.sigle
      this.setFormatNumber(data)
    })

    // 
    if (this.e === '0') {
      this.ARCM = 'Ajouter';
      this.devis.remise = 0
      this.serviceQuantity.getAllbyDemandeDePrix(+this.id2).subscribe(data => {
        this.quantitys = data
        for (let i = 0; i < data.length; i++) {
          this.liste.push({
            "idProduct": data[i].idProduct,
            "quantityStock": data[i].quantityStock,
            "designation": data[i].designation,
            "uniteMesure": data[i].uniteMesure,
            "code": data[i].code,
            "quantity": data[i].quantity,
            "productConditionnementEmballages": data[i].productConditionnementEmballages,
            "prixdeventePropose": data[i].prixdeventePropose,
            "devise": data[i].devise,
            "qtemanquante": 0,
            "prix_tot": this.p,
            "name": data[i].name,
            "pourcentage": data[i].pourcentage,
            "idUnite": data[i].idUnite


          })

        }
        this.source = new LocalDataSource(this.liste);

        this.calculeMontantHT()
      })


    }


    if (this.e === '1') {
      this.ARCM = 'Modifier';

      this.serviceDevis.getDevisById(+this.id).subscribe(devis => {
        this.devis = devis;
        this.serviceModePaiement.getModeDePaiementById(devis.idpaiement).subscribe(dataModeP => {
          this.modePaiementDevis = dataModeP

        }),
          this.serivceConditionPaiement.getConditionById(devis.idConditionpaiement).subscribe(dataConditionP => {
            this.conditionPaiementDevis = dataConditionP
            this.starategiePaiement = this.conditionPaiementDevis.strategie
          })
      })

      this.serviceQuantityProduct.getAllquantityProductDevis(+this.id).subscribe(data => {
        this.quantitysProduct = data
        for (let i = 0; i < data.length; i++) {
          this.idP = data[i].idProduct

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
      })
      this.calculeMontantHT()


    }

    this.subscription = this.source2.subscribe(val =>
      this.devis.sommeRemise = this.devis.sommeTotaleHt - ((this.devis.sommeTotaleHt * this.devis.remise) / 100)
    );
    if (this.devis.remise != null) {
      this.subscription = this.source2.subscribe(val =>
        this.devis.sommeTotaleavecTVA = this.devis.sommeRemise + this.totaleTVaPourcentage

      );
    }
    this.subscription = this.source2.subscribe(val =>
      this.devis.sommeFinale = this.devis.sommeTotaleavecTVA + this.devis.fraislivraison + this.devis.autrefrais
    );




    if (this.e === '0') {
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
            width: '70px'
          },
          designation: {
            title: 'Produit',
            width: '150px',
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
              type: 'number',
              filter: true,
            },*/
          prixdeventePropose: {
            title: 'Prix unitaire',
            type: 'number',
            filter: true,
            editable: false,
            addable: false,
            valuePrepareFunction(cell, row) {

              return (row.prixdeventePropose + " " + row.devise)
            }
          },

          quantity: {
            title: 'Quantité totale',
            type: 'number',

            filter: true,
          },
          /*  qtemanquante: {
              title: 'Quantité mauquant',
              type: 'number',
              filter: true,
              editable: false,
              addable: false,
              valuePrepareFunction(cell, row) {
                if (row.quantityStock > row.quantity) {
                  row.qtemanquante = 0
  
                }
                else {
                  row.qtemanquante = row.quantity - row.quantityStock
                }
                return (row.qtemanquante)
              }
            },*/
          prix_tot: {
            title: 'Prix Total',
            type: 'number',
            width: '150px',
            filter: true,
            editable: false,
            addable: false,
            valuePrepareFunction(cell, row) {
              row.prix_tot = row.quantity * row.prixdeventePropose
              return (row.prix_tot + " " + row.devise)
            }
          },
          name: {
            title: 'Taxe',
            type: 'string',
            filter: true,
            editable: false,
            addable: false,
            valuePrepareFunction(cell, row) {
              return cell + "= " + row.pourcentage + "%"
            }
          }

        }

      };

    }
    if (this.e === '1') {
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

    }
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
  addListEcheanceGroup() {
    return this._fb.group({
      datePaiement: [null,],
      montant: [null,],
    })
  }

  addEcheance() {

    this.listeEcheanceArray.push(this.addListEcheanceGroup());

  }
  removeEcheance(index) {
    this.listeEcheanceArray.removeAt(index);
  }

  get listeEcheanceArray() {

    return <FormArray>this.listEcheanceForm.get('listeEcheance');

  }
  onclose() {
    this.windowRef.close();
  }



  show(event) {
    if (this.e === '0') {
      this.prixtot = 0
      this.totaleTVaPourcentage = 0
      event.confirm.resolve()
      let t = 0;
      for (let i = 0; i < this.liste.length; i++) {
        if (this.liste[i].idProduct == event.newData.idProduct) {
          this.liste[i].quantity == event.newData.quantity
          this.liste[i].quantityStock = event.newData.quantityStock
          this.liste[i].prixdeventePropose == event.newData.prixdeventePropose
          this.liste[i].code == event.newData.code
          this.liste[i].designation == event.newData.designation
          this.liste[i].id_devis == event.newData.id_devis
          this.liste[i].devise == event.newData.devise
          this.liste[i].qtemanquante = +(event.newData.qtemanquante)
          this.liste[i].prix_tot = +(event.newData.prix_tot)
          this.liste[i].idUnite = event.newData.idUnite
          this.liste[i].pourcentage = event.newData.pourcentage,
            this.liste[i].conditionnementEmballage = event.newData.conditionnementEmballage
          t = 1
          break
        }
      }
      if (t == 0) {

        this.liste.push({
          "id_devis": (+event.newData.id_devis),
          "quantityStock": event.newData.quantityStock,
          "desigantion": event.newData.designation,
          "idProduct": event.newData.idProduct,
          "code": event.newData.code,
          "devise": event.newData.devise,
          "qtemanquante": (+event.newData.qtemanquante),
          "prixdeventePropose": +(event.newData.prixdeventePropose),
          "quantity": +(event.newData.quantity),
          "prix_tot": +(event.newData.prixdeventePropose * event.newData.quantity),
          "idUnite": event.newData.idUnite,
          "productConditionnementEmballages": event.newData.productConditionnementEmballages.map(data => data.conditionnementEmballage.typeConditionnement),
          "pourcentage": event.newData.pourcentage
        })


      }
      this.source = new LocalDataSource(event)

      this.calculeMontantHT()
      // this.CalculetotaleTVa2()

    }
    if (this.e === '1') {
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
  }



  onAddRCM(event) {
    let idEntr = localStorage.getItem('current_entreprise')
    this.devis.idEntreprise = +idEntr;
    if (this.e === '0') {

      this.devis.idpaiement = this.modePaiementDevis.idPaiement
      this.devis.idConditionpaiement = this.conditionPaiementDevis.id
      this.service.addDevis(this.devis, +this.id2).subscribe(
        data => {
          this.devis = data;

          for (let i = 0; i < this.liste.length; i++) {

            this.p = this.liste[i].quantity * this.liste[i].prixdeventePropose;

            this.quantityProductModel = {
              "idQuantityProduct": 0, "id_devis": data.id_devis, "code_fac_av": null, "quantitytot": this.liste[i].quantity, "idProduct": this.liste[i].idProduct,
              "prixTot": this.p, "qtemanquante": this.liste[i].qtemanquante, "prixUnitaire": this.liste[i].prixdeventePropose, "idUnite": this.liste[i].idUnite

            }
            console.log("prixtot==>", this.p)

            this.serviceQuantityProduct.addquantityProduct(this.quantityProductModel).subscribe(dataQP => {
              this.quantityProductModel = dataQP
            })
          }
          this.quantityProductModel = new QuantityProductModel();

          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          this.showToast(NbToastStatus.SUCCESS, "Devis", "est ajouter avec succéss")
          this.router.navigate([DevisClientComponent.urlRefreshDevisClient]);
          this.windowRef.close();


        },
        error => {
          this.showToast(NbToastStatus.DANGER, "Erreur", "")
          console.log('error');
        });


    }
    if (this.e === '1') {
      this.devis.idpaiement = this.modePaiementDevis.idPaiement
      this.devis.idConditionpaiement = this.conditionPaiementDevis.id
      //this.devis.demandeprix = this.demandeprix
      this.serviceDevis.updateDeviss(this.devis).subscribe(dataDevis => {
        this.devis = dataDevis
        for (let i = 0; i < this.liste.length; i++) {
          console.log("this.liste===>", this.liste)
          this.p = this.liste[i].quantitytot * this.liste[i].prixUnitaire;
          this.quantityProductModel = {

            "idQuantityProduct": this.liste[i].idQuantityProduct, "code_fac_av": null, "id_devis": dataDevis.id_devis, "quantitytot": this.liste[i].quantitytot, "idProduct": this.liste[i].idProduct,
            "prixTot": this.p, "qtemanquante": this.liste[i].qtemanquante, "prixUnitaire": this.liste[i].prixUnitaire, "idUnite": this.liste[i].idUnite
          }
          this.serviceQuantityProduct.updatequantityProductDevis(this.quantityProductModel, +this.id).subscribe(data => {
            this.quantityProductModel = data
            console.log("    this.quantityProductModel", this.quantityProductModel)
          })
        }

        this.quantityProductModel = new QuantityProductModel();

        localStorage.removeItem('e');
        localStorage.removeItem('idRC');
        this.showToast(NbToastStatus.SUCCESS, "Devis", "est modifier avec succéss")
        this.router.navigate([DevisClientComponent.urlRefreshDevisClient]);
        this.windowRef.close();
      },
        error => {
          this.showToast(NbToastStatus.DANGER, "Erreur", "")
        }
      )
    }
  }

  getListConditionPaiementParStragie() {
    this.serivceConditionPaiement.getAllConditionDePaiementbyTypeEcheancier('Client', this.starategiePaiement).subscribe(data => {
      this.conditionPaiements = data

    })

  }
  calculeAvance() {
    if (this.starategiePaiement == 'Fixation en pourcentage') {
      console.log("this.CPD", this.conditionPaiementDevis)
      for (let i = 0; i < this.conditionPaiementDevis.listcondiontDePaiements.length; i++) {
        if (this.conditionPaiementDevis.listcondiontDePaiements[i].option == 'A la date de commande') {
          //  this.value = this.conditionPaiementDevis.listcondiontDePaiements[i].pourcentage.replace("%", "")
          //   this.value.replace(" ", "")
          this.devis.avance = (this.devis.sommeFinale * this.conditionPaiementDevis.listcondiontDePaiements[i].pourcentage) / 100

        }

      }
    }
  }
  calculeMontantHT() {
    if (this.e === '0') {
      for (let j = 0; j < this.liste.length; j++) {
        this.prixtot += this.liste[j].prixdeventePropose * this.liste[j].quantity
      }
      this.devis.sommeTotaleHt = +this.prixtot
      this.calculTotaleavecRemise()
      this.CalculetotaleTVa2()

    }
    if (this.e === '1') {
      this.devis.sommeTotaleHt = 0
      for (let j = 0; j < this.liste.length; j++) {
        this.prixtot += this.liste[j].prixUnitaire * this.liste[j].quantitytot
      }
      this.devis.sommeTotaleHt = +this.prixtot
      this.calculTotaleavecRemise()
      this.CalculetotaleTVa2()
    }
  }

  calculTotaleavecRemise() {
    if (this.devis.remise != null) {
      this.devis.sommeRemise = +this.prixtot - ((+this.prixtot * this.devis.remise) / 100)

    } else {
      this.devis.sommeRemise = +this.prixtot

    }
    this.calculeTTC()
  }
  calculPrixTotal() {
    if (this.devis.sommeRemise == null && this.totaleTVaPourcentage == null) {
      this.devis.sommeFinale = this.devis.sommeTotaleHt + this.devis.fraislivraison + this.devis.autrefrais
      this.calculeAvance()

    }
    else if (this.totaleTVaPourcentage != null) {
      this.devis.sommeFinale = this.devis.sommeTotaleavecTVA + this.devis.fraislivraison + this.devis.autrefrais
      this.calculeAvance()

    }
    else {
      this.devis.sommeFinale = this.devis.sommeTotaleavecTVA + this.devis.fraislivraison + this.devis.autrefrais;
      this.calculeAvance()

    }

  }

  calculeTTC() {
    this.devis.sommeTotaleavecTVA = this.devis.sommeRemise + this.totaleTVaPourcentage
    this.calculPrixTotal()
  }


  CalculetotaleTVa2() {
    if (this.e === '0') {
      if (this.client.exonerationTva == "Exonéré de la TVA") {
        this.devis.sommeTVA = 0

      } else {
        for (let i = 0; i < this.liste.length; i++) {

          this.totaleTVaPourcentage += (this.liste[i].prixdeventePropose * this.liste[i].quantity * this.liste[i].pourcentage) / 100
        }
        this.devis.sommeTVA = this.totaleTVaPourcentage


      }
      this.calculeTTC()
    }
    if (this.e === '1') {
      if (this.client.exonerationTva == "Exonéré de la TVA") {
        this.devis.sommeTVA = 0
      } else {
        for (let i = 0; i < this.liste.length; i++) {
          this.totaleTVaPourcentage = 0
          this.totaleTVaPourcentage += (this.liste[i].prixTot * this.liste[i].pourcentage) / 100
          console.log(" this.totaleTVaPourcentage", this.totaleTVaPourcentage)
        }
        this.devis.sommeTVA = this.totaleTVaPourcentage
      }
      this.calculeTTC()
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

    this.devis.sommeFinaleLettre = numberToLetter

    return numberToLetter;

  }
  NumberToLetter2() {
    this.devis.sommeFinaleLettre = NumberToLetter(this.devis.sommeFinale)

    console.log(NumberToLetter(this.devis.sommeFinale))
  }
  onDeleteConfirm(event) {
    if (this.e === '0') {
      if (window.confirm(`Vous êtes sure de supprimer cette demande de produit?`)) {


        event.confirm.resolve(this.liste = this.liste.filter(item => item !== event.data));

        this.source = new LocalDataSource(this.liste);
      } else {
        event.confirm.reject();
      }
    }
    if (this.e === '1') {
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