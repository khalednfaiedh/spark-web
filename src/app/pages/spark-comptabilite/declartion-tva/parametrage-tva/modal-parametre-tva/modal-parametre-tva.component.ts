import { Component, OnInit } from '@angular/core';
import { PlanGeneralService } from '../../../plan-general/plan-general.service';
import { ParametrageTvaService } from '../parametrage-tva.service';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { TostarService } from '../../../tostar/tostar.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Excercice, ExcerciceService } from '../../../excercice/excercice.service';

@Component({
  selector: 'ngx-modal-parametre-tva',
  templateUrl: './modal-parametre-tva.component.html',
  styleUrls: ['./modal-parametre-tva.component.scss']
})
export class ModalParametreTvaComponent implements OnInit {
plans=[]
submit=""
  tva = new PrametrageTvaModal();
  types=["IRPP" ,"Retunue_5%" ,"Retunue_15%","TFP","Fropolos" ,"Timbre","Vente_HT","Tcl_0.2%"]
  exercice= new Excercice()
  constructor(private planService: PlanGeneralService,
              private parametrageTvaService:ParametrageTvaService,
              private router: Router, 
              private windowRef: NbWindowRef,
              private tostarService:TostarService,
              private exerciceService:ExcerciceService) { }

  ngOnInit() {

    this.planService.getAllPlanGeneralAndTiers().subscribe(
      data=>{this.plans=data},
      error=>{console.log("error")}
    )

    let idEntreprise=localStorage.getItem('current_entreprise');
    this.tva.idEntreprise=idEntreprise;

    let e= localStorage.getItem('e')
    if(e=='1')
    {
    this.submit="Modfier"

    let id=localStorage.getItem('idParametre')
     localStorage.removeItem('idParametre')
    this.parametrageTvaService.getParametreById(+id).subscribe(
      data=>{
         this.tva=data;console.log(data)
         this.tva.plan.nameCode=this.tva.plan.codeCompte+":"+this.tva.plan.nameCompte
        
        },
      error=>{console.log('error')}
    )
  }

}

  addParametre()
{
let e=localStorage.getItem('e')
if(e =='0')
{
this.submit="Enregistrer"
  this.parametrageTvaService.addParametre(this.tva.plan.id,this.tva).subscribe(

    data=>{

      this.windowRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
     this.router.navigate(['/pages/comptabilite/parametreTVA']));
     this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','Votre compte parametrée avec success')
    },
    error=>{console.log("error"),
    this.tostarService.showToast(NbToastStatus.DANGER,'SUCCESS','Votre compte Déja  parametrée !!!')}
  )
  
}



else if(e =='1')
{
 
  this.submit="Modfier"
  this.parametrageTvaService.updateParametre(this.tva.plan.id,this.tva).subscribe(

    data=>{

      this.windowRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
     this.router.navigate(['/pages/parametreTVA']));
     this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','Votre compte parametrée avec success')
    },
    error=>{console.log("error");
    this.tostarService.showToast(NbToastStatus.DANGER,'SUCCESS','Votre compte Déja  parametrée !!!')}
  )
  
}


}

}



export class PrametrageTvaModal{

  plan:any;
  nature:any
  idEntreprise:any
  
}
 
