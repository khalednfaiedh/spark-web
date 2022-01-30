import { Component, OnInit, Inject } from '@angular/core';
import { UniteDeTransactionModel } from '../UniteDeTransaction.model';
import { NbToastrService, NbWindowRef, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { UniteDeTransactionService } from '../UniteDeTransaction.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-unite-transaction',
  templateUrl: './modal-unite-transaction.component.html',
  styleUrls: ['./modal-unite-transaction.component.scss']
})
export class ModalUniteTransactionComponent implements OnInit {
  message="Ajouter"
test:boolean=true;
	// Point("Point"),
	// Espace("Espace"),
	// Virgule("Virgule"),
	// Point_Virgule(" Point Virgule"),
  // Double_Point("Double Point");
  // <ng-option value="principal" > </ng-option>
  //               <ng-option vlaue="secondaire"> Sécondaire </ng-option>
	etats=[{id:"principal" , name:"Principal"} , {id:"secondaire" , name:"Sécondaire"}]
separateur=[{id:'Point' , name:"Point"}, {id:'Espace' , name:"Espace"}, {id:'Virgule' , name:"Virgule"}, 
{id:'Point_Virgule' , name:"Point Virgule"}, {id:'Double_Point' , name:"Double Point"}]
  unite= new  UniteDeTransactionModel()
etat=""
  constructor(   
     
    private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    public uniteTransactionservice:UniteDeTransactionService,
    @Inject(NB_WINDOW_CONTEXT) context,) 
    { 
     
      if(context.etat==="edit")
      {
        console.log(context.data)

        this.uniteTransactionservice.getUniteDeTransactionById(context.data.idT).subscribe(

          data=>{this.unite =data}
        )
      
        this.message="Modfier"
       
        this.etat="edit"
      }

      if(context.etat==="show")
      {
        console.log(context.data)
        this.uniteTransactionservice.getUniteDeTransactionById(context.data.idT).subscribe(

          data=>{this.unite =data}
        )
        
      }

      if(context.etat==="add")
      {
        this.message="Ajouter"
        this.etat="add"
      }
    }


  ngOnInit() {

  }

  add()
  {
    let id = localStorage.getItem('current_entreprise')
console.log(this.etat)
    if(this.etat==="add")
    {
      this.uniteTransactionservice.addUniteDeTransaction(this.unite,+id) .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "     Unitée  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/admin/unite-de-transaction"]));
        },
        err=>{console.log('errr');
        this.test=false;
      }
      )
    }

    if(this.etat==="edit")
    {
      this.uniteTransactionservice.updateUniteDeTransaction(this.unite,+id)  .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "    Unitée  est  Modfier avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/admin/unite-de-transaction"]));
        
        },
        err=>{console.log('errr') 
        this.test=false;
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
