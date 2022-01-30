import { Component, OnInit, Inject } from '@angular/core';
import { GammeOperatoire } from '../gammeOperatoire';
import { ProductService } from '../../../admin/product/product.service';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { ProductModel } from '../../../admin/product/product.model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { GammeOperatoireService } from '../gamme-operatoire.service';

@Component({
  selector: 'ngx-modal-gamme-operatoire',
  templateUrl: './modal-gamme-operatoire.component.html',
  styleUrls: ['./modal-gamme-operatoire.component.scss']
})
export class ModalGammeOperatoireComponent implements OnInit {
message="ajouter";
produits: ProductModel[];
gamme=new GammeOperatoire()
produit:ProductModel;
 
modes=["Temps Unitaire","Seconde" , "Minute" , "Heure"]
types=[{id:"FABRICATION", name:"FABRICATION"},{id:"ASSEMBLAGE" , name:"ASSEMBLAGE"} ]
status=[ {id:"SECONDAIRE" , name:"PRINCIPALE"}  , {id:"SECONDAIRE" , name:"SECONDAIRE"}]
etat=""
validReference:boolean=true;
  constructor(  private produitService: ProductService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private router: Router,
    private gammeService:GammeOperatoireService,
    @Inject(NB_WINDOW_CONTEXT) context) 
    { 
      
      if(context.etat==="edit")
      {
        this.etat="edit"
         this.gammeService.getGammeOperatoireById(context.data.id).subscribe(

          data=>{ this.gamme=data 
            console.log(this.gamme,"ok")
          this.produitService.getProductById(this.gamme.idProduit).subscribe(

            data=>{this.produit=data}
          )
          
          },
          er=>{}

         )
      }

      if(context.etat==="show")
      {
        this.gammeService.getGammeOperatoireById(context.data.id).subscribe(

          data=>{ this.gamme=data 
            console.log(this.gamme,"ok")
            this.produitService.getProductById(this.gamme.idProduit).subscribe(

              data=>{this.produit=data}
            )
            },
          er=>{}

         )
      }

      if(context.etat==="add")
      {
        this.message="Ajouter"
        this.etat="add"
      }
    } 

  ngOnInit() {

    let id= localStorage.getItem('current_entreprise')
    this.produitService.getAllproduct(+id).subscribe(
      data => { this.produits = data }
    )

  }


  save()
  {
    console.log(this.gamme)
    console.log(this.produit)
    let id= localStorage.getItem('current_entreprise')
      this.gamme.idProduit=this.produit.idProduct,
    this.etat==="add"
    {
      this.gammeService.addGammeOperatoire(+id,this.gamme) .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "Gamme Opératoire  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/gammesOperatoire"]));
        },
        err=>{

          if (err.error.code === "GAMME_EXISTE") {
             this.validReference=false;
          }
         
      }
      )
    }

    this.etat==="show"
    {
      this.gammeService.updateGammeOperatoire (+id,this.gamme) .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "Gamme Opératoire  est  Modfiée avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/gammesOperatoire"]));
        },
        err=>{

          if (err.error.code === "GAMME_EXISTE") {
             this.validReference=false;
          }
         
      }
      )
    }


  }


  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 20000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  onclose() {
    this.windowRef.close();
  }

}
