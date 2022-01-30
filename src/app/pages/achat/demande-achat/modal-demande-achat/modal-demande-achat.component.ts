import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { DemandeAchatModel } from '../model/demande-achat.model'
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';
import { DemandeAchatService } from '../services/demande-achat.service';
import { QuantityProductModel } from '../model/demande-achat-of-product.model';
import { QuantityProductService } from '../services/quantity-product-service.service';
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from "angular2-toaster"
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DemandeAchatComponent } from '../demande-achat.component';
import { ProductService } from '../../../admin/product/product.service';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';

@Component({
  selector: 'ngx-modal-demande-achat',
  templateUrl: './modal-demande-achat.component.html',
  styleUrls: ['./modal-demande-achat.component.scss']
})
export class ModalDemandeAchatComponent implements OnInit {
  ARCM: string;
  source: LocalDataSource;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  today = new Date();
  demandeur = ['Achat','Vente','Production','Stock']

  quantityProductModel: QuantityProductModel;
  demandeAchat: DemandeAchatModel = new DemandeAchatModel();
  //liste des quantity product initiale récupérés de la base de données
  quantityProductInitial: any = []
  quantityProductNotNull: any = []

  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: DemandeAchatService,
    private productService: ProductService,
    private quantityProductService: QuantityProductService,
    private toastrService: NbToastrService,
    private userService : UtilisateurService) {
  }

  ngOnInit() {
    let id= localStorage.getItem('current_entreprise')
    if (this.e === '0') {
      this.ARCM = 'Ajouter';
      this.productService.getAllproduct(+id).subscribe(
        data => {
          for (let i = 0; i < data.length; i++) {
            this.quantityProductInitial.push({"designation":data[i].designation, "code": data[i].code, "idProduct": data[i].idProduct, "quantity": 0 })
            this.source = new LocalDataSource(this.quantityProductInitial);
          }
        },
        error => {
          console.log(error);
        });
    }

    if (this.e === '1') {
      this.ARCM = 'Modifier';
      this.service.getDemandeAchatById(+this.id).subscribe(
        data => {
          this.demandeAchat = data;
          this.source = new LocalDataSource(data.quantityProducts);
        },
        error => {
          console.log(error);
        },
      );
    }
  }
  
  settings = {

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
  test(event) {
    var today = new Date()
    if (event.getTime() <= today.getTime()) {
      this.showToast(NbToastStatus.DANGER, "Date incorrecte", "Vous pouvez choisir une date superierue à celle du aujourd'hui")
    }
  }


  onAddRCM() {
    while (true) {
      if (this.demandeAchat.dateLivraison == null) {
        this.showToast(NbToastStatus.DANGER, "Date incorrecte", "Vous êtes obligé d'ajouter la date livraison")
      }
      else {
        let e = localStorage.getItem('e');
        this.demandeAchat.statut = "En attente"
        this.demandeAchat.dateDemande = this.today;
        this.demandeAchat.creePar = this.userService.getCurrentUserCell().userName;
        this.service.addDemandeAchats(this.demandeAchat).subscribe(
          data => {
            this.demandeAchat = data;
            for (let j = 0; j < this.quantityProductNotNull.length; j++) {
              this.quantityProductModel = {
                "idDemandeAchat": data.idDemandeAchat,
                "idProduct": this.quantityProductNotNull[j].idProduct,
                "quantity": this.quantityProductNotNull[j].quantity
              }
              this.quantityProductService.addQuantityProduct(this.quantityProductModel).subscribe(data => {
                
               })
              this.quantityProductModel = new QuantityProductModel();
            }

            localStorage.removeItem('e');
            localStorage.removeItem('idRC');
            this.windowRef.close();
            this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/achat/proposition"]));          },
          error => {
            console.log(error);
          });
      }
      break
    }
  }

  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }


  addQuantityProduct(event) {
    event.confirm.resolve()
    let t = 0;
    for (let i = 0; i < this.quantityProductNotNull.length; i++) {
      if (this.quantityProductNotNull[i].idProduct == event.newData.idProduct) {
        this.quantityProductNotNull[i].quantity = +(event.newData.quantity)
        t = 1
        break
      }
    }
    if (t == 0) {
      this.quantityProductNotNull.push({ "idProduct": event.newData.idProduct, "quantity": (+event.newData.quantity) })
    }
    console.log(this.quantityProductNotNull)
  }
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

}

