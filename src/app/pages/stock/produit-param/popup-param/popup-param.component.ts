import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ProductMinModel } from '../../../admin/product/product.model';
import { ProductService } from '../../../admin/product/product.service';
import { MagasinService } from '../../magasin/services/magasin.service';
import { ProduitParamService } from '../produit-param.service';
import { ProduitParam } from '../produitParamModel';

@Component({
  selector: 'ngx-popup-param',
  templateUrl: './popup-param.component.html',
  styleUrls: ['./popup-param.component.scss']
})
export class PopupParamComponent implements OnInit {
  produit : ProduitParam = new ProduitParam()
  btn : string = "Initialiser"
  produits : ProductMinModel[] = []
  produitSelected : ProductMinModel
  disabelLot : boolean = true
  e : any
  prd: ProductMinModel;

  magasins: any;
  thousands=' '
  decimal =','
  precision = 3
  constructor(private produitService : ProductService,
    private produitParamService: ProduitParamService,
    private router : Router,
    private windowRef : NbWindowRef,
    private magasinService : MagasinService,
    @Inject(NB_WINDOW_CONTEXT) context) {
      if(context.produit){
        console.warn('we have product')
        this.produit = context.produit
      }
    }

  ngOnInit() {

    this.magasinService.getAllMagasin().subscribe(
      data => {this.magasins = data}) 


    if (this.e === '1' || this.e === '2' ) {
      this.produit.prixUnit = 0
    this.produitService.getAllproductMin().subscribe(
      data => {this.produits = data},
      err => {console.log(err)})
    }
    if (this.e === '0') {
      this.btn  = "Modifier"
      this.produitService.getAllproductMinNotInisialised().subscribe(
        data => {this.produits = data},
        err => {console.log(err)})
    }
  }
  save(){
    if (this.e === '1') {
      this.produit.idE = +localStorage.getItem('current_entreprise')
      console.log("prd",this.prd)
      this.produit.item = this.prd.item;
      this.produit.idProduct = this.prd.idProduct
      this.produitParamService.save(this.produit).subscribe(
        data => {this.produit = data
          this.produitService.patch(this.produit.idProduct,true).subscribe(
            data =>{console.log('update produit réusite')},
            err => {console.log(err)
            return false })
          this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["/pages/stock/produit"]));
           this.windowRef.close();    },
           err => {console.log(err)})

    }else if (this.e === '0'){
      if(this.prd){
        this.produit.item = this.prd.item;
        this.produit.idProduct = this.prd.idProduct
      }
      this.produitParamService.update(this.produit).subscribe(
        data => {this.produit = data
          this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["/pages/stock/produit"]));
        this.windowRef.close();    },
        err => {console.log(err)}
      )
    }
  }
  onChange(idProduit){ 
    let id = this.produit.id
    this.produit = new ProduitParam()
    this.produit.id = id
    this.produit.lot ='Sans N° lot'
    this.disabelLot=true
     this.prd = this.produits.find(x => x.idProduct === idProduit);
    console.log(this.prd)
      if(this.prd){
        if(this.prd.lot == 'Oui'){
          this.disabelLot = false
          this.produit.lot =''
        }
      }
  }
  close(){
    console.log(this.produit)
  }

}
