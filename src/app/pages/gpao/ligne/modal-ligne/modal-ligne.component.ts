import { Component, OnInit, Inject } from '@angular/core';
import { Ligne } from '../ligne';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { LigneService } from '../ligne.service';
import { NbToastrService, NbWindowRef, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-ligne',
  templateUrl: './modal-ligne.component.html',
  styleUrls: ['./modal-ligne.component.scss']
})
export class ModalLigneComponent implements OnInit {

  message="Ajouter"
   ligne = new  Ligne()
  employees=[]
  etat=""
  id:number;
  constructor(  private employeeService:EmployeListService,
    private  ligneService: LigneService,
     
    private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    
    @Inject(NB_WINDOW_CONTEXT) context,) 
    { 
      this.id= context.id;
      this.ligne.idAtelier=this.id;
      if(context.etat==="edit")
      {
        console.log(context.data)
        this.ligne=context.data
        this.message="Modfier"
        this.ligne.dateCreation =  new Date(context.data.dateCreation);
        this.etat="edit"
      }

      if(context.etat==="show")
      {
        console.log(context.data)
        this.ligne=context.data
        
      }

      if(context.etat==="add")
      {
        this.message="Ajouter"
        this.etat="add"
      }
    }

  ngOnInit() {

    let id = localStorage.getItem('current_entreprise')
     


    this.employeeService.getAllEmployees2(+id).subscribe(
      data=>{this.employees=data;console.log(data)},
      err=>{console.log('err employee')}
    )
  }



  add()
  {
    if(this.ligne.chef != null)
    {
 this.ligne.idChef= this.ligne.chef.matricule;
    }
    else
    {
      this.ligne.idChef =null;
    }
console.log(this.ligne)
    if(this.etat==="add")
    {
      this.ligneService.addLigne(this.id,this.ligne).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "    Ligne  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/lignes",this.id]));
        },
        err=>{console.log('errr');
        this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  Poste du Charge    existe déja     ")}
      )
    }

    if(this.etat==="edit")
    {
      this.ligneService.updateLigne(this.id,this.ligne).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "    ligne  est  Modfier avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/lignes",this.id]));
        },
        err=>{console.log('errr');
         this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  existe déja     ")}
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
