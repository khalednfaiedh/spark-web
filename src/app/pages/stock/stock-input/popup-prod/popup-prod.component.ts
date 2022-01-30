import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { BonDeLivraisonProd } from '../../../gpao/bon-livraison-prod/BonLivraisonProd.model';
import { BonLivraisonProdService } from '../../../gpao/bon-livraison-prod/bonLivraisonProd.service';
import { MagasinService } from '../../magasin/services/magasin.service';
import { Mouvement } from '../../mouvement/mouvement';
import { MvtService } from '../../services/mouvementService';

@Component({
  selector: 'ngx-popup-prod',
  templateUrl: './popup-prod.component.html',
  styleUrls: ['./popup-prod.component.scss']
})
export class PopupProdComponent implements OnInit {

  bl: BonDeLivraisonProd = new BonDeLivraisonProd();
  magasins: any;
  produits: any = [] ;
  btn: String = "Entree en stock"
  mvt : Mouvement 
  show: boolean;
  show2: boolean;

  constructor(private magasinService : MagasinService,
    private mvtService : MvtService,
    private router: Router,
    private windowRef: NbWindowRef,
    private blProdService : BonLivraisonProdService,
     @Inject(NB_WINDOW_CONTEXT) context) {
    context.show ? this.show = true : this.show = false
    context.show2 ? this.show2 =  true : this.show2 = false
      if (context.data) {
        if (context.edit) {
          this.btn = 'Modifier'
          this.mvt =   context.data
          this.mvt.dateOperation = new Date(context.data.dateOperation);
          this.mvt.datePreemption = new Date(context.data.datePreemption);
          this.produits = this.mvt.mouvementProduit
          console.log('edit')
          this.blProdService.getOne(this.mvt.idSource).subscribe(
          data => {this.bl = data
            this.bl.stocker ?  this.bl.stocker = "Stocker" :  this.bl.stocker = "En attente" 
            this.bl.fini ?  this.bl.fini = "Produit fini" :  this.bl.fini = "Produit non fini" 
            this.bl.reserver ?  this.bl.reserver = "Oui" :  this.bl.reserver = "Non" 
          })
        } else {
          this.mvt = new Mouvement()
          this.bl = context.data
          this.bl.stocker ?  this.bl.stocker = "Stocker" :  this.bl.stocker = "En attente" 
          this.bl.fini ?  this.bl.fini = "Produit fini" :  this.bl.fini = "Produit non fini" 
          this.bl.reserver ?  this.bl.reserver = "Oui" :  this.bl.reserver = "Non" 

          this.produits = this.bl.produit   
      
        }           
   } 
  }

  ngOnInit() {
     this.magasinService.getAllMagasin().subscribe(
        data => {this.magasins = data})       
  }
  save(){
    if (this.mvt.id) {
      console.log('update')
      console.log(this.mvt)
      this.mvtService.updateMouvement(this.mvt).subscribe(
        data => { 
             this.router.navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/stock/entrees"]));
            this.windowRef.close();},
        err => {console.log(err)}
      )
    } else {
      this.mvt.mouvementProduit = this.produits
      this.mvt.typeMvt = "0"
      this.mvt.natureMvt= "0"
      this.mvt.idSource = this.bl.id
      this.mvtService.addMouvement(this.mvt).subscribe(
        data => {
          console.log("mouvement enregister avec success")
        },
        err => {console.log(err)},
      )
      // j'ai annuler ce server pour faaciliter le test 

      // this.blProdService.patch(this.mvt.idSource,true).subscribe(
      //   data => {console.log("bon de livraison stocker avec success")
        this.router.navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/pages/stock/entrees"]));
       this.windowRef.close();
      // },
      // err => {console.log(err)},
      // )
    }
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
          add:false
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
