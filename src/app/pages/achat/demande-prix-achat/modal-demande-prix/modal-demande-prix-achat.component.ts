import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";
import { DemandeAchatModel } from "../../demande-achat/model/demande-achat.model";
import { Router } from "@angular/router";
import { NbDateService, NbWindowRef } from "@nebular/theme";
import { DemandeAchatService } from "../../demande-achat/services/demande-achat.service";
import { DemandePrixAchatModel } from '../model/demande-prix-achat.model';
import { DemandePrixAchatService } from '../services/demande-prix-achat.service';
import { DemandeFournisseurModel } from '../model/demande-fournisseur.model';
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from "angular2-toaster"
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DemandeFournisseurService } from '../services/demande-fournisseur.service';
import { DatePipe } from '@angular/common';
import { ProductModel } from '../../../admin/product/product.model';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { ProductService } from '../../../admin/product/product.service';
import { DemandePrixAchatComponent } from '../demande-prix-achat.component';
import { format } from 'date-fns';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';
import { DemandePrixModel } from '../../demande-prix/demande-prix.model';
import { DemandePrixComponent } from '../../demande-prix/demande-prix.component';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ListEcheanceService } from '../../echeance-de-paiement/list-echeance.service';
import { ListEcheanceModel } from '../../echeance-de-paiement/list-echeance-model';
import { MonnaisModel } from '../../../admin/taxe/Monnais.Model';


@Component({
  selector: 'ngx-modal-demande-prix-achat',
  templateUrl: './modal-demande-prix-achat.component.html',
  styleUrls: ['./modal-demande-prix-achat.component.scss']
})
export class ModalDemandePrixAchatComponent implements OnInit {

  ARCM: string;
  source: LocalDataSource = new LocalDataSource();
  sourceFA: LocalDataSource = new LocalDataSource();
  sourceF: LocalDataSource;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  reference: string
  quantityProduct: any[] = [];
  demandeAchat: DemandeAchatModel = new DemandeAchatModel();
  modesPaiement: ModeDePaiementModel = new ModeDePaiementModel();
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel();
  addProductList: ProductModel[] = [];
  demandePrix: DemandePrixModel = new DemandePrixModel();
  fournisseursAjoutes2: DemandeFournisseurModel = new DemandeFournisseurModel();
  modePaiements: ModeDePaiementModel[];
  conditionPaiements: ConditionDePaiementModel[];
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  fournisseursAjoutes: any[] = []
  demandefournissuers: any[]
  today = new Date();
  dmf: any[] = []
  quantityProductModel: any[] = [];
  listEcheanceForm: FormGroup
  listeEcheance: ListEcheanceModel = new ListEcheanceModel()
  listeEcheances: ListEcheanceModel[]
  listeEcheances2: ListEcheanceModel[]
  devises = Object.values(MonnaisModel);
  idEntr = localStorage.getItem('current_entreprise')
  starategiePaiement: string
  constructor(private userService: UtilisateurService, private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public serviceDA: DemandeAchatService,
    private serviceDP: DemandePrixAchatService,
    private serviceF: FournisseurService,
    private toastrService: NbToastrService,
    private serviceDF: DemandeFournisseurService,
    private serviceP: ProductService,
    public datepipe: DatePipe,
    private serviceMP: ModeDePaiementService,
    private serviceCP: ConditionDePaiementService,
    private serviceecheancePaiement: EcheanceDePaiementServiceService,
    private _fb: FormBuilder,
    private serviceListeEcheance: ListEcheanceService
  ) { }
  ngOnInit() {

    // let e = localStorage.getItem('e');
    // console.log(e);
    this.serviceMP.getAllModeDePaiement(+this.idEntr).subscribe(dataMP => {
      this.modePaiements = dataMP
    })
    this.serviceCP.getAllConditionDePaiementbyTypeEcheancier('Client', this.starategiePaiement).subscribe(dataCP => {
      this.conditionPaiements = dataCP
    })
    let id = localStorage.getItem('current_entreprise')
    this.serviceF.getAllfournisseur(+id).subscribe(data => {
      this.sourceFA = new LocalDataSource(data)
    })
    this.demandePrix.creePar = this.userService.getCurrentUserCell().userName
    this.listEcheanceForm = this._fb.group({
      listeEcheance: this._fb.array([this.addListEcheanceGroup()])
    });

    if (this.e === '0') {
      this.ARCM = 'Ajouter'; '('
      this.listEcheanceForm = this._fb.group({
        listeEcheance: this._fb.array([this.addListEcheanceGroup()])
      });
      this.serviceF.getAllfournisseur(+id).subscribe(
        data => {

          this.sourceF = new LocalDataSource(data)
        },
        error => { console.log(error); });

      this.serviceDA.getDemandeAchatById(+this.id).subscribe(
        data => {

          this.demandeAchat = data;
          this.reference = "DMA" + this.demandeAchat.idDemandeAchat
          for (let i = 0; i < data.quantityProducts.length; i++) {
            this.serviceP.getProductById(data.quantityProducts[i].idProduct).subscribe(
              data2 => {
                this.quantityProduct.push({ "code": data2.code, "quantity": data.quantityProducts[i].quantity })
                this.source = new LocalDataSource(this.quantityProduct)

              }
            ), error => { console.log(error) }
          }


        },
        error => {
          console.log(error);
        },
      );
    }
    if (this.e === '1') {
      this.ARCM = 'Modifier';

      this.serviceDP.getDemandePrixById(+this.id).subscribe(
        data => {

          this.demandePrix = data;
          this.demandeAchat = this.demandePrix.demandeAchat;
          this.demandefournissuers = this.demandePrix.demandeFournisseurs;
          this.reference = "DMA" + this.demandeAchat.idDemandeAchat
          this.serviceDF.getAllDemandeFournisseursDisponible(data.iddp).subscribe(dataFP => {
            console.log("Data disponible===>", dataFP)
            this.sourceF = new LocalDataSource(dataFP)
          })
          this.serviceMP.getModeDePaiementById(data.idPaiement).subscribe(dataMP => {
            this.modesPaiement = dataMP
          })
          this.serviceCP.getConditionById(data.idConditionPaiement).subscribe(dataCP => {
            this.conditionPaiement = dataCP
          })
          this.serviceecheancePaiement.getEcheanceDePaiementDemandePrix(data.iddp).subscribe(dataEP => {
            this.echeancePaiement = dataEP
            this.serviceListeEcheance.getListEcheanceDePaiementDemandePrix(this.echeancePaiement.id).subscribe(dataLE => {
              this.listeEcheances = dataLE
              for (let i = 0; i < this.listeEcheances.length; i++) {

                const test = this.listEcheanceForm = this._fb.group({
                  listeEcheance: this._fb.array([this._fb.group({
                    datePaiement: [(data ? this.listeEcheances[i].datePaiement : ''),],
                    montant: [(data ? this.listeEcheances[i].montant : ''),],
                  })])

                });



              }

            })



          })

          for (let i = 0; i < this.demandeAchat.quantityProducts.length; i++) {
            this.serviceP.getProductById(this.demandeAchat.quantityProducts[i].idProduct).subscribe(
              data => {
                this.quantityProductModel.push({ "quantity": this.demandeAchat.quantityProducts[i].quantity, "code": data.code })
                this.source = new LocalDataSource(this.quantityProductModel)
              }
            )
          }
        },
        error => {
          console.log(error);
        },
      );

    }
  }

  // ajout des fournisseur
  onCustom(event) {
    if (event.action === 'ajouter') {
      this.showToastr()
      this.sourceF.remove(event.data);
      this.fournisseursAjoutes.push({ "idF": event.data.idF, "dateDemande": new Date() })
    }
  }
  // smart table fournisseur
  settingsF = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'ajouter',
          title: '<i class="nb-paper-plane"></i>',
        }
      ],
    },
    columns: {
      identifiant: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      raisonSocial: {
        title: 'Raison social',
        type: 'string',
        filter: true,
      },
      nameF: {
        title: 'Premier résponsable',
        type: 'string',
        filter: true,
        valuePrepareFunction(row, cell) {
          return cell.nameF + ' ' + cell.lastNameF
        }
      },
      typeF: {
        title: 'Type',
        type: 'string',
        filter: true,
      },
      /*  dateAjout: {
          title: 'Date ajout',
          type: 'Date',
          valuePrepareFunction(cell, row) {
            return format(cell, "DD MMM YYYY")
   
          }
        },*/
    },
  };

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


  onAddRCM() {
    if (this.e === "0") {
      this.demandePrix.dateDmp = this.today
      this.demandePrix.demandeAchat = this.demandeAchat
      if (this.modesPaiement != null) {
        console.log("mode paiement", this.modesPaiement)
        this.demandePrix.idPaiement = this.modesPaiement.idPaiement;
        console.log("this.demandePrix.idPaiement", this.demandePrix.idPaiement)
      }
      if (this.conditionPaiement != null) {
        console.log("conditionPaiement", this.conditionPaiement)
        this.demandePrix.idConditionPaiement = this.conditionPaiement.id;
        console.log("this.demandePrix.idConditionPaiement", this.demandePrix.idConditionPaiement)
      }
      this.serviceDP.addDemandePrix(this.demandePrix).subscribe(
        data => {
          this.serviceecheancePaiement.addEcheanceDePaiementDemandePrix(this.echeancePaiement, data.iddp).subscribe(
            dataEcheance => {
              this.echeancePaiement = dataEcheance
              if (this.echeancePaiement.typeMontant = "Montant variable") {
                for (let i = 0; i < this.listeEcheanceArray.length; i++) {
                  if (this.listeEcheanceArray.value[i].datePaiement || this.listeEcheanceArray.value[i].montant) {
                    this.listeEcheance.datePaiement = this.listeEcheanceArray.value[i].datePaiement
                    this.listeEcheance.montant = this.listeEcheanceArray.value[i].montant
                    this.serviceListeEcheance.addListEcheanceDePaiementDemandePrix(this.listeEcheance, this.echeancePaiement.id).subscribe(dataLE => {
                      this.listeEcheance = dataLE
                    })
                  }
                }
              }
            },
            err => { console.log("demande de prix err add échance de paiement") })
          for (let i = 0; i < this.fournisseursAjoutes.length; i++) {
            this.fournisseursAjoutes2 = { "idF": this.fournisseursAjoutes[i].idF, "iddp": data.iddp, "dateDemande": this.fournisseursAjoutes[i].dateDemande }
            console.log(this.fournisseursAjoutes2)
            this.serviceDF.addDemandeFournisseurs(this.fournisseursAjoutes2).subscribe(
              data => { console.log('sucess add fournisseur'); },
              error => { console.log(error); })
            this.fournisseursAjoutes2 = new DemandeFournisseurModel();
          }
          localStorage.removeItem('e');
          this.windowRef.close();
          this.router.navigate([DemandePrixAchatComponent.urlDemandePrixAchat]);
        },
        error => {
          console.log(error);
        });
    }
    if (this.e === "1") {

      this.demandePrix.demandeAchat = this.demandeAchat
      this.demandePrix.demandeFournisseurs = this.demandefournissuers
      if (this.modesPaiement != null) {
        console.log("mode paiement", this.modesPaiement)
        this.demandePrix.idPaiement = this.modesPaiement.idPaiement;
        console.log("this.demandePrix.idPaiement", this.demandePrix.idPaiement)
      }
      if (this.conditionPaiement != null) {
        console.log("conditionPaiement", this.conditionPaiement)
        this.demandePrix.idConditionPaiement = this.conditionPaiement.id;
        console.log("this.demandePrix.idConditionPaiement", this.demandePrix.idConditionPaiement)
      }
      console.log("this.demande", this.demandePrix.demandeFournisseurs)
      this.serviceDP.updateDemandePrix(this.demandePrix).subscribe(
        data => {
          this.serviceecheancePaiement.updateEcheanceDePaiementDemandePrix(data.iddp, this.echeancePaiement).subscribe(dataEP => {
            this.echeancePaiement = dataEP
          })
          for (let i = 0; i < this.fournisseursAjoutes.length; i++) {
            this.fournisseursAjoutes2 = { "idF": this.fournisseursAjoutes[i].idF, "iddp": data.iddp, "dateDemande": this.fournisseursAjoutes[i].dateDemande }
            console.log(this.fournisseursAjoutes2)
            this.serviceDF.addDemandeFournisseurs(this.fournisseursAjoutes2).subscribe(
              data => { console.log('sucess add fournisseur'); },
              error => { console.log(error); })
            this.fournisseursAjoutes2 = new DemandeFournisseurModel();
          }
          localStorage.removeItem('e');
          this.windowRef.close();
          this.router.navigate([DemandePrixAchatComponent.urlDemandePrixAchat]);
        },
        error => {
          console.log(error);
        });
    }
  }

  close() {
    console.log(this.fournisseursAjoutes)
    // localStorage.removeItem('e');
    // localStorage.removeItem('idRC');
    this.windowRef.close();
    this.router.navigate([DemandePrixAchatComponent.urlDemandePrixAchat]);
  }



  //add following vars and fct
  config: ToasterConfig;
  index = 1;
  status: NbToastStatus.SUCCESS;
  title = "Succès";
  content = `Fournisseur ajouté`;
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
  test(event) {
    var today = new Date()
    if (event.getTime() <= today.getTime()) {
      this.showToast(NbToastStatus.DANGER, "Date incorrecte", "Vous pouvez choisir une date superierue à celle du aujourd'hui")
    }
  }
  showToastr() {
    this.showToast(NbToastStatus.SUCCESS, this.title, this.content);
  }

  // settings = {


  //   actions: {
  //     add: false,
  //     edit: false,
  //     delete:false,
  //     position: 'right',

  //   },

  //   columns: {
  //     code: {
  //       title: 'Code',
  //       type: 'number',
  //       filter: true,
  //       editable:false,
  //       addable: false,
  //     },
  //     quantity  : {
  //       title: 'Quantité',
  //       type: 'number',
  //       filter: false,



  //     },
  //   },
  // };


  // supprimer by rami c'est quoi cette table
  // settingsFA = {
  //
  //   actions: {
  //     add: false,
  //     edit: false,
  //     delete: false,
  //     position: 'right',
  //     custom: [
  //       {
  //         name: 'ajouter',
  //         title: '<i class="nb-plus"></i>',
  //       }
  //     ],

  //   },
  //   columns: {

  //     id: {
  //       title: 'Ref',
  //       type: 'string',
  //       filter: true,
  //       valuePrepareFunction(cell,row){
  //         return "F2019"+cell
  //       }
  //     },
  //     nameF: {
  //       title: 'Nom',
  //       type: 'string',
  //       filter: true,
  //     },
  //     typeF: {
  //       title: 'Type',
  //       type: 'string',
  //       filter: true,
  //     },
  //     dateAjout:{
  //       title: 'Date d\'ajout',
  //       type: 'string',
  //       filter: true,
  //       valuePrepareFunction(row,cell){
  //         if (row.dateAjout==null){
  //           var date=new Date()
  //           var dateT=date.getDate()+"/"+(date.getMonth().valueOf()+1)+"/"+date.getFullYear()


  //           return (dateT);
  //         }
  //         else{
  //           return row
  //         }
  //       }

  //     },

  //   },
  // };
  // onCustomFA(event) {
  //   console.log(event)
  //   if (event.action === 'ajouter') {
  //     this.demandePrix.demandeFournisseurs.push({idF:event.data.id,dateDemande:new Date()})
  //     this.sourceFA.remove(event.data);
  //     console.log(this.demandePrix)
  //   }
  // }

}
