import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ClientService } from '../../../admin/client/client.service';
import { ReclamationService } from '../../../vente/facture/reclamation.service';
import { MagasinService } from '../../magasin/services/magasin.service';
import { Mouvement, MouvementProduit } from '../../mouvement/mouvement';
import { MvtService } from '../../services/mouvementService';

@Component({
  selector: 'ngx-popup-reclamation',
  templateUrl: './popup-reclamation.component.html',
  styleUrls: ['./popup-reclamation.component.scss']
})
export class PopupReclamationComponent implements OnInit {
  rec: any = [];
  magasins: any;
  produits: any = [];
  btn: String = "Entree en stock"
  mvt: Mouvement = new Mouvement()
  clients: any;
  show2: boolean;
  show: boolean;
  x: string = 'err'
  constructor(private magasinService: MagasinService,
    private clientservice: ClientService,
    private mvtService: MvtService,
    private router: Router,
    private windowRef: NbWindowRef,
    private recservice: ReclamationService,
    @Inject(NB_WINDOW_CONTEXT) context) {
    context.show ? this.show = true : this.show = false
    context.show2 ? this.show2 = true : this.show2 = false
    if (context.data) {
      if (context.edit) {
        this.btn = 'modifier'
        this.mvt = context.data
        this.mvt.dateOperation = new Date(this.mvt.dateOperation)
        this.mvt.datePreemption = new Date(this.mvt.datePreemption)
        this.produits = this.mvt.mouvementProduit
        this.recservice.getReclamationById(this.mvt.idSource).subscribe(
          data => { this.rec = data })
      } else {
        this.rec = context.data
        this.produits = this.rec.reclamationProduits
      }
    }
  }
  ngOnInit() {
    this.magasinService.getAllMagasin().subscribe(
      data => { this.magasins = data, console.log(data) })
    let idEntr = localStorage.getItem('current_entreprise')
    this.clientservice.getAllClient(+idEntr).subscribe(
      data => { this.clients = data }
    )
  }
  save() {
    if (this.mvt.id) {
      console.log('update')
      console.log(this.mvt)
      this.mvtService.updateMouvement(this.mvt).subscribe(
        data => {
          this.router.navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/stock/entrees"]));
          this.windowRef.close();
        },
        err => { console.log(err) }
      )
    } else {
      this.mvt.mouvementProduit = []
      for (let i = 0; i < this.produits.length; i++) {
        this.mvt.mouvementProduit[i] = new MouvementProduit()
        this.mvt.mouvementProduit[i].quantity = this.produits[i].quantite
        this.mvt.mouvementProduit[i].reference = this.produits[i].reference
        this.mvt.mouvementProduit[i].nameProduit = this.produits[i].nameProduit
        this.mvt.mouvementProduit[i].lot = this.produits[i].lot
        this.mvt.mouvementProduit[i].idProduit = this.produits[i].idProduit

        // this.mvt.mouvementProduit.push(this.mvt.mouvementProduit[i])
      }
      this.mvt.typeMvt = "0"
      this.mvt.natureMvt = "2"
      this.mvt.idSource = this.rec.id
      console.log(this.produits)
      console.log(this.mvt)
      this.mvtService.addMouvement(this.mvt).subscribe(
        data => {
          this.x = 'success'
          console.log('sucess add mvt')
        },
        err => { console.log(err) },
      )
      this.recservice.updateStatut(this.mvt.idSource).subscribe(
        data => {
          console.log(this.x)

          this.router.navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/stock/entrees"]));
          this.windowRef.close();
        },
        err => { console.log(err) },
      )
    }
  }


  settings = {
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
        editable: false
      },
      nameProduit: {
        title: "Désignation",
        type: "string",
        addable: false,
        editable: false
      },
      quantite: {
        title: "Quantité",
        type: "string",
        valuePrepareFunction(cell, row) {
          console.log("row", row)
          console.log(cell)
          let result
          row.quantite ? result = row.quantite : result = row.quantity
          return result
        }
      },
      lot:{ title: "N°lot",
          type: "string",}
    }
  };

  close() {
   this.windowRef.close();
  }
  onSaveConfirm(event): any {
    event.confirm.resolve(event.newData)
  }
}

