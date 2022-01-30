import { Component, OnInit, Inject } from '@angular/core';
import { Section } from '../section';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { LigneService } from '../../ligne/ligne.service';
import { NbToastrService, NbWindowRef, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { SectionService } from '../section.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-section',
  templateUrl: './modal-section.component.html',
  styleUrls: ['./modal-section.component.scss']
})
export class ModalSectionComponent implements OnInit {

  message=""
    section = new   Section()
  employees=[]
  etat=""
  id:number;
  constructor(  private employeeService:EmployeListService,
    private sectionService:SectionService,
     
    private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    
    @Inject(NB_WINDOW_CONTEXT) context,) 
    { 
      this.id= context.id;
      this.section.idAtelier=this.id;
      if(context.etat==="edit")
      {
        console.log(context.data)
        this.section=context.data
        this.message="Modfier"
        this.section.dateCreation =  new Date(context.data.dateCreation);
        this.etat="edit"
      }

      if(context.etat==="show")
      {
        console.log(context.data)
        this.section=context.data
        
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
    if(this.section.chef != null)
    {
 this.section.idChef= this.section.chef.matricule;
    }
    else
    {
      this.section.idChef =null;
    }
console.log(this.section)
    if(this.etat==="add")
    {
      this.sectionService.addSection(this.id,this.section).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "     section  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/sections",this.id]));
        },
        err=>{console.log('errr') ; this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  existe déja     ")}
      )
    }

    if(this.etat==="edit")
    {
      this.sectionService.updateSection(this.id,this.section).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "     section  est  Modfier avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/sections",this.id]));
        },
        err=>{console.log('errr') ;  this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  existe déja     ") }
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
