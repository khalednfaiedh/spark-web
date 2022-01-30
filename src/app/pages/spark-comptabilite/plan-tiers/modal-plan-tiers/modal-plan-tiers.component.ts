import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Plan, PlanGeneralService } from '../../plan-general/plan-general.service';
import { PlanTiersService } from '../plan-tiers.service';
import { NbWindowRef, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { TostarService } from '../../tostar/tostar.service';

@Component({
  selector: 'ngx-modal-plan-tiers',
  templateUrl: './modal-plan-tiers.component.html',
  styleUrls: ['./modal-plan-tiers.component.scss']
})
export class ModalPlanTiersComponent implements OnInit {
  planTiers = new Plan();
  valider = "Ajouter";
  planGenerals=[];
  types=["Autre","Client","Fournisseur","Salarie"]
  
  //tost
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus 
  title: string;
  content = `  `;
  
  constructor(private servicePlanTiers: PlanTiersService,
              private router: Router,  
              public windowRef: NbWindowRef, 
              private toastrService: NbToastrService,
              private PlanGeneralService:PlanGeneralService ,
              private tostarService:TostarService) { }

  ngOnInit() {
    let e = localStorage.getItem("e");
    if (e == '1') {
      let idPlanTier = localStorage.getItem('idPlaTier');
      this.valider = "Modifier";
      this.servicePlanTiers.getPlanTiersById(+idPlanTier).subscribe(
        data => {
          this.planTiers = data;
        }
      )
    }
    this.PlanGeneralService.getAllPlanGeneral().subscribe(
      data=>{this.planGenerals=data;},
      error=>{console.log('error get all plan general')}
    )
  }
  addPlanTiers() {
    let e = localStorage.getItem("e");
    let e2=localStorage.getItem('indexEcriture');
    localStorage.removeItem('indexEcriture');
    if (e == '0') {//add


      console.log(this.planTiers)

      this.servicePlanTiers.addPlanTiers(this.planTiers).subscribe(
        data => {
        this.planTiers = data;
        this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','   COMPTE ajouté avec succès!')
        this.windowRef.close();
        if(e2!='indexEcriture')
        {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/comptabilite/planTiers"]));
        }
        },
        error => {
          console.log(error);
          this.tostarService.showToast(NbToastStatus.DANGER,'INTERDICTION','Type ne correspond pas à la nature de compte Géneral !')
        }
      );
    }
    if (e == '1') {

      this.servicePlanTiers.updatePlanTiers(this.planTiers).subscribe(
        data => {
        this.planTiers = data

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/comptabilite/planTiers"]));
          this.windowRef.close();
          this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','   COMPTE  update avec succès!')
        },
        error => {
          console.log(error);
          this.tostarService.showToast(NbToastStatus.DANGER,'INTERDICTION','Type ne correspond pas à la nature de compte Géneral !')
        }
      );
    }

   
  }

  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';


    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }


  onclose() {
    this.windowRef.close();
  }
}
