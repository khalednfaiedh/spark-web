import { Component, OnInit } from '@angular/core';
import { BonCommandeService } from '../../bon-commande/services/bon-commande.service';
import { BonDeLivraisonClientModel } from '../../../vente/bon-de-livraison/Bon-de-livraison-client-model';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MontantService } from '../../bon-commande/services/montant.service';
import { ProduitService } from '../../../crm/services/produit.service';
import { DevisProduitAchatService } from '../../devis-achat/services/devis-produit-achat.service';
import { DetailBonDeLivraisonAchatModel } from '../detail-bon-de-livraison-achat.model';
import { DetailBonDeLivraisonAchatService } from '../detail-bon-de-livraison-achat.service';
import { BonDeLivraisonAchatService } from '../bon-de-livraison-achat.service';
import { BonDeLivraisonAchatModel } from '../bon-de-livraison-ahat.model';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { MagasinService } from '../../../stock/magasin/services/magasin.service';

@Component({
  selector: 'ngx-modal-bon-de-livraison-achat',
  templateUrl: './modal-bon-de-livraison-achat.component.html',
  styleUrls: ['./modal-bon-de-livraison-achat.component.scss']
})
export class ModalBonDeLivraisonAchatComponent implements OnInit {
  bonDeCommandes: any;
  A: String;
  source: any;
  bonDeCommande: any;
  produits: any;
  public documentGrp: FormGroup;
  public totalfiles: Array<DetailBonDeLivraisonAchatModel> = [];
  public totalFileName = [];
  public lengthCheckToaddMore = 0;
  documentGrps: any;
  fournisseurs: any;
  magasins: any;
  detailBonDeLivraisonAchat: any;
  bonDeLivraisonAchat: BonDeLivraisonAchatModel = new BonDeLivraisonAchatModel();
  constructor(private service: BonDeLivraisonAchatService,
    private serviceDetailBonDeLivraisonAchat: DetailBonDeLivraisonAchatService,
    private serviceBonCommande: BonCommandeService, private formBuilder: FormBuilder,
    private serviceFournisseur: FournisseurService,
    private serviceProduit: ProduitService,
    private serviceDP: DevisProduitAchatService,
    private serviceMontant: MontantService,
    private serviceMagasin: MagasinService,
    private windowRef: NbWindowRef,
    private router: Router) { }

  ngOnInit() {
    let idEntreprise = localStorage.getItem("current_entreprise");
    this.serviceMagasin.getMagasinByEntreprise(+idEntreprise).subscribe(data => {
      this.magasins = data;
    },
      error => { console.log("error"); });
    this.documentGrp = this.formBuilder.group({
      itemss: this.formBuilder.array([])
    })
    let e = localStorage.getItem("e");
    this.serviceBonCommande.getAllBonCommande().subscribe(data => {
      this.bonDeCommandes = data;
    }, error => {
      console.log("error");
    })
    let id = localStorage.getItem('current_entreprise')
    this.serviceFournisseur.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
    }, error => {
      console.log("error");
    })
    

    this.serviceProduit.getProducts().subscribe(
      data => {
        this.produits = data;
      }, error => {
        console.log("error");
      })

    if (e === "0") {
      this.A = "Ajouter";
    }
    if (e === "1") {
      this.A = "Modifier";
      let idBL = localStorage.getItem("idBL");
      this.service.getBonDeLivraisonAchatById(+idBL).subscribe(data => {
        if (data != null) {
          this.bonDeLivraisonAchat = data;
          const lines = this.documentGrp.get('itemss') as FormArray;
          data.forEach(element => {
            lines.push(this.createUploadDocuments1(data))
          });
        }
        if (data == null) {
          this.documentGrp = this.formBuilder.group({
            itemss: this.formBuilder.array([this.createUploadDocuments()])
          });
        }
      });
    }
  }

  onChargeBC(event, formVal) {
    console.log("form", formVal.itemss);
    this.bonDeLivraisonAchat = new BonDeLivraisonAchatModel();
    this.serviceBonCommande.getBonCommandeById(+event.idBC).subscribe(data => {
      this.bonDeLivraisonAchat.dateLivraison = new Date(data.dateLivraison);
      this.bonDeLivraisonAchat.dateCommande = data.dateCommande;
      this.bonDeLivraisonAchat.idFournisseur = data.idF;
      this.bonDeLivraisonAchat.idMagasin = data.idMagasin;
      this.bonDeLivraisonAchat.lieuLivraison = data.lieuLivraison;
      this.serviceMontant.getAllMontantCommande(+data.idBC).subscribe(
        data1 => {
          data1.forEach(element => {
            this.detailBonDeLivraisonAchat = new DetailBonDeLivraisonAchatModel();
            this.detailBonDeLivraisonAchat.idProduit = element.codeProduit;
            this.detailBonDeLivraisonAchat.quantity = element.quantityBC;
            const lines = this.documentGrp.get('itemss') as FormArray;
            formVal.itemss.forEach((element1, index) => {
              this.removeItem(index);
            });
            lines.push(this.createUploadDocuments1(this.detailBonDeLivraisonAchat));
          });
        });
    },
      error => {
        console.log("error");
      })
  }


  createUploadDocuments1(detailsBonDeLivraisonn: DetailBonDeLivraisonAchatModel) {
    return this.formBuilder.group({
      idProduit: new FormControl(detailsBonDeLivraisonn.idProduit || new FormControl),
      quantity: new FormControl(detailsBonDeLivraisonn.quantity || new FormControl)
    });
  }

  createUploadDocuments(): FormGroup {
    return this.formBuilder.group({
      idProduit: new FormControl(),
      quantity: new FormControl()
    });
  }

  get itemss(): FormArray {
    return this.documentGrp.get('itemss') as FormArray;
  };

  addItem(): void {
    if (this.itemss.value[this.lengthCheckToaddMore].etape != "") {
      this.itemss.push(this.createUploadDocuments())
      this.lengthCheckToaddMore = this.lengthCheckToaddMore + 1;
    }
  }

  removeItem(index: number) {
    this.totalFileName.splice(index);
    this.itemss.removeAt(index);
    this.lengthCheckToaddMore = this.lengthCheckToaddMore - 1;
  }


  onAdd(formVal) {
    console.log(this.bonDeLivraisonAchat);
    this.service.addBonDeLivraisonAchatsByCommande(this.bonDeCommande, this.bonDeLivraisonAchat).subscribe(
      data => {

        formVal.itemss.forEach(element => {
          console.log(formVal.itemss);
          this.serviceDetailBonDeLivraisonAchat.addDetailBonDeLivraisonAchatsByBonDeLivraison(data.id, element).subscribe(data1 => {
            this.windowRef.close();
            this.router.navigateByUrl("/", { skipLocationChange: true })
              .then(() => this.router.navigate(["/pages/achat/bonDeLivraisonAchat"]));
          },
            error => {
              console.log("error");
            });
        });
      },
      error => {
        console.log("error");
      }
    )
  }
}