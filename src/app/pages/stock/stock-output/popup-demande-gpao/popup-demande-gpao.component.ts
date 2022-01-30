import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { DemandeProduit } from '../../../gpao/demande-produit/demande-produit.model';
import { DemandeProdService } from '../../../gpao/demande-produit/demande-produit.service';
import { Mouvement, MouvementProduit } from '../../mouvement/mouvement';
import { StockEtatService } from '../../services/etatDeStock.service';
import { MvtService } from '../../services/mouvementService';

@Component({
  selector: 'ngx-popup-demande-gpao',
  templateUrl: './popup-demande-gpao.component.html',
  styleUrls: ['./popup-demande-gpao.component.scss']
})
export class PopupDemandeGpaoComponent implements OnInit {

  demande: DemandeProduit = new DemandeProduit()
  produits: any = [];
  mvt: Mouvement = new Mouvement()
  btn: String = "enregistrer"
  show: boolean;
  show2: boolean;
  stocks: any = [];
  constructor(
    private windowRef: NbWindowRef,
    private stockEtatservice: StockEtatService,
    private mvtService: MvtService,
    private router: Router,
    private demandeService: DemandeProdService,
    @Inject(NB_WINDOW_CONTEXT) context) {
    if (context.edit2 || context.show2) {
      this.btn = 'Modifier'
      console.log("edit")
      this.mvt = context.data
      this.mvt.dateOperation = new Date(this.mvt.dateOperation)
      this.demandeService.getOne(this.mvt.idSource).subscribe(
        data => { this.demande = data })
      this.demandeService.getProduits(this.mvt.idSource).subscribe(
        data => { this.produits = data })
    } else {
      console.log("save")
      this.demande = context.data
      this.demandeService.getProduits(this.demande.id).subscribe(
        data => {
        this.produits = data
          this.produits.forEach(prd => {
            this.stockEtatservice.stockEtatByProduit(prd.idProduit).subscribe(
              data => { this.stocks.push(data) },
              error => { console.log("error", error) })
          });
        },
        error => { console.log("error", error) })
    }

  }

  ngOnInit() {

  }
  settings = {

    actions: {
      position: 'right',
      delete: false,
      add: false,
      edit: false
    },
    columns: {
      reference: {
        title: "Référence",
        type: "string",
      },
      nameProduit: {
        title: "Désignation",
        type: "string",
      },
      quantity: {
        title: "Qté à livrer",
        type: "string",
      }
    }
  };
  save() {
    if (!this.mvt.id) {
      this.mvt.idSource = this.demande.id
      this.mvt.natureMvt = '0'
      this.mvt.typeMvt = '1'
      this.mvt.mouvementProduit = new Array<MouvementProduit>()
      this.stocks.forEach(i => {
        i.forEach(j => {
          if (j.quantiteDeSortie) {
            let prd = new MouvementProduit()
            prd.idProduit = j.idProduit
            prd.nameProduit = j.nameProduit
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
        this.windowRef.close();
      },
      err => { console.log(err) }
    )
  }
  pSettings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    actions: {
      position: 'right',
      delete: false,
      add: false
    },
    columns: {
      reference: {
        title: "Référence",
        type: "string",
        addable: false,
        editable: false,
        width: "20%"
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
        width: "20%"
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
  close() {
    if (!this.mvt.id) {
      this.mvt.idSource = this.demande.id
      this.mvt.natureMvt = '0'
      this.mvt.typeMvt = '1'
      this.mvt.mouvementProduit = new Array<MouvementProduit>()
      this.stocks.forEach(i => {
        i.forEach(j => {
          if (j.quantiteDeSortie) {
            let prd = new MouvementProduit()
            prd.idProduit = j.idProduit
            prd.nameProduit = j.nameProduit
            prd.lot = j.lot
            prd.quantity = j.quantiteDeSortie
            prd.reference = j.reference
            prd.idStock = j.id
            this.mvt.mouvementProduit.push(prd)
          }
        });
      });
    }
    console.log(this.mvt)
    // this.windowRef.close();
  }
}

