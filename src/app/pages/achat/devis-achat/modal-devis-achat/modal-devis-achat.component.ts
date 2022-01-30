import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Component, OnInit } from '@angular/core';
import { DemandePrixAchatModel } from "../../demande-prix-achat/model/demande-prix-achat.model";
import { DemandePrixAchatService } from "../../demande-prix-achat/services/demande-prix-achat.service";
import { DemandeAchatModel } from "../../demande-achat/model/demande-achat.model";
import { Router } from "@angular/router";
import { format } from 'date-fns';
import { NbWindowRef } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { DevisModel } from "../model/devis-achat.model";
import { DevisAchatService } from "../services/devis-achat.service";
import { DevisProduitAchatService } from "../services/devis-produit-achat.service";
import { DemandeFournisseurModel } from '../../demande-prix-achat/model/demande-fournisseur.model';
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from "angular2-toaster"
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { ProductService } from '../../../admin/product/product.service';
import { TaxeService } from '../../../admin/taxe/services/taxe.service';
import { DevisAchatComponent } from '../devis-achat.component';
import { DemandeFournisseurService } from '../../demande-prix-achat/services/demande-fournisseur.service';
import { DemandePrixService } from '../../demande-prix/demande-prix.service';

@Component({
  selector: 'ngx-modal-devis-achat',
  templateUrl: './modal-devis-achat.component.html',
  styleUrls: ['./modal-devis-achat.component.scss']
})
export class ModalDevisAchatComponent implements OnInit {
  id = localStorage.getItem('idDF');
  demandePrix: DemandePrixAchatModel = new DemandePrixAchatModel();
  demandeAchat: DemandeAchatModel = new DemandeAchatModel();

  reference: String;
  source: LocalDataSource;
  sourceF: LocalDataSource;
  sourceQt: LocalDataSource;
  dmf: any[] = []
  qt: any[] = [];
  quantityProductModel: any[] = [];
  prixtot: number = 0;
  prixProduitTot: number = 0;
  prixTT: number = 0;
  fournisseurs: any[] = []
  devis: DevisModel = new DevisModel();
  devisProduits: any[] = [];
  fournisseurId: any;
  demandeFournisseur: DemandeFournisseurModel = new DemandeFournisseurModel();
  taxes: any[] = []
  taxePourcentage: any;
  quantityProducts = [];
  devisProducts = [];
  prixTTC: number;

  constructor(private serviceDP: DemandePrixAchatService,
    private router: Router,
    public windowRef: NbWindowRef,
    private serviceF: FournisseurService,
    private serviceDF: DemandeFournisseurService,
    private serviceP: ProductService,
    private serviceD: DevisAchatService,
    private serviceDemPr: DemandePrixService,
    private serviceDProduit: DevisProduitAchatService,
    private serviceTaxe: TaxeService,
    private toastrService: NbToastrService) { }

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

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.serviceF.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
    },
      error => {
        console.log("error");
      });
    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceTaxe.getAllTaxes(+idEntr).subscribe(data => {
      this.taxes = data;
    },
      error => {
        console.log("error");
      });

    this.serviceDF.getDemandeFournisseursById(+this.id).subscribe(data => {
      this.fournisseurId = data.idF;
      this.serviceDP.getDemandePrixById(data.iddp).subscribe(data1 => {
        this.demandePrix = data1;
        this.demandeAchat = data1.demandeAchat;
        this.serviceDemPr.getFournisseursByIdDemande(+data1.demandeAchat.idDemandeAchat).subscribe(
          data => { this.sourceF = data; },
          error => { console.log(error); });
        data1.demandeAchat.quantityProducts.forEach(element => {
          this.serviceP.getProductById(element.idProduct).subscribe(data2 => {
            console.log(data2)
            this.quantityProducts.push({ "designation": data2.designation, "code": data2.code, "quantity": element.quantity })
            this.source = new LocalDataSource(this.quantityProducts);
            this.devisProducts.push({ "code": data2.code, "quantity": element.quantity, "taxeProduit": data2.productTaxes[0].taxe.pourcentage });
            this.sourceQt = new LocalDataSource(this.devisProducts);
            console.log(this.sourceQt);
          });
        });
      },
        error => {
          console.log("error");
        });
    },
      error => {
        console.log("error");
      });

    // this.serviceDP.getDemandePrixById(+this.id).subscribe(
    //   data => {
    //     this.demandePrix = data;
    //     this.demandeAchat = this.demandePrix.demandeAchat;
    //     this.reference = this.demandeAchat.reference;
    //     for (let i = 0; i < data.demandeFournisseurs.length; i++) {
    //       this.serviceF.getFournisseurById(data.demandeFournisseurs[i].idF).subscribe(
    //         data2 => {
    //           this.dmf.push({ "idF": data2.idF, "nameF": data2.nameF, "typeF": data2.typeF })
    //           this.fournisseurs.push({ "idF": data2.id, "nameF": data2.nameF, "dateDemande": data.demandeFournisseurs[i].dateDemande })
    //           this.sourceF = new LocalDataSource(this.dmf);
    //         },
    //         error => {
    //           console.log("error");
    //         });
    //     }
    //     for (let i = 0; i < this.demandeAchat.quantityProducts.length; i++) {
    //       this.serviceP.getProductById(this.demandeAchat.quantityProducts[i].idProduct).subscribe(
    //         data => {
    //           this.quantityProductModel.push({ "quantity": this.demandeAchat.quantityProducts[i].quantity, "code": data.code })
    //           this.qt.push({
    //             "idDemandeAchat": this.demandeAchat.idDemandeAchat, "idProduct": this.demandeAchat.quantityProducts[i].idProduct,
    //             "quantity": 0, "code": data.code, "prixUnitaire": 0, "prixTotale": 0
    //           })
    //           this.source = new LocalDataSource(this.quantityProductModel);
    //           this.sourceQt = new LocalDataSource(this.qt);
    //         }
    //       )
    //     }
    //   }
    // )
  }

  settingsQt = {
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
        title: 'Référence',
        type: 'number',
        editable: false,
        addable: false,
      },
      quantity: {
        title: 'Quantité',
        type: 'number',
      },
      prixUnitaire: {
        title: 'Prix unitaire',
        type: 'number',
      },
      taxeProduit: {
        title: 'Tva (%)',
        type: 'number',
        editable: false,
        addable: false,
      },
      remiseProduit: {
        title: 'Remise (%)',
        type: 'number',
      },
      prixTotale: {
        title: 'Prix HT',
        type: 'number',
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          if (row.quantity != null && row.prixUnitaire != null) {
            var p = row.quantity * row.prixUnitaire;
            if (row.remiseProduit !== null) {
              row.prixTotale = p - ((p * row.remiseProduit) / 100);
            }
            if (row.remiseProduit === null) {
              row.prixTotale = p;
            }
            return row.prixTotale;
          }
        }
      },
      prixTTC: {
        title: 'Prix TTC',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          if (row.prixTotale != null && row.taxeProduit != null) {
            row.prixTTC = row.prixTotale + ((row.prixTotale * row.taxeProduit) / 100);
            return row.prixTTC;
          }
        }
      },
    },
  };

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      designation: {
        title: 'Désignation :',
        type: 'string',
        filter: true,
        editable: false,
        addable: false,
      },
      code: {
        title: 'Référence',
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
      ref: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      rs: {
        title: 'Raison social',
        type: 'string',
        filter: true,
      },
      res: {
        title: 'Premier résponsable',
        type: 'string',
        filter: true,
      },
      type: {
        title: 'Type',
        type: 'string',
        filter: true,
      },
      date: {
        title: 'Date',
        type: 'date',
        filter: true,
        sort: true,
        sortDirection: 'desc',
        valuePrepareFunction(d) {
          return d ? format(d, "MMM D,YYYY") : '-'
        }
      },
    },
  };

  ajouterDevis() {
    this.demandeFournisseur = { "idF": this.fournisseurId, "iddp": this.demandePrix.iddp, "dateDemande": this.demandePrix.demandeFournisseurs[0].dateDemande }

    this.devis.dateD = new Date();
    this.devis.prixTot = this.prixtot;
    this.devis.prixTTC = this.prixTT;
    this.devis.fraisDeLivraison
    this.devis.demandeFournisseur = this.demandeFournisseur;
    console.log(this.devis);
    this.serviceD.addDevis(this.devis).subscribe(data => {
      for (let i = 0; i < this.devisProduits.length; i++) {
        this.devisProduits[i] = {
          "idDemandeAchat": this.devisProduits[i].idDemandeAchat,
          "idProduct": this.devisProduits[i].idProduct, "codeP": this.devisProduits[i].codeP,
          "idD": data.idD, "qte": this.devisProduits[i].qte,
          "remiseProduit": this.devisProduits[i].remiseProduit,
          "taxeProduit": this.devisProduits[i].taxeProduit,
          "prix": this.devisProduits[i].prix, "prixTotale": this.devisProduits[i].prixTotale,
          "prixTTC": this.devisProduits[i].prixTTC
        }
      }

      for (let i = 0; i < this.devisProduits.length; i++) {
        this.serviceDProduit.addDevisProduits(this.devisProduits[i]).subscribe(
          data => {
            console.log(data)
          },
          error => {
            console.log(error)
          })
      }


      localStorage.removeItem('e');
      localStorage.removeItem('idDF');
      this.windowRef.close();
      this.showToast(NbToastStatus.INFO, "Référence Devis:" + data.reference, "vous pouvez consulter votre devis")
      this.router.navigate([DevisAchatComponent.urlDevisAchat]);
    },
      error => {
        console.log("error");
        this.showToast(NbToastStatus.INFO, "Devis", "Référence existe deja ")
      })

  }
  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idDF');

    this.windowRef.close();
  }

  confirmerQt(event) {
    event.confirm.resolve()
    let t = 0

    if (event.newData.remiseProduit == null) {
      this.prixProduitTot = (+event.newData.quantity) * (+event.newData.prixUnitaire)
    }
    if (event.newData.remiseProduit != null) {
      var p = (+event.newData.quantity) * (+event.newData.prixUnitaire);
      this.prixProduitTot = p - ((p * event.newData.remiseProduit) / 100)
    }
    this.prixTTC = this.prixProduitTot + ((this.prixProduitTot * event.newData.taxeProduit) / 100)
    for (let i = 0; i < this.devisProduits.length; i++) {
      if (this.devisProduits[i].codeP == event.newData.code) {
        this.prixtot -= (this.devisProduits[i].qte) * (this.devisProduits[i].prix)
        this.prixtot += (event.newData.quantity) * (event.newData.prixUnitaire)
        this.devisProduits[i].qte = event.newData.quantity
        this.devisProduits[i].prix = event.newData.prixUnitaire
        this.devisProduits[i].prixTotale = this.prixProduitTot
        this.devisProduits[i].prixTTC = this.prixTT;
        t = 1;
        break;
      }
    }
    if (t == 0) {
      console.log(event);
      this.devisProduits.push({
        "idDemandeAchat": event.newData.idDemandeAchat, "idProduct": event.newData.idProduct,
        "remiseProduit": event.newData.remiseProduit, "taxeProduit": event.newData.taxeProduit,
        "codeP": event.newData.code, "qte": event.newData.quantity, "prix": event.newData.prixUnitaire, "prixTotale": this.prixProduitTot,
        "prixTTC": this.prixTTC
      });
      this.prixtot += this.prixProduitTot;
      this.prixTT += this.prixTTC;
    }
  }

  onAddFrais() {
    console.log(this.devis.ancienFraisDeLivraison);
    if (this.devis.ancienFraisDeLivraison != null) {
      this.prixTT = (+this.prixTT) - (+this.devis.ancienFraisDeLivraison);
    }
    this.prixTT = (+this.prixTT) + (+this.devis.fraisDeLivraison);
    this.devis.ancienFraisDeLivraison = (+this.devis.fraisDeLivraison);
  }
}
