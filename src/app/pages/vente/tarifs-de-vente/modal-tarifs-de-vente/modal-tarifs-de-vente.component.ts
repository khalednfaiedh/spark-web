import { Component, OnInit } from '@angular/core';
import { TarifsDeVenteModel } from '../tarifs-de-vente.model';
import { NbWindowRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { TarifsDeVentesService } from '../service/tarifs-de-ventes.service';
import { ProductModel } from '../../../admin/product/product.model';
import {
  FamilleDeProduitModel
}
  from '../../../admin/famille-de-produit/famille-de-produit.model';
import { ProductService } from '../../../admin/product/product.service';
import {
  FamilleDeProduitService
}
  from '../../../admin/famille-de-produit/famille-de-produit.service';
import { TaxeComponent } from '../../../admin/taxe/taxe.component';
import { UniteMesureModel } from '../../../admin/unite-mesure-product/Unite-mesure.model';
import { MonnaisModel } from '../../../admin/taxe/Monnais.Model';
import { UniteMesureService } from '../../../admin/unite-mesure-product/unite-mesure.service';
import { UserData } from '../../../../@core/data/users';
import { TarifsDeVenteComponent } from '../tarifs-de-vente.component';
import { ClientService } from '../../../admin/client/client.service';
import { ClientModel } from '../../../admin/client/client.model';
import { ContratClientService } from '../../contrat-client/contrat-client.service';
import { ContratClientModel } from '../../contrat-client/contrat-client-model';
import { DatePipe, formatDate } from '@angular/common';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { GrilleTarifsService } from '../../../admin/grille-tarifs/grille-tarifs.service';
import { GrilleTarifsModel } from '../../../admin/grille-tarifs/grille-tarifs-model';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';
import { UniteDeTransactionService } from '../../../admin/unite-de-transaction/UniteDeTransaction.service';
import { UniteDeTransactionModel } from '../../../admin/unite-de-transaction/UniteDeTransaction.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-modal-tarifs-de-vente',
  templateUrl: './modal-tarifs-de-vente.component.html',
  styleUrls: ['./modal-tarifs-de-vente.component.scss']
})
export class ModalTarifsDeVenteComponent implements OnInit {
  e = localStorage.getItem('e');

  ARCP: string;
  tarifs: TarifsDeVenteModel;
  grilleTarif: GrilleTarifsModel = new GrilleTarifsModel()
  products: ProductModel[];
  product: ProductModel = new ProductModel();
  unite: UniteMesureModel;
  FamilleDeProduits: FamilleDeProduitModel[]
  idCategorie: any;
  client: ClientModel = new ClientModel();
  clients: ClientModel[];
  margeBenfecairemin: number;
  FamilleDeProduit: FamilleDeProduitModel;
  unities: UniteMesureModel[];
  unitiesModel: UniteMesureModel
  unitesTransaction: UniteDeTransactionModel[]
  devises = Object.values(MonnaisModel);
  perte: number;
  prix1: number
  prix2: number
  sommeMPFRCP: number = 0
  thousands: any
  decimal: any
  precision: number
  grilleTarifs: GrilleTarifsModel[]
  idEntr = localStorage.getItem('current_entreprise')
  entreprise: Entreprise
  source2 = interval()
  subscription: Subscription
  constructor(private service: TarifsDeVentesService,
    private serviceContrat: ContratClientService,
    private toastrService: NbToastrService,
    private serivceProduct: ProductService,
    public datepipe: DatePipe,
    private serviceFamilleDeProduit: FamilleDeProduitService,
    private serviceUnite: UniteMesureService,
    private serviceProduit: ProductService,
    private serviceGrilleTarif: GrilleTarifsService,
    private serviceCLT: ClientService,
    private serviceEntreprise: EntrepriseService,
    private serviceUniteTransaction: UniteDeTransactionService,
    public windowRef: NbWindowRef,
    public router: Router) { }

  ngOnInit() {
    this.tarifs = new TarifsDeVenteModel();
    this.serviceEntreprise.getEnterpriseById(+this.idEntr).subscribe(data => {
      this.entreprise = data

    })
    this.serviceUniteTransaction.getAllUniteDeTransaction(+this.idEntr).subscribe(data => {
      this.unitesTransaction = data

      data.forEach(element => {
        if (element.etat == "principal") {
          this.tarifs.idUniteTransaction = element.idT
          this.setFormatNumber(element)
        }
      });

    })

    let idEntreprise = localStorage.getItem('current_entreprise')
    this.serviceFamilleDeProduit.getAllFamilleDeProduit(+idEntreprise).subscribe((data: any) => {


      console.log("famille de produit", data)

      this.FamilleDeProduits = data;

    }
    )
    this.serviceGrilleTarif.getAllGrilleTarifs(+this.idEntr).subscribe(data => { this.grilleTarifs = data })
    this.serviceCLT.getAllClient(+this.idEntr).subscribe((data: any) => {
      this.clients = data;

    }
    )
    //calcule prixdeventeHt
    this.subscription = this.source2.subscribe(val => {
      if (this.tarifs.margeBenfecaire != null) {
        this.sommeMPFRCP = this.tarifs.prixAchatMP + this.tarifs.fraisFixe + this.tarifs.coutProduction
        this.tarifs.prixdeventeHt = this.sommeMPFRCP + (this.sommeMPFRCP * (this.tarifs.margeBenfecaire / 100));

      } else {
        this.sommeMPFRCP = this.tarifs.prixAchatMP + this.tarifs.fraisFixe + this.tarifs.coutProduction
        this.tarifs.prixdeventeHt = this.sommeMPFRCP + (this.sommeMPFRCP * (this.margeBenfecairemin / 100));
      }
    });
    //calcule prix avec remise
    this.subscription = this.source2.subscribe(val => {
      this.tarifs.prixventeremise = this.tarifs.prixdeventeHt - ((this.tarifs.prixdeventeHt * this.tarifs.remise) / 100);
    })


    if (this.e === '0') {
      this.ARCP = 'Ajouter';

    }
    if (this.e === '1') {
      let idT = localStorage.getItem('idTarif');
      this.ARCP = 'Modifier';
      this.service.getTarifsbyId(+idT).subscribe(
        data => {
          this.tarifs = data;
          console.log("tarifupdate", this.tarifs)
          this.serviceProduit.getProductById(data.idProduct).subscribe(dataProduct => {
            this.product = dataProduct
            this.idCategorie = this.product.familleDeProduit.id
            this.margeBenfecairemin = this.product.margeBenfecaire
            this.unities = this.product.uniteMesures
          })
          this.serviceGrilleTarif.getGrilleTarifs(this.tarifs.idGrilleTarif).subscribe(dataGrille => {
            this.grilleTarif = dataGrille
          })
          this.serviceUniteTransaction.getUniteDeTransactionById(this.tarifs.idUniteTransaction).subscribe(data => {
            this.setFormatNumber(data)
          })
        },
        error => { console.log('error'); });

    }
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
  onAddRCM() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      if (this.verifierDateFin() != null || this.verifierDatedebut() != null) {
        this.showToast(NbToastStatus.DANGER, "Date début ou fin est exite", "")
      }
      else {
        this.tarifs.idEntreprise = +this.idEntr
        this.tarifs.idClient = this.client.code_clt;
        this.tarifs.nameClient = this.client.nameC;
        this.tarifs.dateCreation = new Date();
        this.tarifs.idProduct = this.product.idProduct;
        this.tarifs.idGrilleTarif = this.grilleTarif.id
        this.service.addTarifs(this.tarifs).subscribe(
          data => {
            this.tarifs = data
            console.log("dataTarif=======>", data)
            localStorage.removeItem('e');
            localStorage.removeItem('idTarif');
            this.showToast(NbToastStatus.SUCCESS, "Prix de produit", "est ajouter avrc success")
            this.windowRef.close();
            this.router.navigate([TarifsDeVenteComponent.urlRefreshTarifsDeVente]);
          },
          error => {
            console.log('error', error);
            this.showToast(NbToastStatus.DANGER, "Erreur", "")

          });
      }

    }
    if (e === '1') {


      this.tarifs.idClient = this.client.code_clt;
      this.tarifs.nameClient = this.client.nameC;
      this.tarifs.idProduct = this.product.idProduct;
      this.tarifs.idEntreprise = +this.idEntr
      this.tarifs.idGrilleTarif = this.grilleTarif.id
      // this.tarifs.unite = this.unitiesModel.unite
      this.tarifs.datemisjour = new Date();
      this.service.updateTarifs(this.tarifs).subscribe(
        data => {
          this.showToast(NbToastStatus.SUCCESS, "Prix de produit", " est modifier avec succéss")
          localStorage.removeItem('e');
          localStorage.removeItem('idTarif');
          this.windowRef.close();
          this.router.navigate([TarifsDeVenteComponent.urlRefreshTarifsDeVente]);
        },
        error => { console.log('error'); });

    }
  }
  onclose() {
    this.windowRef.close();
  }
  SelectCategorie(idCategorie) {

    this.serivceProduct.getProductByCategorie(+idCategorie).subscribe(data => {
      this.products = data;
      this.product = new ProductModel();

      console.log("data===>", data)
    })



  }
  listProduct() {
    let id = localStorage.getItem('idF')

  }
  //get marge benéficire et liste des unitées de mesures d'un produit selectionné
  changeMargeBenificaire() {

    this.tarifs.idProduct = this.product.idProduct;
    this.margeBenfecairemin = this.product.margeBenfecaire;
    this.unities = this.product.uniteMesures

    this.tarifs.idUnite = this.unities[0].idUnite

    console.log(" this.tarifs.idProduct", this.tarifs.idProduct)

  }


  calculDate() {
    if (this.tarifs.debutValidite > this.tarifs.finValidite) {
      this.showToast(NbToastStatus.DANGER, "Date incorrecte", "fin de validité doit être superieur a début de validité")
    }
  }
  calculePeret(event) {

    if (this.margeBenfecairemin > this.tarifs.margeBenfecaire) {
      if (window.confirm(`Marge béneficaire minimum est ` + this.margeBenfecairemin + `Vous etes sure ?`)) {
        this.sommeMPFRCP = this.tarifs.prixAchatMP + this.tarifs.fraisFixe + this.tarifs.coutProduction
        this.prix1 = this.sommeMPFRCP + (this.sommeMPFRCP * (this.margeBenfecairemin / 100));
        this.prix2 = this.sommeMPFRCP + (this.sommeMPFRCP * (this.tarifs.margeBenfecaire / 100));
        this.perte = this.prix1 - this.prix2
        this.showToast(NbToastStatus.DANGER, "Attention", "votre perte est " + this.perte)
      }
      else {
        event.confirm.reject();
      }
    }

  }

  verifierDatedebut() {

    this.service.gatAllTarifByProduct(this.tarifs.idProduct).subscribe(dataP => {

      for (let i = 0; i < dataP.length; i++) {
        if (this.tarifs.debutValidite == dataP[i].debutValidite && this.grilleTarif.id == dataP[i].idGrilleTarif && this.tarifs.idUnite == dataP[i].idUnite && this.tarifs.idUniteTransaction == dataP[i].idUniteTransaction) {
          this.showToast(NbToastStatus.DANGER, "Date début est existe", "")
        }
      }
    })

  }
  verifierDateFin() {
    this.service.gatAllTarifByProduct(this.tarifs.idProduct).subscribe(dataP => {
      for (let i = 0; i < dataP.length; i++) {
        if (this.tarifs.finValidite == dataP[i].finValidite && this.grilleTarif.id == dataP[i].idGrilleTarif && this.tarifs.idUnite == dataP[i].idUnite && this.tarifs.idUniteTransaction == dataP[i].idUniteTransaction) {
          this.showToast(NbToastStatus.DANGER, "Date fin est existe", "")
        }
      }
    })

  }
}