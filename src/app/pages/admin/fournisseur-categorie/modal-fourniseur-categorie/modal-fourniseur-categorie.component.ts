import { Component, OnInit, Inject } from '@angular/core';
import { FournisseurCategorie } from '../fournisseur-categorie.model';
import { FournisseurCategorieService } from '../fournisseur-categorie.service';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-fourniseur-categorie',
  templateUrl: './modal-fourniseur-categorie.component.html',
  styleUrls: ['./modal-fourniseur-categorie.component.scss']
})
export class ModalFourniseurCategorieComponent implements OnInit {
cat = new FournisseurCategorie() 
categories=[]
message="Ajouter"
etat=""
  constructor(private categorieFournisseurService: FournisseurCategorieService,
  public windowRef: NbWindowRef,
  private toastrService: NbToastrService,
  private router: Router,
    @Inject(NB_WINDOW_CONTEXT) context) 
  { 
    
    if(context.etat==="edit")
    {
      this.etat="edit"


      this.categorieFournisseurService.getById(context.data.id).subscribe(

        data=>{this.cat=data}
      )
        
    }

    if(context.etat==="show")
    {
      this.categorieFournisseurService.getById(context.data.id).subscribe(

        data=>{this.cat=data}
      )
      
    }

    if(context.etat==="add")
    {
      this.message="Ajouter"
      this.etat="add"
    }
  } 

  ngOnInit() {

   

    let id = localStorage.getItem('current_entreprise')
      this.categorieFournisseurService.getAll(+id).subscribe(
        data => { this.categories = data;  },
        error => { console.log(error); },
      );
    
  }

  save()
  {
    console.log(this.cat)
    let id= localStorage.getItem('current_entreprise')
       
  if( this.etat==="add" )
    {
      this.categorieFournisseurService.add  (+ id, this.cat) .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "    Catégorie Fournisseur  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/admin/fournisseur-categorie"]));
        },
        err=>{

          {
           
          }
         
      }
      )
    }

  if(  this.etat==="edit")
    {
      this.categorieFournisseurService.update  (+ id, this.cat) .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "    Catégorie Fournisseur   est  Modfiée avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/admin/fournisseur-categorie"]));
        },
        err=>{

        {
             
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
