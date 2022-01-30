import { Component, OnInit } from '@angular/core';
import { PlanTiersService } from '../../plan-tiers/plan-tiers.service';
import { Plan, PlanGeneralService } from '../../plan-general/plan-general.service';

@Component({
  selector: 'ngx-equilibr-ecriture',
  templateUrl: './equilibr-ecriture.component.html',
  styleUrls: ['./equilibr-ecriture.component.scss']
})
export class EquilibrEcritureComponent implements OnInit {
equilibre = new EquilibreEcriture();
plans=[];
  constructor( private  PlanGeneralService:PlanGeneralService) { }

  ngOnInit() {
    let id=localStorage.getItem('idExerciceRAN');
    let numberClasse=localStorage.getItem('numberClass')

       localStorage.removeItem('idExerciceRAN')
          localStorage.removeItem('numberClass')
    console.log(numberClasse)
    console.log(id)

    this.PlanGeneralService.getAllPlanGeneralAndTiers().subscribe(
      data=>{this.plans=data;},
      error=>{console.log("data error get comptes")}
    )
  }

}

export  class EquilibreEcriture {

  plan: Plan;
  montant:number;
  

}