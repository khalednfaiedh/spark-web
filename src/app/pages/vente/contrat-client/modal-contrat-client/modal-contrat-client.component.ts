import { Component, OnInit, Inject } from '@angular/core';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ContratClientService } from '../contrat-client.service';


import { ClientModel } from '../../../admin/client/client.model';
import { ProductModel } from '../../../admin/product/product.model';
import { ProductService } from '../../../admin/product/product.service';
import { ClientService } from '../../../admin/client/client.service';
import { TaxeService } from '../../../admin/taxe/services/taxe.service';
import { ContratClientComponent } from '../contrat-client.component';
import { FamilleDeProduitService } from '../../../admin/famille-de-produit/famille-de-produit.service';
import { FamilleDeProduitModel } from '../../../admin/famille-de-produit/famille-de-produit.model';
import { ContratClientModel } from '../contrat-client-model';
import { TarifsDeVentesService } from '../../tarifs-de-vente/service/tarifs-de-ventes.service';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { TarifsDeVenteModel } from '../../tarifs-de-vente/tarifs-de-vente.model';
import { CoordonnesBancaireClientService } from '../../../admin/client/coordonnes-bancaire-client/service/coordonnes-bancaire-client.service';
import { CoordonneesBancaireModel } from '../../../admin/client/coordonnes-bancaire-client/CoordonneBancaire.Model';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { MonnaisModel } from '../../../admin/taxe/Monnais.Model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { QuantityClientModel } from '../../demande-prix-client/quantity-client.model';
import { QuantityClientService } from '../../demande-prix-client/quantity-client.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { FormControl, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { interval, Subscription } from 'rxjs';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-modal-contrat-client',
  templateUrl: './modal-contrat-client.component.html',
  styleUrls: ['./modal-contrat-client.component.scss']
})
export class ModalContratClientComponent implements OnInit {

  etat = ""
  disabled: boolean = false;
  code_clt = localStorage.getItem('idClient');
  FamilleDeProduits: FamilleDeProduitModel[];
  contrat: ContratClientModel = new ContratClientModel();
  //source: LocalDataSource = new LocalDataSource()
  source: any
  tarifs: TarifsDeVenteModel[];
  liste: any[] = []
  listeNotNull: any[] = []
  referenceclient: string
  ARCM: string
  p: number
  adresses: AdresseLivraison;
  modesPaiements: ModeDePaiementModel[];
  conditionPaiements: ConditionDePaiementModel[];
  modePaiement: ModeDePaiementModel;
  conditionPaiement: ConditionDePaiementModel;
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  adresse: AdresseLivraison = new AdresseLivraison()
  coordonneBancaires: CoordonneesBancaireModel[];
  coordonneBancaire: CoordonneesBancaireModel = new CoordonneesBancaireModel();
  client: ClientModel = new ClientModel();
  clients: ClientModel[];
  product: ProductModel = new ProductModel();
  tarifDeVente: TarifsDeVenteModel = new TarifsDeVenteModel();
  // prixProductModel: PrixProductModel = new PrixProductModel();
  quantityProductModel: QuantityProductModel[] = []
  idClientTarif: any
  taxes: any[] = []
  taxePourcentage: any;
  quantityInitial: any[] = []
  quantityNotNull: any[] = []
  quantityModel: QuantityProductModel = new QuantityProductModel()
  devises: any[]
  thousands: any
  decimal: any
  precision: number
  idEntr = localStorage.getItem('current_entreprise')
  unitiesMesureProduct: any
  listProductForm: FormGroup
  items: FormArray;
  products: ProductModel[]
  source2 = interval()
  subscription: Subscription
  contratParents: ContratClientModel[]
  settings: any
  etatContrat = localStorage.getItem('etatContrat')
  constructor(private serviceProduct: ProductService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private serviceContrat: ContratClientService,
    private router: Router,
    private serivceConditionPaiement: ConditionDePaiementService,
    private serviceCond: CoordonnesBancaireClientService,
    private serviceAdresse: AdresseLivraisonClientService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceCLT: ClientService,
    private quantityProductService: QuantityProductService,
    private serviceTaxe: TaxeService,
    private serviceP: ProductService,
    private _fb: FormBuilder,
    private serviceUniteTransaction: UniteDeTransactionService,
    private servicePrixProduct: TarifsDeVentesService,
    private serviceQuantityProduct: QuantityProductService,
    @Inject(NB_WINDOW_CONTEXT) context, ) {
    if (context.etat == "edit") {
      this.ARCM = 'Modfier';
      this.etat = "edit"
      //console.log("context.data", context.data)
      this.contrat = context.data;
      this.serviceContrat.getContratById(this.contrat.idContrat).subscribe(
        data => {
          this.contrat = data;
        })
      this.listProductForm = this._fb.group({
        listeProduct: this._fb.array([])
      });

    }

    if (context.etat == "add") {
      this.ARCM = 'Ajouter';
      this.etat = "add"
      this.listProductForm = this._fb.group({
        listeProduct: this._fb.array([this.addListProduitGroup()])
      });
    }

    if (context.etat == "show" || this.etatContrat == "show") {
      this.disabled = true
      this.contrat = context.data;
      this.serviceContrat.getContratById(this.contrat.idContrat).subscribe(
        data => {
          this.contrat = data;

          this.source = this.contrat.contratClientFils

          console.log("this.source===>", this.source)
        }
      )
      this.listProductForm = this._fb.group({
        listeProduct: this._fb.array([])
      });
    }

    this.settings = {
      actions: false,
      columns: {
        idContrat: {
          title: 'Numéro de contrat',
          type: 'string',
        },
        type: {
          title: 'Type',
          type: 'string',
          filter: true,
        },
        datecreation: {
          title: 'Date de création',
          type: 'Date',
          filter: true,
        },

      },
    };
  }

  ngOnInit() {
    // this.contrat = new ContratClientModel();
    let id = localStorage.getItem('current_entreprise')

    if (this.etat === "edit" || this.etat === "add" || this.etat == "show") {
      this.serviceP.getAllproduct(+id).subscribe(
        data2 => {
          this.products = data2

        },
        error => {
          console.log(error);
        });
    }
    if (this.etat === "edit" || this.etat == "show") {
      this.serivceConditionPaiement.getAllConditionDePaiementbyTypeEcheancier('Client', this.contrat.strategie).subscribe(data => {
        this.conditionPaiements = data
      })
      const lines1 = this.listProductForm.get('listeProduct') as FormArray;
      this.serviceQuantityProduct.getAllquantityProductContrat(this.contrat.idContrat).subscribe(dataQP => {
        dataQP.forEach(element => {

          lines1.push(this.updateListProduitGroup(element))
          for (let j = 0; j < lines1.length; j++) {
            this.changeUniteMesureParProduct(j)
          }
        })
      }
      )
      // })

      this.serviceTaxe.getAllTaxes(+id).subscribe(data => {
        this.taxes = data;
      })
      this.serviceUniteTransaction.getAllUniteDeTransaction(+this.idEntr).subscribe(data => {
        this.devises = data
      })

      this.serviceCLT.getAllClient(+this.idEntr).subscribe(data => {
        this.clients = data;
      })

      this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(data => {
        this.modesPaiements = data;

      })

      this.subscription = this.source2.subscribe(val => {
        for (let i = 0; i < this.listeProductArray.value.length; i++) {
          this.listeProductArray.at(i).patchValue({
            prixTot: this.listeProductArray.value[i].prixUnitaire * this.listeProductArray.value[i].quantitytot
          })
        }
      }

      );
    }



  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
  ControleDate(event) {
    var today = new Date()
    if (event.getTime() <= today.getTime()) {
      this.showToast(NbToastStatus.DANGER, "Date incorrecte", "Vous pouvez choisir une date superierue à celle du aujourd'hui")
    }
  }
  SelectClient() {
    let id: any = this.contrat.codeClt

    this.serviceCLT.getClientById(+id).subscribe(data => {
      this.client = data
      console.log("idClient===>", this.client)
      this.contrat.idPaiement = this.client.modeDepaiement.idPaiement;
      this.contrat.typePaiement = this.client.typePiament;
      this.serivceConditionPaiement.getAllConditionDePaiementbyTypeEcheancier('Client', this.client.conditionsDePaiements.strategie).subscribe(data => {
        this.conditionPaiements = data
        this.contrat.idConditionpaiement = this.client.conditionsDePaiements.id
        this.contrat.strategie = this.client.conditionsDePaiements.strategie
      })
    })
    this.serviceContrat.getcontratbyidclient(+id).subscribe(data => {

      this.contratParents = data
    })
  }
  changeDataContrat() {

    this.serviceContrat.getContratById(this.contrat.idContratParent).subscribe(data => {
      this.contrat.dateDebut = data.dateDebut
      this.contrat.dateFin = data.dateFin
      this.contrat.idConditionpaiement = data.idConditionpaiement
      this.contrat.idPaiement = data.idPaiement
      this.listProductForm = this._fb.group({
        listeProduct: this._fb.array([])
      });
      const lines1 = this.listProductForm.get('listeProduct') as FormArray;
      data.quantityProducts.forEach(element => {

        lines1.push(this.updateListProduitGroup(element))
        for (let j = 0; j < lines1.length; j++) {
          this.changeUniteMesureParProduct(j)
        }
      })
    })
  }
  calculprixtotal(prixUnitaire, quantity) {
    return (prixUnitaire * quantity);
  }
  calculer(i) {
    this.items = this.listProductForm.get('listeProduct') as FormArray;
    let items = this.items.value;

    return this.calculprixtotal(items[i].prixUnitaire, items[i].quantitytot);
  }




  addContrat(formValu) {
    let e = localStorage.getItem('e');
    //this.items = this.listProductForm.get('listeProduct') as FormArray;
    // console.log("this.items===>", this.items)
    // this.contrat.quantityProducts = this.items.value
    //this.contrat.idClient = this.client.code_clt;

    if (this.etat === "add") {


      this.serviceContrat.addContrat(this.contrat).subscribe(
        data => {
          console.log(data.idContrat)
          formValu.listeProduct.forEach(element1 => {
            element1.prixTot = element1.prixUnitaire * element1.quantitytot
            this.quantityProductService.addquantityProductContrat(data.idContrat, element1).subscribe(dataP => { this.quantityModel = dataP },
              error => {
                console.log('error');
              });

          });

          this.windowRef.close();
          this.router.navigate([ContratClientComponent.urlRefreshContratClient]);
        },

        error => {
          console.log('error');
        });

    } else
      if (this.etat == "edit" || this.etat == "show") {
        this.serviceContrat.updateContrat(this.contrat).subscribe(
          data => {
            formValu.listeProduct.forEach(element1 => {
              console.log("element1", element1.id)
              element1.prixTot = element1.prixUnitaire * element1.quantitytot
              if (element1.id != null) {
                this.quantityProductService.updatequantityProductContrat(element1, data.idContrat, element1.id).subscribe(data2 => {
                },
                  error => {
                    console.log('error');
                  });
              } else {
                this.quantityProductService.addquantityProductContrat(data.idContrat, element1).subscribe(dataP => { this.quantityModel = dataP },
                  error => {
                    console.log('error');
                  });
              }
            })
            localStorage.removeItem('e');
            localStorage.removeItem('idContrat');
            this.windowRef.close();
            this.router.navigate([ContratClientComponent.urlRefreshContratClient]);
          },
          error => { console.log('error'); });
      }
  }



  close() {
    this.windowRef.close();
  }
  changeUniteTransaction() {
    this.serviceUniteTransaction.getUniteDeTransactionById(this.contrat.idUniteTransaction).subscribe(data => {
      this.setFormatNumber(data)
    })
  }
  changeUniteMesureParProduct(j) {
    this.serviceP.getProductById(this.listeProductArray.value[j].idProduct).subscribe(data => {
      this.unitiesMesureProduct = data.uniteMesures
    })

  }
  getPrixProduct(i) {
    this.servicePrixProduct.getTarifContrat(this.listeProductArray.value[i].idProduct, this.listeProductArray.value[i].idUnite, this.contrat.idUniteTransaction).subscribe((data: any) => {
      data.forEach(element => {
        this.listeProductArray.at(i).patchValue({
          prixUnitaire: element.prixdeventePropose
        })
      });
    })
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

  addListProduitGroup() {
    return this._fb.group({

      idProduct: new FormControl(),
      idUnite: new FormControl(),
      prixUnitaire: new FormControl(),
      quantitytot: new FormControl(),
      prixTot: new FormControl()
    })
  }
  updateListProduitGroup(list: any) {
    return this._fb.group({
      id: new FormControl(list.idQuantityProduct || new Number),
      idProduct: new FormControl(list.idProduct || new Number),
      idUnite: new FormControl(list.idUnite || new Number),
      prixUnitaire: new FormControl(list.prixUnitaire || new String),
      quantitytot: new FormControl(list.quantitytot || new String),
      prixTot: new FormControl(list.prixTot)
    });
  }

  addItem() {
    this.listeProductArray.push(this.addListProduitGroup());
  }
  removeItem(index) {
    /*   if (this.listeProductArray.value[index].id != null) {
         this.quantityService.deleteQuantity(this.listeProductArray.value[index].id).subscribe(data => {
           this.showToast(NbToastStatus.SUCCESS, "Quantité de produit", " est supprimer avec succéss")
           this.ngOnInit()
         })
       } else {*/
    this.listeProductArray.removeAt(index);
    // }
  }

  get listeProductArray() {
    return <FormArray>this.listProductForm.get('listeProduct');
  }
  /*settings = {
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
      position: 'right',
    },
    columns: {
      code: {
        title: 'Code',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,

      },
      designation: {
        title: "Désignation",
        type: 'string',
        filter: true,
        editable: false,
        addable: false,
      },
      prixPropose: {
        title: " Prix HT",
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
        valuePrepareFunction(cell) {
          return cell + " TND"
        }
      },
      prix: {
        title: 'Prix Propose',
        type: 'number',
        filter: false,
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
        filter: false,
      },


    },
  };
  show(event) {
    event.confirm.resolve()
    console.log("ok")
    //  let t = 0;
    // for (let i = 0; i < this.quantityNotNull.length; i++) {
    //   if (this.quantityNotNull[i].idProduct == event.newData.idProduct) {
    //     this.quantityNotNull[i].quantity = +(event.newData.quantity)
    //     t = 1
    //     break
    //   }
    // }
    // if (t == 0) {
    this.quantityNotNull.push({
      "idProduct": event.newData.idProduct,
      "code": event.newData.code,
      "designation": event.newData.designation,
      "quantity": (+event.newData.quantity),
      "prixPropose": (+event.newData.prixPropose),
      "prix": (+event.newData.prix),
      "totaltaxe": (+event.newData.totaltaxe)

    })

    console.log(this.quantityNotNull)

    // }
  }*/
}
