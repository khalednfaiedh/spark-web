import { ContratService } from '../../contrat-fournisseur/service/contrat-fournisseur.service';
import { NbToastrService } from '@nebular/theme';
import { NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DevisProduitAchatService } from '../../devis-achat/services/devis-produit-achat.service';
import { DevisAchatService } from '../../devis-achat/services/devis-achat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { BonCommandeService } from '../services/bon-commande.service';
import { MontantService } from '../services/montant.service';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { EtapeCommandeModel } from '../../../admin/etape-commande/etape-commande.model';
import { EtapeCommandeService } from '../../../admin/etape-commande/etape-commande.service';
import { MagasinService } from '../../../stock/magasin/services/magasin.service';


@Component({
  selector: 'ngx-modal-bon-commande',
  templateUrl: './modale-bon-commande.component.html',
  styleUrls: ['./modale-bon-commande.component.scss']
})
export class ModaleBonCommandeComponent implements OnInit {
  etapeCommandes: EtapeCommandeModel[];
  e = localStorage.getItem('e');
  id = localStorage.getItem('idBC');
  today = new Date();
  taxe: number = 0;
  qt: any[] = [];
  montants: any[] = [];
  source: LocalDataSource;
  bonCommande: any = new Object();
  prixHT: number = 0;
  prixTTC: number = 0;
  fournisseurs: any;
  settings: any;
  magasins: any;


  constructor(private serviceEtape: EtapeCommandeService,
    private router: Router,
    public windowRef: NbWindowRef,
    public service: BonCommandeService,
    private serviceDP: DevisProduitAchatService,
    private serviceFournisseur: FournisseurService,
    private serviceMagasin: MagasinService,
    private serviceD: DevisAchatService,
    private serviceM: MontantService,
    private toastrService: NbToastrService,
    private serviceContrat: ContratService,
    private serviceF: FournisseurService) { }

  ngOnInit() {
    // let idEntreprise = localStorage.getItem("current_entreprise");
    // this.serviceMagasin.getMagasinByEntreprise(+idEntreprise).subscribe(data => {
    //   this.magasins = data;
    // },
    //   error => { console.log("error"); });
    let id = localStorage.getItem('current_entreprise')
    this.serviceMagasin.getAllMagasin().subscribe(data => {
      this.magasins = data;
    },
      error => { console.log("error"); });

    this.serviceFournisseur.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
    },
      error => { console.log("error"); });

    this.serviceEtape.getAllEtapeCommande().subscribe(data => {
      this.etapeCommandes = data;
    },
      error => { console.log("error"); })
    if (this.e === '0') {

      this.settings = {
        edit: {
          editButtonContent: '<i class="nb-plus"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmSave: true,
        },
        actions: {
          add: false,
          delete: false,
          edit: false,
          position: 'right',
        },
        columns: {
          code: {
            title: 'code',
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
          taxeProduit: {
            title: 'Tva (%)',
            type: 'number',
            filter: false,
            addable: false,
            editable: false
          },
          prixUnitaire: {
            title: 'Prix unitaire',
            type: 'number',
            filter: false,
          },
          remiseProduit: {
            title: 'Remise (%)',
            type: 'number',
            filter: false,
          },
          prixTotale: {
            title: 'Prix HT',
            type: 'number',
            editable: false,
            addable: false,
            // valuePrepareFunction(cell, row) {
            //   if (row.quantity != null && row.prixUnitaire != null) {
            //     var p = row.quantity * row.prixUnitaire;
            //     if (row.remiseProduit !== null) {
            //       row.prixTotale = p - ((p * row.remiseProduit) / 100);
            //     }
            //     if (row.remiseProduit === null) {
            //       row.prixTotale = p;
            //     }
            //     return row.prixTotale;
            //   }
            // }
          },
          prixTTC: {
            title: 'Prix TTC',
            type: 'number',
            filter: false,
            editable: false,
            addable: false,
          },
        },
      };

      this.serviceD.getDevis(+this.id).subscribe(data => {
        console.log(data);
        this.bonCommande.fraisDeLivraison = data.fraisDeLivraison;
        this.bonCommande.ancienFraisDeLivraison = data.fraisDeLivraison;
        for (let i = 0; i < data.devisProduits.length; i++) {
          this.qt.push({
            "idDevisP": data.devisProduits[i].idDevisP, "quantity": data.devisProduits[i].qte, "code": data.devisProduits[i].codeP,
            "prixUnitaire": data.devisProduits[i].prix, "prixTotale": data.devisProduits[i].prixTotale,
            "prixTTC": data.devisProduits[i].prixTTC,
            "remiseProduit": data.devisProduits[i].remiseProduit, "taxeProduit": data.devisProduits[i].taxeProduit
          })
          this.montants.push({
            "idBC": 0, "idDevisP": data.devisProduits[i].idDevisP,
            "prixTotale": data.devisProduits[i].prixTotale,
            "taxeProduit": data.devisProduits[i].taxeProduit,
            "remiseProduit": data.devisProduits[i].remiseProduit,
            "prixTTC": data.devisProduits[i].prixTTC,
            "quantityBC": data.devisProduits[i].qte,
            "prixBC": data.devisProduits[i].prix
          })
        }
        this.source = new LocalDataSource(this.qt);
        this.serviceF.getFournisseurById(data.demandeFournisseur.idF).subscribe(
          data2 => {
            this.bonCommande.idF = data2.idF;
          },
          error => {
            console.log("error");
          });
        this.prixTTC = this.prixTTC + data.prixTTC;
        this.prixHT = this.prixHT + data.prixTot;
      });
    }
    if (this.e === '1') {
      this.settings = {
        actions: {
          add: false,
          edit: false,
          delete: false,
          position: 'right',
        },
        columns: {
          code: {
            title: 'code',
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
          prixUnitaire: {
            title: 'Prix unitaire',
            type: 'number',
            filter: false,
          },
          prixTotale: {
            title: 'Prix totale',
            type: 'number',
            filter: false,
            editable: false,
            addable: false,
          },
          prixTTC: {
            title: 'Prix TTC',
            type: 'number',
            filter: false,
            editable: false,
            addable: false,
          },
        },
      };

      this.serviceContrat.getContratById(+this.id).subscribe(contrat => {
        this.bonCommande.idF = contrat.idF
        for (let i = 0; i < contrat.devisProduits.length; i++) {
          this.qt.push({
            "idDevisP": contrat.devisProduits[i].idDevisP, 
            "quantity": contrat.devisProduits[i].qte,
            "code": contrat.devisProduits[i].codeP, "prixUnitaire": contrat.devisProduits[i].prix,
            "prixTotale": contrat.devisProduits[i].prixTotale,
            "taxeProduit": contrat.devisProduits[i].taxeProduit,
            "prixTTC": contrat.devisProduits[i].prixTTC
          })
          this.montants.push({
            "idBC": 0, "idDevisP": contrat.devisProduits[i].idDevisP,
            "codeProduit": contrat.devisProduits[i].codeP,
            "quantityBC": contrat.devisProduits[i].qte,
            "prixBC": contrat.devisProduits[i].prix,
            "prixTotale": contrat.devisProduits[i].prixTotale,
            "taxeProduit": contrat.devisProduits[i].taxeProduit,
            "prixTTC": contrat.devisProduits[i].prixTTC
          });

        }
        this.source = new LocalDataSource(this.qt);
      })
    }
  }

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

  correctDate(event) {
    var today = new Date()
    if (event.getTime() < today.getTime()) {
      this.showToast(NbToastStatus.DANGER,
        "Date incorrecte",
        "Vous pouvez choisir une date superierue à celle du aujourd'hui");
    }
  }

  ajouterBC() {
    if (this.e === '0') {
      while (true) {
        if (this.bonCommande.dateLivraison == null) {
          this.showToast(NbToastStatus.DANGER, "Date incorrecte", "Vous êtes obligé d'ajouter la date livraison");
        }
        else {
          let e = localStorage.getItem('e');
          this.bonCommande.statut = "en_attente"
          this.bonCommande.dateCommande = this.today;
          this.service.addBonCommandes(this.bonCommande).subscribe(data => {
            for (let i = 0; i < this.montants.length; i++) {
              this.montants[i].idBC = data.idBC;
              this.serviceM.addMontant(this.montants[i]).subscribe(data => {
                localStorage.removeItem('e');
                localStorage.removeItem('idRC');
                this.windowRef.close();
                this.router.navigateByUrl("/", { skipLocationChange: true })
                  .then(() => this.router.navigate(["/pages/achat/bonCommande"]));
              });
            }
          },
            error => {
              console.log("error", error);
              this.showToast(NbToastStatus.DANGER, "Bon de commande", "Référence existe déja");
            });
        }
        break
      }
    }
    if (this.e === '1') {
      if (this.bonCommande.dateLivraison == null) {
        this.showToast(NbToastStatus.DANGER, "Date incorrecte", "Vous êtes obligé d'ajouter la date livraison");
      }
      else {
        this.bonCommande.statut = "confirmé"
        this.bonCommande.dateCommande = this.today;
        this.service.addBonCommandes(this.bonCommande).subscribe(data => {
          for (let i = 0; i < this.montants.length; i++) {
            this.montants[i].idBC = data.idBC;
            this.serviceM.addMontant(this.montants[i]).subscribe(data => {
              localStorage.removeItem('e');
              localStorage.removeItem('idRC');
              this.windowRef.close();
              this.router.navigateByUrl("/", { skipLocationChange: true })
                .then(() => this.router.navigate(["/pages/achat/bonCommande"]));
            });
          }
        },
          error => {
            console.log("error", error);
            this.showToast(NbToastStatus.DANGER, "Bon de commande", "Référence existe déja");
          });
      }
    }
  }

  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }

  onChargeAdresse(event) {
    this.bonCommande.lieuLivraison = event.adresseMagasin;
  }

  onAddFrais(){
    console.log(this.bonCommande.ancienFraisDeLivraison);
    if(this.bonCommande.ancienFraisDeLivraison !== this.bonCommande.fraisDeLivraison){
      this.bonCommande = (+this.prixTTC) - (+this.bonCommande.ancienFraisDeLivraison);
    }
    this.prixTTC =  (+this.prixTTC) + (+this.bonCommande.fraisDeLivraison);
    this.bonCommande.ancienFraisDeLivraison = (+this.bonCommande.fraisDeLivraison);
  }

  addMontant(event) {
    if (this.e === '0') {
      let prixUnitaire: Number = 0;
      for (let i = 0; i < this.qt.length; i++) {
        let m= +this.qt[i].prixTotale;
        let mt= +this.qt[i].prixTTC;
        console.log("m", m);
        console.log("mt", mt)
        if (this.qt[i].code == event.data.code) {
          this.qt[i].quantity = +event.newData.quantity;
          this.qt[i].prixUnitaire = +event.newData.prixUnitaire;
          this.qt[i].remiseProduit = +event.newData.remiseProduit;

          var prixTo = +event.newData.quantity * +event.newData.prixUnitaire;
          if (+event.newData.remiseProduit !== null) {
            this.qt[i].prixTotale = prixTo - ((prixTo * +event.newData.remiseProduit) / 100);
          }
          if (+event.newData.remiseProduit === null) {
            this.qt[i].prixTotale = prixTo
          }

          if (+event.newData.taxeProduit !== null) {
            this.qt[i].prixTTC = +this.qt[i].prixTotale + ((+this.qt[i].prixTotale * +event.newData.taxeProduit) / 100);
          }
          if(+event.newData.taxeProduit === null){
            this.qt[i].prixTTC = this.qt[i].prixTotale;
          }

          this.montants[i].remiseProduit= +event.newData.remiseProduit;
          this.montants[i].quantityBC = +event.newData.quantity;
          this.montants[i].prixBC = event.newData.prixUnitaire;
          this.montants[i].codeProduit = event.data.code;
          this.montants[i].prixTotale = +this.qt[i].prixTotale;
          this.montants[i].prixTTC = +this.qt[i].prixTTC;

          this.prixHT -= +m;
          this.prixHT += +this.qt[i].prixTotale;
          this.prixTTC -= +mt;
          this.prixTTC += +this.qt[i].prixTTC;
          event.confirm.resolve(this.qt[i]);
        }
      }
      this.bonCommande.prixTot= this.prixHT;
      this.bonCommande.prixTTC= this.prixTTC;
    }
  }
}