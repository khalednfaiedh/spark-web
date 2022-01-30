import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { Produit } from '../../../entities/full/produit';
import { ProduitService } from '../../../services/produit.service';

@Component({
  selector: 'ngx-ppopup',
  templateUrl: './ppopup.component.html',
  styleUrls: ['./ppopup.component.scss']
})
export class PpopupComponent implements OnInit {
  produit: Produit = new Produit()
  produits: Produit[]
  btn: string = 'Ajouter'
  produitSelected: Produit;
  leadID : Number
  constructor(protected produitService: ProduitService,
    protected router: Router,
    protected windowRef: NbWindowRef,
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.leadID = context.idAffaire
    if (context.produit) {
      this.produit = context.produit
      this.btn = 'Modifier'
      this.produitSelected = context.produit
    }
  }
  changeProduit(produit) {
    this.produit.designation = produit.designation
    this.produit.code = produit.code
    this.produit.prixPropose = produit.prixPropose
    this.produit.quantityStock = produit.quantityStock
  }
  ngOnInit() {
    this.produitService.getProducts().subscribe(
      data => { this.produits = data },
      error => { console.log('error') }
    )
  }
  add(){
    this.produit.leadID = this.leadID
    console.log(this.produit)
    this.produitService.saveProduct(this.produit).subscribe(
      data => {
        this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/pages/crm/affaire/edit",this.leadID]));
      this.windowRef.close();
      },
      error => {}
    )
  }
  close(){
  this.windowRef.close()
  }
}
