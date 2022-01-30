import { Component, OnInit } from '@angular/core';
import { Plan, PlanGeneralService } from '../plan-general.service';

@Component({
  selector: 'ngx-show-plan-general',
  templateUrl: './show-plan-general.component.html',
  styleUrls: ['./show-plan-general.component.scss']
})
export class ShowPlanGeneralComponent implements OnInit {
  planGeneral  = new Plan();
  constructor( private planGeneralService:PlanGeneralService) { }

  ngOnInit() {

    let idPlanGeneral = localStorage.getItem('idPlanGeneral');
    localStorage.removeItem('idPlanGeneral')
    this.planGeneralService.getPlanGeneralById(+idPlanGeneral).subscribe(
      data=>{this.planGeneral=data}
    )
  }

}
