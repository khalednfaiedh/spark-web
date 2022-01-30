import { LocalDataSource } from 'ng2-smart-table';
import { DemandePrixClientModel } from '../demande-prix-client.model';
import { Router } from '@angular/router';
import {
  NbDateService, NbWindowRef, NbToastrService,
  NbGlobalPhysicalPosition
} from '@nebular/theme';
import { DemandePrixClientService } from '../demande-prix-client.service';
import { DatePipe } from '@angular/common';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

import { QuantityClientModel } from '../quantity-client.model'
import { QuantityClientService } from '../quantity-client.service';
import { ClientModel } from '../../../admin/client/client.model';
import { ProductModel } from '../../../admin/product/product.model';
import { ClientService } from '../../../admin/client/client.service';
import { ProductService } from '../../../admin/product/product.service';
import { DemandePrixClientComponent } from '../demande-prix-client.component';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { DemandePrixClientAdresseDeLivraisonService } from '../demande-prix-client-adresse-de-livraison.service';
import { DemandePrixClientAdresseDeLivraisonModel } from '../demande-prix-client-adresses-de-livraison-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ListEcheanceVenteModel } from '../../echeance-de-paiement/list-echeance-model';
import { ListEcheanceService } from '../../echeance-de-paiement/list-echeance.service';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';
import { timingSafeEqual } from 'crypto';
import { ListConditionDePaiementModel } from '../../../admin/condition-de-paiement/list-condtion-de-paiement-model';
import { ThrowStmt } from '@angular/compiler';
import { isThisISOWeek } from 'date-fns';
import { element } from '@angular/core/src/render3';
import { OnInit, Component } from '@angular/core';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';
import { runInThisContext } from 'vm';


@Component({
  selector: 'ngx-modal-demande-prix-client',
  templateUrl: './modal-demande-prix-client.component.html',
  styleUrls: ['./modal-demande-prix-client.component.scss']
})
export class ModalDemandePrixClientComponent implements OnInit {
  typeClient = ""
  ARCM: string;
  source: LocalDataSource = new LocalDataSource();
  sourceCLT: any;
  e = localStorage.getItem('e');
  code_clt = localStorage.getItem('idClient');
  reference: string;
  referenceclient: string;
  adressesC: any[];
  quantitys: any[];
  adresses: any[] = []
  modesPaiements: ModeDePaiementModel[];
  conditionPaiements: any[];
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  client: ClientModel = new ClientModel();
  modesPaiement: ModeDePaiementModel = new ModeDePaiementModel();
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel();
  adresse: AdresseLivraison = new AdresseLivraison()
  demandePrix: DemandePrixClientModel = new DemandePrixClientModel();
  demandePrixAdresse: DemandePrixClientAdresseDeLivraisonModel = new DemandePrixClientAdresseDeLivraisonModel();
  demandePrixAdresses: DemandePrixClientAdresseDeLivraisonModel[];
  quantityModel: QuantityClientModel = new QuantityClientModel()
  products: any[]
  listProductForm: FormGroup
  listeEcheance: ListEcheanceVenteModel = new ListEcheanceVenteModel()
  idDMD = localStorage.getItem('idRC');
  demandeLivraisonID = new FormControl('');
  product: ProductModel = new ProductModel();
  unitiesMesureProduct: any
  unitesTransaction: UniteDeTransactionModel[]

  id: number;
  idEntr = localStorage.getItem('current_entreprise')
    ;
  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public serviceCLT: ClientService,
    private serviceAL: AdresseLivraisonClientService,
    private serviceDP: DemandePrixClientService,
    private toastrService: NbToastrService,
    private serviceP: ProductService,
    private serviceDemandeAdresse: DemandePrixClientAdresseDeLivraisonService,
    public datepipe: DatePipe,
    private serviceModePaiement: ModeDePaiementService,
    private serivceConditionPaiement: ConditionDePaiementService,
    private quantityService: QuantityClientService,
    private _fb: FormBuilder,
    private uniteTransactionService: UniteDeTransactionService,
    private userService: UtilisateurService
  ) { }

  config: ToasterConfig;
  index = 1;
  status: NbToastStatus.SUCCESS;
  title = "Succès d'ajoutement";
  content = `Client ajouté`;
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  showToastr() {
    this.showToast(NbToastStatus.SUCCESS, this.title, this.content);
  }


  ngOnInit() {
    let e = localStorage.getItem('e');

    this.demandePrix.emisepar = this.userService.getCurrentUserCell().userName
    let id = localStorage.getItem('current_entreprise')
    this.serviceP.getAllproduct(+id).subscribe(
      data2 => {
        this.products = data2
      }
      ,
      error => {
        console.log(error);
      });
    this.serviceAL.getadresseDeLivraisonsClient(+this.code_clt).subscribe(res => {

      this.adressesC = res;
      console.log("this.addresseC", this.adressesC)

    }, error => {
      console.log(error);
    });
    ;
    this.uniteTransactionService.getAllUniteDeTransaction(+this.idEntr).subscribe(data => {
      this.unitesTransaction = data
    })
    if (e === '3') {
      this.ARCM = 'Ajouter';
      this.listProductForm = this._fb.group({
        listeProduct: this._fb.array([this.addListProduitGroup()])
      });

    }
    if (e === '1') {
      let id = localStorage.getItem('idRC');
      this.ARCM = 'Modifier';

      this.listProductForm = this._fb.group({
        listeProduct: this._fb.array([])
      });
      this.serviceDP.getDemandePrixById(+id).subscribe(
        data => {
          this.demandePrix = data;
          if (this.demandePrix.quantity.length != null) {
            const lines1 = this.listProductForm.get('listeProduct') as FormArray;
            data.quantity.forEach(element => {
              lines1.push(this.updateListProduitGroup(element))
              for (let j = 0; j < lines1.length; j++) {
                this.changeUniteMesureParProduct(j)
              }
            })

          }

          this.echeancePaiement.option = this.demandePrix.typePaiement;

          this.serviceCLT.getClientById(this.demandePrix.code_clt).subscribe(
            data => {
              this.client = data; this.referenceclient = "CLT" + this.client.code_clt;
              this.typeClient = this.client.categorieClient.name
            }
          )


          /*  this.serviceDemandeAdresse.getAdressesbyDemande(data.iddp).subscribe(dataDA => {
              this.adressesC = dataDA
            })*/

          this.serviceModePaiement.getModeDePaiementById(data.idPaiement).subscribe(dataP => {
            this.modesPaiement = dataP
          })
          /*  if (data.idDelaisPaiement) {
              this.serivceConditionPaiement.getConditionById(data.idConditionPaiement).subscribe(dataC => {
                this.conditionPaiement = dataC
              })
            }*/


          error => {
            console.log(error);
          };

        })


    }





    this.serviceCLT.getClientById(+this.code_clt).subscribe(
      data1 => {
        this.client = data1;
        this.referenceclient = "CLT" + this.client.code_clt;
        this.typeClient = this.client.categorieClient.name;
        this.modesPaiement = this.client.modeDepaiement;
        this.demandePrix.typePaiement = this.client.typePiament;
        this.conditionPaiement = this.client.conditionsDePaiements
        this.conditionPaiement.strategie = this.client.conditionsDePaiements.strategie

      },
      error => {
        console.log(error);
      },
    );



    this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(data => {
      this.modesPaiements = data;

    })
    this.serivceConditionPaiement.getAllConditionDePaiementbyTypeEcheancier("Client", this.conditionPaiement.strategie).subscribe(data => {
      this.conditionPaiements = data
    })


    if (e === '3') {
      let id = localStorage.getItem('current_entreprise')
      this.serviceP.getAllproduct(+id).subscribe(
        data2 => {
          this.products = data2
        }
        ,
        error => {
          console.log(error);
        });

    }

  }
  //liste de unité de mesure par produit sélectionné
  changeUniteMesureParProduct(j) {
    this.serviceP.getProductById(this.listeProductArray.value[j].idProduct).subscribe(data => {
      this.unitiesMesureProduct = data.uniteMesures


    })
  }
  changeConditionPaiement() {
    this.serivceConditionPaiement.getAllConditionDePaiementbyTypeEcheancier("Client", this.conditionPaiement.strategie).subscribe(data => {
      this.conditionPaiements = data
    })
  }

  addListProduitGroup() {
    return this._fb.group({
      idProduct: new FormControl(),
      idUnite: new FormControl(),
      quantity: new FormControl(),
    })
  }
  updateListProduitGroup(list: any) {
    return this._fb.group({
      id: new FormControl(list.id || new Number),
      idProduct: new FormControl(list.idProduct || new String),
      idUnite: new FormControl(list.idUnite || new String),
      quantity: new FormControl(list.quantity || new Number),
    });
  }

  addItem() {
    this.listeProductArray.push(this.addListProduitGroup());
  }
  removeItem(index) {
    if (this.listeProductArray.value[index].id != null) {
      this.quantityService.deleteQuantity(this.listeProductArray.value[index].id).subscribe(data => {
        this.showToast(NbToastStatus.SUCCESS, "Quantité de produit", " est supprimer avec succéss")
        this.ngOnInit()
      })
    } else {
      this.listeProductArray.removeAt(index);
    }
  }

  get listeProductArray() {
    return <FormArray>this.listProductForm.get('listeProduct');
  }
  onAddRCM(formValu) {
    let e = localStorage.getItem('e');
    if (e === '3') {
      console.log(this.client)
      this.demandePrix.code_clt = this.client.code_clt
      if (this.modesPaiement != null) {
        this.demandePrix.idPaiement = this.modesPaiement.idPaiement;
      }
      if (this.conditionPaiement != null) {
        this.demandePrix.idConditionPaiement = this.client.conditionsDePaiements.id;
      }
      this.demandePrix.date_list = new Date();



      this.serviceDP.addDemandePrix(this.demandePrix, +this.idEntr).subscribe(
        data => {
          this.demandePrix = data;
          console.log("  formValue", formValu)
          formValu.listeProduct.forEach(element1 => {


            this.quantityService.addQuantity(+data.iddp, element1).subscribe(data => { this.quantityModel = data },
              error => {
                console.log('error');
              });

          });

          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          this.showToast(NbToastStatus.SUCCESS, "Demande de prix", "est ajouter avec succéss")
          this.router.navigate([DemandePrixClientComponent.urlRefreshDemandePrixClient]);
          this.windowRef.close();
        },
      /*  error => {
          this.showToast(NbToastStatus.DANGER, "Erreur", "")
          console.log(error);
        }*/);
    }
    if (e === '1') {

      if (this.modesPaiement != null) {
        this.demandePrix.idPaiement = this.modesPaiement.idPaiement;
      }
      if (this.conditionPaiement != null) {
        this.demandePrix.idConditionPaiement = this.client.conditionsDePaiements.id;
      }
      /* this.demandePrix.demandePrixAdresseDeLivraison.forEach(element1 => {
         console.log('elementAdresse====>', element1)
         for (let i = 0; i < this.adressesC.length; i++) {
           element1.idAdresseLivraison = this.adressesC[i].id
   
         }
       });*/
      this.demandeLivraisonID.value.forEach(element => {
        this.demandePrix.demandePrixAdresseDeLivraison.forEach(element2 => {
          element2.idAdresseLivraison = element.id
        });
      });

      this.serviceDP.updateDemandePrix(this.demandePrix).subscribe(
        data3 => {
          this.demandePrix = data3

          formValu.listeProduct.forEach(element1 => {

            if (element1.id != null) {
              this.quantityService.updateQuantityDemandePrix(element1, this.demandePrix.iddp).subscribe(data2 => {
                //  this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est modifier avec succéss")
              },
                error => {
                  console.log('error');
                });
            } else {

              this.quantityService.addQuantity(+data3.iddp, element1).subscribe(data => { this.quantityModel = data },
                error => {
                  console.log('error');
                });;

            }
          })
          this.adressesC.forEach(element => {
            console.log("elmentAdress", element)
            if (element.id != null) {
              this.demandePrixAdresse.idAdresseLivraison = this.adresse.id
              this.serviceDemandeAdresse.addDemandePrixAdresses(data3.iddp, this.demandePrixAdresse).subscribe(
                data2 => {
                  console.log("Data2=====>", data2)
                  this.demandePrixAdresse = data2

                }

              )
            }
          });
          localStorage.removeItem('e');
          localStorage.removeItem('idDP');
          this.showToast(NbToastStatus.SUCCESS, "Demande de prix", "est modifier avec succéss")
          this.router.navigate([DemandePrixClientComponent.urlRefreshDemandePrixClient]);
          this.windowRef.close();

          error => {
            console.log(error);
            this.showToast(NbToastStatus.DANGER, "Erreur", "")
          }
        })

    }

  }


  onclose() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }

}
