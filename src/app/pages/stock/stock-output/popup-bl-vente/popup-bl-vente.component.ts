import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { BonDeLivraisonClientModel } from '../../../vente/bon-de-livraison/Bon-de-livraison-client-model';
import { BonDeLivraisonService } from '../../../vente/bon-de-livraison/service/bon-de-livraison.service';
import { QuantityProductLivreService } from '../../../vente/bon-de-livraison/service/quantity-product-livre.service';
import { Mouvement, MouvementProduit } from '../../mouvement/mouvement';
import { StockEtatService } from '../../services/etatDeStock.service';
import { MvtService } from '../../services/mouvementService';

@Component({
  selector: 'ngx-popup-bl-vente',
  templateUrl: './popup-bl-vente.component.html',
  styleUrls: ['./popup-bl-vente.component.scss']
})
export class PopupBlVenteComponent implements OnInit {
  bl : BonDeLivraisonClientModel = new BonDeLivraisonClientModel()
  produits: any= [];
  mvt : Mouvement = new Mouvement()
  btn: String = "enregistrer"
  show: boolean;
  show2: boolean;
  stocks: any = [];
  constructor(private qService : QuantityProductLivreService,
    private windowRef: NbWindowRef,
    private stockEtatservice : StockEtatService,
    private mvtService :MvtService,
    private router : Router,
    private blService : BonDeLivraisonService,
     @Inject(NB_WINDOW_CONTEXT) context) {
     if (context.edit2 || context.show2) {
       this.btn = 'Modifier'
       console.log("edit")
       this.mvt = context.data
       this.mvt.dateOperation= new Date(this.mvt.dateOperation)
       this.blService.getBondeLivraisonById(this.mvt.idSource).subscribe(
         data => {this.bl = data}
       )
       this.qService.getAllQuantityProductLivreBonDeLivraison(this.mvt.idSource).subscribe(
        data => {this.produits = data}
        )
     } else {
        console.log("save")
        this.bl = context.data
        this.qService.getAllQuantityProductLivreBonDeLivraison(this.bl.id).subscribe(
          data => {this.produits = data
            this.produits.forEach(prd => {
              this.stockEtatservice.stockEtatByProduit(prd.idProduct).subscribe(
                data => { this.stocks.push(data)},
                error => { console.log("error",error)})
            });},
          error => { console.log("error",error)})
     }

  }

  ngOnInit() {
    
    }
  settings = {  
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      actions:{
        position: 'right',
          delete: false,
          add:false,
          edit:false
      },
      columns: {
        code: {
          title: "Réf",
          type: "string",
          width : "12%"

        },
        designation: {
          title: "Désignation",
          type: "string",  
        },
        quantitytot: {
          title: "Qté total",
          type: "string",
        },
        quantiteLivre: {
          title: "Qté livré",
          type: "string",
        },
        quantiteReste: {
          title: "Qté restante",
          type: "string",
        }  
      }
  };
  save(){
    if (!this.mvt.id) {
      this.mvt.idSource = this.bl.id
      this.mvt.natureMvt = '2'
      this.mvt.typeMvt = '1'
      this.mvt.mouvementProduit = new Array<MouvementProduit>()
      this.stocks.forEach(i => {
        i.forEach(j => {
          if (j.quantiteDeSortie) {
            let prd = new MouvementProduit()
            prd.idProduit = j.idProduit
            prd.nameProduit =j.nameProduit
            prd.lot = j.lot
            prd.quantity = j.quantiteDeSortie
            prd.reference = j.reference
            prd.idStock = j.id
            this.mvt.mouvementProduit.push(prd)
          }
        });
      });
    }
   
    this.mvtService.addMouvement(this.mvt).subscribe(
      data => { 
          this.router.navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["/pages/stock/sorties"]));
          this.windowRef.close();},
      err => {console.log(err)}
    )
  }
  pSettings = {  
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    actions:{
      position: 'right',
        delete: false,
        add:false
    },
    columns: {
      reference: {
        title: "Référence",
        type: "string",
        addable: false,
        editable: false,
        width : "20%"
      },
      nameProduit: {
        title: "Désignation",
        type: "string",
        addable: false,
        editable: false
      },
      quantity: {
        title: "Quantité",
        type: "string",
        width : "20%"
      },
      lot: {
        title: "N°lot",
        type: "string",
        editable: false
      }
    }
};
onSaveConfirm(event): any {
  event.confirm.resolve(event.newData)
}
  close(){
   this.windowRef.close();
  }
}
