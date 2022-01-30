import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { Magasin } from '../../magasin/magasin.model';
import { MagasinService } from '../../magasin/services/magasin.service';
import { Mouvement, MouvementProduit } from '../../mouvement/mouvement';
import { StockEtatService } from '../../services/etatDeStock.service';
import { MvtService } from '../../services/mouvementService';

@Component({
  selector: 'ngx-transfert-popup',
  templateUrl: './transfert-popup.component.html',
  styleUrls: ['./transfert-popup.component.scss']
})
export class TransfertPopupComponent implements OnInit {
  magasins: Magasin[];
  produit: any ;
  mvt: Mouvement = new Mouvement();
  pipe : string = '0.3-3'

  constructor(private magasinService: MagasinService,
    private stockService : StockEtatService,
    private mvtService : MvtService,
    private windowService : NbWindowRef,
    private router : Router) { }

  ngOnInit() {
    this.magasinService.getAllMagasin().subscribe(
      data => {
        this.magasins = data
        this.magasins =  this.magasins.filter(p => p.idMagasin !== this.produit.idMagasin)
      },
      err =>{console.log(err)}
    ) 
  }
update(){
  this.mvt.mouvementProduit = []
  let mvtP = new MouvementProduit()
  mvtP.idProduit = this.produit.idProduit
  mvtP.reference = this.produit.reference
  mvtP.nameProduit = this.produit.nameProduit
  mvtP.quantity = this.produit.quantity
  mvtP.lot = this.produit.lot
  this.mvt.mouvementProduit.push(mvtP)
  this.mvt.typeMvt = "2"
 // this.mvt.natureMvt= "1"
  this.mvt.idSource = this.produit.idMagasin



  this.stockService.save(this.produit).subscribe(
    data =>{ console.log('success 0')
     },
    err =>{console.log('err 1')}
  )

  this.mvtService.addMouvement(this.mvt).subscribe(
    data =>{
      console.log('success 1')
      this.router.navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(["/pages/stock/transfert"]));
      this.windowService.close();
    },
    err =>{ console.error('err 1');
    }
    
  )
}
close(){
  //this.windowService.close()
  this.mvt.mouvementProduit = []
  let mvtP = new MouvementProduit()
  mvtP.idProduit = this.produit.idProduit
  mvtP.nameProduit = this.produit.nameProduit
  mvtP.quantity = this.produit.quantity
  mvtP.lot = this.produit.lot
  this.mvt.mouvementProduit.push(mvtP)
  this.mvt.typeMvt = "2"
 // this.mvt.natureMvt= "1"
  this.mvt.idSource = this.produit.idMagasin
  
  
  console.log(this.mvt)
  console.log(this.produit)
  // console.log(this.magasins)
}
}
