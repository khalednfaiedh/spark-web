import { Component, OnInit, Inject } from '@angular/core';
import { Atelier } from '../atelier';
import { Site } from '../../entreprise/site/site';
import { SiteService } from '../../entreprise/site/site.service';
import { EmployeListService } from '../../employe-list/employe-list.service';
import { NbToastrService, NbWindowRef, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { AtelierService } from '../atelier.service';
import { EmployeMinModel } from '../../employe-list/employe-list.model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { RegimeHoraireeService } from '../../../rh-parametrage/regime-horaire/regimeHoraire.service';
import { RegimeHoraireModel } from '../../../rh-parametrage/regime-horaire/regimeHoraire.model';
 

@Component({
  selector: 'ngx-modal-atelier',
  templateUrl: './modal-atelier.component.html',
  styleUrls: ['./modal-atelier.component.scss']
})
export class ModalAtelierComponent implements OnInit {
atelier =  new Atelier()
disabled:boolean=false
message=""
sites:Site[];
etat=""

regime : RegimeHoraireModel
 regimes : RegimeHoraireModel []=[];
employees
  constructor(private  siteService:SiteService,
    private employeeService:EmployeListService,
    private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private atelierService:AtelierService,
    private regimeService:RegimeHoraireeService,
    @Inject(NB_WINDOW_CONTEXT) context,) 
    {


      if(context.etat==="edit")
      {
        console.log(context.data)
        this.atelier=context.data
        this.message="Modfier"
        this.atelier.dateCreation =  new Date(context.data.dateCreation);
        this.etat="edit"

        this.regimeService.getRegimeById(this.atelier.idRegime).subscribe(
          data=>{this.regime =data}
        )
      }

      if(context.etat==="show")
      {
        console.log(context.data)
        this.atelier=context.data
        this.regimeService.getRegimeById(this.atelier.idRegime).subscribe(
          data=>{this.regime =data}
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


    this.regimeService.getAllRegimes().subscribe(
      data=>{this.regimes=data}
    )
    this.siteService.getAllSiteByEntreprise(id).subscribe(

      data=>{this.sites=data}
    )


    this.employeeService.getAllEmployees2(+id).subscribe(
      data=>{this.employees=data;console.log(data)},
      err=>{console.log('err employee')}
    )
  }


  add()
  {


    this.atelier.idRegime=this.regime.idRegime;
    if(this.etat==="add")
    {
      this.atelierService.addAtelier(this.atelier.site.id,this.atelier).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "  Atelier  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/admin/atelier"]) );
        },
        err=>{console.log('errr') ; this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  existe déja     ")}
      )
    }

    if(this.etat==="edit")
    {
      this.atelierService.updateAtelier (this.atelier).subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "  Atelier  est  Modfier avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/admin/atelier"]));
        },
        err=>{console.log('errr') ; this.showToast(NbToastStatus.DANGER , "DANGER", "    Réference  existe déja     ")}
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
