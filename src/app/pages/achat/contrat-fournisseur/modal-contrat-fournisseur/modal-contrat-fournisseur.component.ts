import { Router } from '@angular/router';
import { DevisProduitAchatService } from '../../devis-achat/services/devis-produit-achat.service';
import { ContratService } from '../service/contrat-fournisseur.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowRef } from '@nebular/theme';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Component, OnInit } from '@angular/core';
import { DemandeAchatService } from '../../demande-achat/services/demande-achat.service';
import { ProductService } from '../../../admin/product/product.service';
import { FournisseurModel } from '../../../admin/fournisseur/fournisseur.model';
import { TaxeService } from '../../../admin/taxe/services/taxe.service';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { ContratFournisseurComponent } from '../contrat-fournisseur.component';

@Component({
  selector: 'ngx-modal-contrat-fournisseur',
  templateUrl: './modal-contrat-fournisseur.component.html',
  styleUrls: ['./modal-contrat-fournisseur.component.scss']
})
export class ModalContratFournisseurComponent implements OnInit {
  idDemandeAchat = localStorage.getItem('idRC');
  contrat: any = new Object();
  fournisseurs: FournisseurModel[] = []
  source: LocalDataSource = new LocalDataSource()
  devisProduit: any[] = []
  e = localStorage.getItem('e')
  taxes: any[] = []
  taxePourcentage: any;


  constructor(private serviceProduct: ProductService, private serviceDA: DemandeAchatService,
    public windowRef: NbWindowRef,
    private serviceF: FournisseurService, private toastrService: NbToastrService,
    private serviceContrat: ContratService,
    private serviceDP: DevisProduitAchatService,
    private router: Router,
    private serviceTaxe: TaxeService) { }

  ngOnInit() {
    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceTaxe.getAllTaxes(+idEntr).subscribe(data => {
      this.taxes = data;
    })
    this.serviceDA.getDemandeAchatById(+this.idDemandeAchat).subscribe(
      data => {
        for (let i = 0; i < data.quantityProducts.length; i++) {
          this.serviceProduct.getProductById(data.quantityProducts[i].idProduct).subscribe(data2 => {
            this.devisProduit.push({ "idProduct": data.quantityProducts[i].idProduct, "codeP": data2.code, "qte": data.quantityProducts[i].quantity, "prix": 0 })
            this.source = new LocalDataSource(this.devisProduit);
          })
        }
      },
      error => {
        console.log(error);
      },
    );
    let id = localStorage.getItem('current_entreprise')
    this.serviceF.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
    })
  }
  onChange() {
    this.contrat.taxe = this.taxePourcentage
    console.log(this.contrat)
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
  ControleDate(event) {
    var today = new Date()
    if (event.getTime() < today.getTime()) {
      this.showToast(NbToastStatus.DANGER, "Date incorrecte", "Vous pouvez choisir une date superierue à celle du aujourd'hui")
    }
  }
  addContrat() {
    this.serviceContrat.addContrat(this.contrat).subscribe(data => {
      for (let i = 0; i < this.devisProduit.length; i++) {
        this.devisProduit[i]["idContrat"] = data.idContrat
      }
      for (let i = 0; i < this.devisProduit.length; i++) {
        this.serviceDP.addDevisProduits(this.devisProduit[i]).subscribe(data1 => {

        })
      }
    })
    this.close()
    this.router.navigate([ContratFournisseurComponent.urlRefreshContratFournisseur]);




  }
  close() {
    this.windowRef.close();
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
      codeP: {
        title: 'Code',
        type: 'string',
        filter: true,
        editable: false,
        addable: false,
      },
      qte: {
        title: 'Quantité',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
      prix: {
        title: 'Prix',
        type: 'number',
        filter: false,
      },
      prixTotale: {
        title: 'Prix Totale',
        type: 'number',
        filter: false,
        valuePrepareFunction(cell, row) {
          return (row.prix * row.qte)
        }
      },

    },
  };
  addDevisProduit(event) {
    event.confirm.resolve()
    for (let i = 0; i < this.devisProduit.length; i++) {
      if (this.devisProduit[i].codeP == event.codeP) {
        this.devisProduit[i].prix = parseInt(event.data.prix)
        event.confirm.resolve()(this.devisProduit[i])
      }
    }
  }
}