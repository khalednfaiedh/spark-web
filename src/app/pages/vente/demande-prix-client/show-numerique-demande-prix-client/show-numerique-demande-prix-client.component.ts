import { Component, OnInit } from '@angular/core';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { Router } from '@angular/router';
import { NbDateService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { ClientService } from '../../../admin/client/client.service';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { DemandePrixClientService } from '../demande-prix-client.service';
import { ProductService } from '../../../admin/product/product.service';
import { DemandePrixClientAdresseDeLivraisonService } from '../demande-prix-client-adresse-de-livraison.service';
import { DatePipe } from '@angular/common';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { QuantityClientService } from '../quantity-client.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { ClientModel } from '../../../admin/client/client.model';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { DemandePrixClientModel } from '../demande-prix-client.model';
import { DemandePrixClientAdresseDeLivraisonModel } from '../demande-prix-client-adresses-de-livraison-model';
import { ThrowStmt } from '@angular/compiler';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-show-numerique-demande-prix-client',
  templateUrl: './show-numerique-demande-prix-client.component.html',
  styleUrls: ['./show-numerique-demande-prix-client.component.scss']
})
export class ShowNumeriqueDemandePrixClientComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  sourceCLT: any;
  e = localStorage.getItem('e');
  code_clt = localStorage.getItem('idClient');
  reference: any;
  referenceclient: string;
  idModePaiement: number;
  idCondition: number;
  adresses2: any = []
  adresses: Array<AdresseLivraison> = [];
  adressesC = [];
  quantitys: any[] = [];
  modesPaiements: ModeDePaiementModel[];
  conditionPaiements: ConditionDePaiementModel[];
  //echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  client: ClientModel = new ClientModel();
  modesPaiement: ModeDePaiementModel = new ModeDePaiementModel();
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel();
  adresse: AdresseLivraison = new AdresseLivraison()
  demandePrix: DemandePrixClientModel = new DemandePrixClientModel();
  demandePrixAdresse: DemandePrixClientAdresseDeLivraisonModel = new DemandePrixClientAdresseDeLivraisonModel();
  demandePrixAdresses: DemandePrixClientAdresseDeLivraisonModel[];
  quantityModel: any = new Object();
  id = localStorage.getItem('idRC');
  typeClient = ""
  addresseDemande: Array<Addressdemenade> = [];
  adresses3: any
  unitesTransaction: UniteDeTransactionModel[]
  idEntr = localStorage.getItem("current_entreprise")
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
    private uniteTransactionService: UniteDeTransactionService,
    private quantityService: QuantityClientService,
    private echeancePaiementService: EcheanceDePaiementServiceService) { }
  settings = {

    actions: {
      edit: false,
      add: false,
      delete: false,
      position: 'right',
    },
    columns: {
      code: {
        title: 'Code de produit',
        type: 'number',
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

      quantity: {
        title: 'Quantity',
        type: 'number',
        filter: false,
      },
    },
  };

  getDemendePrixById(idDemande: number): any {
    return this.serviceDP.getDemandePrixById(idDemande).toPromise();
  }

  getClientByid(id) {
    return this.serviceCLT.getClientById(id).toPromise();
  }

  getAddresseByIdDemeande(id) {
    return this.serviceDemandeAdresse.getAdressesbyDemande(id).toPromise();
  }

  getAddressSelectionee(list) {

    for (let x = 0; x < list.length; x++) {
      this.serviceAL.getAdressebyid(list[x].idLivraison).subscribe(dataL => {


        console.log('1')
        this.adresses.push({
          id: dataL.id,
          adresse: dataL.adresse,
          codePostal: dataL.codePostal,
          ville: dataL.ville,
          pays: dataL.pays
        })

      })

    }

    return this.adresses;
  }

  getModePaimentById(id) {
    return this.serviceModePaiement.getModeDePaiementById(id).toPromise()
  }

  getConditionById(id) {
    return this.serivceConditionPaiement.getConditionById(id).toPromise();
  }


  /* getProductById(data) {
     for (let i = 0; i < data.quantity.length; i++) {
       this.serviceP.getProductById(data.quantity[i].idProduct).subscribe(
         data2 => {
           this.quantitys.push({ "code": data2.code, "designation": data2.designation, "quantity": data.quantity[i].quantity })
          // this.source = new LocalDataSource(this.quantitys);
         })
     }
 
   }*/
  async ngOnInit() {

    this.uniteTransactionService.getAllUniteDeTransaction(+this.idEntr).subscribe(data => {
      this.unitesTransaction = data
    })

    this.demandePrix = await this.getDemendePrixById(+this.id)
    this.client = await this.getClientByid(this.demandePrix.code_clt)
    this.typeClient = this.client.categorieClient.name
    this.referenceclient = "CLT" + this.client.code_clt.toString();
    this.addresseDemande = await this.getAddresseByIdDemeande(this.demandePrix.iddp)
    console.log(" addresse Demande", this.addresseDemande)
    this.adresses = await this.getAddressSelectionee(this.addresseDemande)

    console.log("address sélectionéé", this.adresses3)
    this.modesPaiement = await this.getModePaimentById(this.demandePrix.idPaiement)
    if (this.demandePrix.idConditionPaiement != null) {
      this.conditionPaiement = await this.getConditionById(this.demandePrix.idConditionPaiement)

    }
    /*this.echeancePaiement.option = this.demandePrix.typePaiement;
    await this.getProductById(this.demandePrix)
*/

    this.serviceAL.findAll().subscribe(
      data => { this.adressesC = data; },
      err => { console.log("err find all") }
    );
    this.quantityService.getAllbyDemandeDePrix(+this.id).subscribe(data => {
      console.log("data,data", data)
      data.forEach(element => {
        this.quantitys.push({ "code": element.code, "designation": element.designation, "quantity": element.quantity, "uniteMesure": element.uniteMesure })
        this.source = new LocalDataSource(this.quantitys)
      });


    })

    /* if (this.demandePrix.iddp != null) {
       this.echeancePaiementService.getEcheanceDePaiementDemandePrix(this.demandePrix.iddp).subscribe(dataEcheance => {
         this.echeancePaiement = dataEcheance
       })
     }*/





    // this.serviceDP.getDemandePrixById(+this.id).subscribe(
    //   data => {
    //     this.demandePrix = data
    //     console.log("demande prix :",this.demandePrix)
    //     this.serviceCLT.getClientById(this.demandePrix.code_clt).subscribe(
    //       data => { this.client = data ;this.referenceclient= "CLT"+this.client.code_clt;


    //     })

    //     this.serviceDemandeAdresse.getAdressesbyDemande(this.demandePrix.iddp).subscribe(dataDemande => {
    //       console.log(" get address by demande====>", dataDemande)

    //       for (let x = 0; x < dataDemande.length; x++) {
    //         this.serviceAL.getAdressebyid(dataDemande[x].idLivraison).subscribe(dataL => {
    //           // this.adressesC = dataL;
    //           console.log('1')
    //           this.adresses.push({
    //             id:dataL.id,
    //             adresse: dataL.adresse,
    //             codePostal: dataL.codePostal,
    //             ville: dataL.ville, 
    //             pays: dataL.pays
    //           })

    //         })

    //       }
    //       this.adresses2=this.adresses;
    //       console.log(" address 2 sélectionée ", this.adresses2)

    //     })

    //     this.serviceModePaiement.getModeDePaiementById(this.demandePrix.idPaiement).subscribe(
    //       data => { this.modesPaiement = data }
    //     );
    //     if(this.demandePrix.idDelaisPaiement != null)
    //     {
    //     this.serivceConditionPaiement.getConditionById(this.demandePrix.idDelaisPaiement).subscribe(
    //       data => { this.conditionPaiement = data }
    //     );
    //     }

    //     for (let i = 0; i < data.quantity.length; i++) {
    //       this.serviceP.getProductById(data.quantity[i].idProduct).subscribe(
    //         data2 => {
    //           this.quantitys.push({ "code": data2.code, "designation": data2.designation, "quantity": data.quantity[i].quantity })
    //           this.source = new LocalDataSource(this.quantitys);
    //         })
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   },
    // );
  }

  onclose() {
    this.windowRef.close();
  }
}


export class Addressdemenade {

  id: number;
  idLivraison: number;
}