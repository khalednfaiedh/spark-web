import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MontantModel } from '../model/montant.model'
import { BonCommandeService } from '../services/bon-commande.service';
import { MontantService } from '../services/montant.service';
import { ProduitService } from '../../../crm/services/produit.service';
import { Router } from '@angular/router';
import { NbWindowRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { EtapeCommandeService } from '../../../admin/etape-commande/etape-commande.service';
import { MagasinService } from '../../../stock/magasin/services/magasin.service';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'ngx-modal-bon-commande',
  templateUrl: './modal-bon-commande.component.html',
  styleUrls: ['./modal-bon-commande.component.scss']
})
export class ModalBonCommandeComponent implements OnInit {
  public documentGrp: FormGroup;
  public totalfiles: Array<MontantModel> = [];
  public totalFileName = [];
  public lengthCheckToaddMore = 0;
  public produits: any;
  public etapeCommandes: any;
  magasins: any;
  fournisseurs: any;
  today = new Date();
  documentGrps: any;
  bonCommande: any = new Object();
  constructor(private service: BonCommandeService,
    private serviceMontant: MontantService,
    private serviceEtape: EtapeCommandeService,
    private router: Router,
    private serviceFournisseur: FournisseurService,
    private windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private serviceMagasin: MagasinService,
    private serviceProduit: ProduitService) { }

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.serviceFournisseur.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
    },
      error => {
        console.log("error");
      })
    // let idEntreprise = localStorage.getItem("current_entreprise");
    // this.serviceMagasin.getMagasinByEntreprise(+idEntreprise).subscribe(data=>{
    //   this.magasins = data;
    // },
    // error=>{
    //   console.log("error");
    // })

    this.serviceMagasin.getAllMagasin().subscribe(data => {
      this.magasins = data;
    }, error => {
      console.log("error");
    })

    this.serviceEtape.getAllEtapeCommande().subscribe(data => {
      this.etapeCommandes = data;
    },
      error => { console.log("error"); })

    this.serviceProduit.getProducts().subscribe(data => {
      this.produits = data;
      console.log(this.produits);
    },
      error => {
        console.log("error");
      });

    this.documentGrp = this.formBuilder.group({
      itemss: this.formBuilder.array([])
    });

    this.documentGrp = this.formBuilder.group({
      itemss: this.formBuilder.array([this.createUploadDocuments()])
    });
  }

  createUploadDocuments1(montant: MontantModel) {
    return this.formBuilder.group({
      codeProduit: new FormControl(montant.codeProduit || new FormControl),
      quantityBC: new FormControl(montant.quantityBC || new FormControl),
      prixBC: new FormControl(montant.prixBC || new FormControl),
      taxeProduit: new FormControl(montant.taxeProduit || new FormControl),
      remiseProduit: new FormControl(montant.remiseProduit || new FormControl),
      prixTotale: new FormControl(montant.prixTotale || new FormControl),
      prixTTC: new FormControl(montant.prixTTC || new FormControl)
    });
  }

  createUploadDocuments(): FormGroup {
    return this.formBuilder.group({
      codeProduit: new FormControl(),
      quantityBC: new FormControl(),
      prixBC: new FormControl(),
      taxeProduit: new FormControl(),
      remiseProduit: new FormControl(),
      prixTotale: new FormControl(),
      prixTTC: new FormControl()
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

  calculPrixTotale(item) {
    console.log(item)
  }

  onChargeProduit(item) {
    item.value.taxeProduit=item.value.codeProduit.productTaxes[0].taxe.pourcentage;
  }

  removeItem(index: number) {
    this.totalFileName.splice(index);
    this.itemss.removeAt(index);
    this.lengthCheckToaddMore = this.lengthCheckToaddMore - 1;
  }

  onChargeAdresse(event) {
    this.bonCommande.lieuLivraison = event.adresseMagasin;
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
    var today = new Date();
    if (event.getTime() < today.getTime()) {
      this.showToast(NbToastStatus.DANGER,
        "Date incorrecte",
        "Vous pouvez choisir une date supérieur à celle du aujourd'hui");
    }
  }

  onAdd(formVal) {
    this.bonCommande.statut = "en_attente";
    this.bonCommande.dateCommande = this.today;
    this.service.addBonCommandes(this.bonCommande).subscribe(data => {
      formVal.itemss.forEach(element => {
        element.idBC = data.idBC;
        element.codeProduit = element.codeProduit.code;
        this.serviceMontant.addMontant(element).subscribe(data1 => {
          localStorage.removeItem('e');
          localStorage.removeItem('idBC');
          this.windowRef.close();
          this.router.navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/achat/bonCommande"]));
        },
          error => {
            console.log("error");
          });
      });
    },
      error => {
        console.log("error", error);
        this.showToast(NbToastStatus.DANGER, "Bon de commande", "Référence existe déja");
      });
  }

  // onAddFrais() {
  //   console.log(this.bonCommande.ancienFraisDeLivraison);
  //   if (this.bonCommande.ancienFraisDeLivraison != null) {
  //     this.prixTT = (+this.prixTT) - (+this.devis.ancienFraisDeLivraison);
  //   }
  //   this.prixTT = (+this.prixTT) + (+this.devis.fraisDeLivraison);
  //   this.bonCommande.ancienFraisDeLivraison = (+this.devis.fraisDeLivraison);
  // }
}