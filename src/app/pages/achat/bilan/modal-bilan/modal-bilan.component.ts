import { Router } from '@angular/router';
import { BonCommandeService } from './../../bon-commande/services/bon-commande.service';
import { BilanService } from './../services/bilan.service';
import { NbWindowRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { DevisProduitAchatService } from '../../devis-achat/services/devis-produit-achat.service';
import { ProductService } from '../../../admin/product/product.service';
import { BilanComponent } from '../bilan.component';

@Component({
  selector: 'ngx-modal-bilan',
  templateUrl: './modal-bilan.component.html',
  styleUrls: ['./modal-bilan.component.scss']
})
export class ModalBilanComponent implements OnInit {

  id = localStorage.getItem('idRC');
  bilan: any = new Object();
  product: any = new Object()
  codeProducts: any[] = []
  refBC: String = new String()

  constructor(public windowRef: NbWindowRef, 
    private serviceBilan: BilanService, 
    private serviceP: ProductService,
    private serviceBC: BonCommandeService,
    private serviceDP: DevisProduitAchatService,
    private router: Router) { }

  ngOnInit() {
    this.serviceBC.getBonCommandeById(+this.id).subscribe(data => {
      this.bilan.idBC = (+this.id)
      this.refBC = "BC" + data.idBC
      for (let i = 0; i < data.montant.length; i++) {
        this.serviceDP.getDevisProduits(data.montant[i].idDevisP).subscribe(data1 => {
          this.codeProducts.push(data1.codeP)
        })

      }
    })
  }
  ajouter() {
    this.bilan.dateBilan = new Date()
    console.log(this.bilan)
    this.serviceBilan.addBilan(this.bilan).subscribe(data => {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      this.windowRef.close();
      this.router.navigate([BilanComponent.urlBilan]);
    })
  }
  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }

}