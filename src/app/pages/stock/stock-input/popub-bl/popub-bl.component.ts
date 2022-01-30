import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { BonDeLivraisonAchatService } from '../../../achat/bon-de-livraison-achat/bon-de-livraison-achat.service';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { MagasinService } from '../../magasin/services/magasin.service';
import { Mouvement } from '../../mouvement/mouvement';
import { MvtService } from '../../services/mouvementService';

@Component({
  selector: 'ngx-popub-bl',
  templateUrl: './popub-bl.component.html',
  styleUrls: ['./popub-bl.component.scss']
})
export class PopubBlComponent implements OnInit {
  bl: any = [];
  magasins: any;
  fournisseur: any = [];
  produits: any = [] ;
  btn: String = "Entree en stock"
  mvt : Mouvement 
  show: boolean;
  show2: boolean;

  constructor(private magasinService : MagasinService,
    private fournisseurService : FournisseurService,
    private mvtService : MvtService,
    private router: Router,
    private windowRef: NbWindowRef,
    private blService : BonDeLivraisonAchatService,
     @Inject(NB_WINDOW_CONTEXT) context) {
    context.show ? this.show = true : this.show = false
    context.show2 ? this.show2 =  true : this.show2 = false
      if (context.data) {
        if (context.edit) {
          this.btn = 'Modifier'
          this.mvt =   context.data
          this.mvt.dateOperation ? this.mvt.dateOperation = new Date(this.mvt.dateOperation): ""
          this.mvt.datePreemption ? this.mvt.datePreemption = new Date(this.mvt.datePreemption): ""
          this.produits = this.mvt.mouvementProduit
          console.log('edit')
          this.blService.getBonDeLivraisonAchatById(this.mvt.idSource).subscribe(
            data => {this.bl = data
              if (this.bl.idFournisseur) {
                this.fournisseurService.getFournisseurById(this.bl.idFournisseur).subscribe(
                  data => {this.fournisseur = data,console.log(data)})
              } })
        } else {
          this.mvt = new Mouvement()
          this.bl = context.data
          this.mvt.idMagasin = this.bl.idMagasin
          this.produits = this.bl.detailBonDeLivraisons   
          if (this.bl.idFournisseur) {
            this.fournisseurService.getFournisseurById(this.bl.idFournisseur).subscribe(
              data => {this.fournisseur = data,console.log(data)})
          } 
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
      this.mvt.natureMvt= "1"
   //   this.mvt.idMagasin = this.bl.idMagasin
      this.mvt.idSource = this.bl.id
      this.mvtService.addMouvement(this.mvt).subscribe(
        data => {
         console.log('success save mvt')
        },
        err => {console.log(err)},
      )
      // this.blService.patchBonDeLivraisonAchats(this.mvt.idSource).subscribe(
      //   data => {  console.log('success update statut bl')
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
