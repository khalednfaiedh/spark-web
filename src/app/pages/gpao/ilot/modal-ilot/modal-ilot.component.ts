import { Component, OnInit, Inject } from '@angular/core';
import { Ilot } from '../ilot';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { IlotService } from '../ilot.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbToastrService, NbWindowRef, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';

@Component({
  selector: 'ngx-modal-ilot',
  templateUrl: './modal-ilot.component.html',
  styleUrls: ['./modal-ilot.component.scss']
})
export class ModalIlotComponent implements OnInit {
message="Ajouter"
  ilot = new Ilot()
  employees=[]
  etat=""
  id:number;
  constructor(  private employeeService:EmployeListService,
    private ilotService:IlotService,
     
    private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    
    @Inject(NB_WINDOW_CONTEXT) context,) 
    { 
      this.id= context.id;
      this.ilot.idAtelier=this.id;
      if(context.etat==="edit")
      {
        console.log(context.data)
        this.ilot=context.data
        this.message="Modfier"
        this.ilot.dateCreation =  new Date(context.data.dateCreation);
        this.etat="edit"
      }

      if(context.etat==="show")
      {
        console.log(context.data)
        this.ilot=context.data
        
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
    if(this.ilot.chef != null)
    {
 this.ilot.idChef= this.ilot.chef.matricule;
    }
    else
    {
      this.ilot.idChef =null;
    }
console.log(this.ilot)
    if(this.etat==="add")
    {
      this.ilotService.addIlot(this.ilot).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   Ilot  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/ilots",this.id]));
        },
        err=>{console.log('errr');
        this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  existe déja     ")
      }
      )
    }

    if(this.etat==="edit")
    {
      this.ilotService.updateIlot(this.ilot).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   Ilot  est  Modfier avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/ilots",this.id]));
        },
        err=>{console.log('errr'); this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  existe déja     ")}
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
