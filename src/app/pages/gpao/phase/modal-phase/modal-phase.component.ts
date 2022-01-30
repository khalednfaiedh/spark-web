import { Component, OnInit, Inject } from '@angular/core';
import { Phase } from '../phase';
import { GammeOperatoireService } from '../../gamme-operatoire/gamme-operatoire.service';
import { GammeOperatoire } from '../../gamme-operatoire/gammeOperatoire';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { PhaseService } from '../phase.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-phase',
  templateUrl: './modal-phase.component.html',
  styleUrls: ['./modal-phase.component.scss']
})
export class ModalPhaseComponent implements OnInit {
message="ajouter"
phase= new Phase()
gammes:GammeOperatoire[]=[];
etat=""
validReference:boolean=true
constructor(  
  public windowRef: NbWindowRef,
  private toastrService: NbToastrService,
  private router: Router,
  private gammeOperatoireService:GammeOperatoireService,
  private phaseService:PhaseService,
  @Inject(NB_WINDOW_CONTEXT) context) 
  { 
    
    if(context.etat==="edit")
    {
      this.etat="edit"


      this.phaseService.getPhaseId(context.data.id).subscribe(

        data=>{this.phase=data}
      )
        
    }

    if(context.etat==="show")
    {
      this.phaseService.getPhaseId(context.data.id).subscribe(

        data=>{this.phase=data}
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
    
    this.gammeOperatoireService.getAllGammeOperatoireByEntreprise(+id).subscribe(
      data=>{this.gammes=data;console.log(data)}
    )
  }

  save()
  {
     
    let id= localStorage.getItem('current_entreprise')
       
    this.etat==="add"
    {
      this.phaseService.addPhase (this.phase.gammeOperatoire.id, this.phase) .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   Phase  est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/phase"]));
        },
        err=>{

          if (err.error.code === "PHASE_EXISTE") {
             this.validReference=false;
          }
         
      }
      )
    }

    this.etat==="edit"
    {
      this.phaseService.updatePhase(this.phase.gammeOperatoire.id, this.phase) .subscribe(

        data=>{
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   Phase  est  Modfiée avec succéss")
        this.windowRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gpao/phase"]));
        },
        err=>{

          if (err.error.code === "PHASE_EXISTE") {
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
