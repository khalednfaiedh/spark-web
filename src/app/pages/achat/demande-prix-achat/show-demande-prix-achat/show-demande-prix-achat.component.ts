import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";
import { QuantityProductModel } from "../../demande-achat/model/demande-achat-of-product.model";
import { DemandeAchatModel } from "../../demande-achat/model/demande-achat.model";
import { Router } from "@angular/router";
import { NbDateService, NbWindowRef } from "@nebular/theme";
import { DemandeAchatService } from "../../demande-achat/services/demande-achat.service";
import { DemandePrixAchatModel } from '../model/demande-prix-achat.model';
import { DemandePrixAchatService } from '../services/demande-prix-achat.service';
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from "angular2-toaster"
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DemandeFournisseurService } from '../services/demande-fournisseur.service';
import { DatePipe } from '@angular/common';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { ProductService } from '../../../admin/product/product.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';

@Component({
  selector: 'ngx-show-demande-prix-achat',
  templateUrl: './show-demande-prix-achat.component.html',
  styleUrls: ['./show-demande-prix-achat.component.scss']
})
export class ShowDemandePrixAchatComponent implements OnInit {

  source: LocalDataSource;
  sourceF: LocalDataSource;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idDF');
  reference: string
  quantityProductModel: any[] = [];
  demandeAchat: DemandeAchatModel = new DemandeAchatModel();
  demandePrix: DemandePrixAchatModel = new DemandePrixAchatModel();
  modesPaiement: ModeDePaiementModel = new ModeDePaiementModel();
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel();
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  dmf: any[] = []




  constructor(private router: Router,
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
    private serviceecheancePaiement: EcheanceDePaiementServiceService

  ) {


  }
  //add following vars and fct
  config: ToasterConfig;
  index = 1;
  status: NbToastStatus.SUCCESS;
  title = "Succès d'ajoutement";
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

  showToastr() {
    this.showToast(NbToastStatus.SUCCESS, this.title, this.content);
  }




  settings = {


    actions: {
      add: false,
      edit: false,
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
        title: 'Désignation',
        type: 'string',
        filter: true,
        editable: false,
        addable: false,
      },
      quantity: {
        title: 'Quantité',
        type: 'number',
        filter: false,



      },
    },
  };

  settingsF = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',

    },
    columns: {

      identifiant: {
        title: 'Réference',
        type: 'string',
        filter: true,

      },
      raisonSocial: {
        title: 'Raison sociale',
        type: 'string',
        filter: true,
      },
      typeF: {
        title: 'Type',
        type: 'string',
        filter: true,
      },
      dateAjout: {
        title: 'Date d\'ajout',
        type: 'string',
        filter: true,

      },
    },
  };





  ngOnInit() {

    this.serviceDP.getDemandePrixById(+this.id).subscribe(
      data => {
        console.log(data);
        this.demandePrix = data;
        console.log(this.demandePrix);
        this.demandeAchat = this.demandePrix.demandeAchat;
        this.reference = "DMA" + this.demandeAchat.idDemandeAchat
        this.serviceMP.getModeDePaiementById(data.idPaiement).subscribe(dataMP => {
          this.modesPaiement = dataMP
        })
        this.serviceCP.getConditionById(data.idConditionPaiement).subscribe(dataCP => {
          this.conditionPaiement = dataCP
        })
        this.serviceecheancePaiement.getEcheanceDePaiementDemandePrix(data.iddp).subscribe(dataEP => {
          this.echeancePaiement = dataEP
        })
        for (let i = 0; i < data.demandeFournisseurs.length; i++) {
          this.serviceF.getFournisseurById(data.demandeFournisseurs[i].idF).subscribe(
            dataF => {
              var date = new Date(data.demandeFournisseurs[i].dateDemande)
              var dateT = this.datepipe.transform(date, 'dd-MM-yyyy')
              this.dmf.push({ "identifiant": dataF.identifiant, "raisonSocial": dataF.raisonSocial, "typeF": dataF.typeF, "dateAjout": dateT })
              this.sourceF = new LocalDataSource(this.dmf)
            }
          )
        }

        for (let i = 0; i < this.demandeAchat.quantityProducts.length; i++) {
          this.serviceP.getProductById(this.demandeAchat.quantityProducts[i].idProduct).subscribe(
            data => {
              this.quantityProductModel.push({ "quantity": this.demandeAchat.quantityProducts[i].quantity, "code": data.code, "designation": data.designation })
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






  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }


}
