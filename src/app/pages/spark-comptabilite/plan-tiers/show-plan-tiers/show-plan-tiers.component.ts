import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { PlanTiersService } from '../plan-tiers.service';
import { Plan } from '../../plan-general/plan-general.service';

@Component({
  selector: 'ngx-show-plan-tiers',
  templateUrl: './show-plan-tiers.component.html',
  styleUrls: ['./show-plan-tiers.component.scss']
})
export class ShowPlanTiersComponent implements OnInit {
  planTiers = new Plan();

  constructor(private servicePlanTiers: PlanTiersService,
    private router: Router,  
    public windowRef: NbWindowRef, 
    private toastrService: NbToastrService) { }

  ngOnInit() {
    let idPlanTier = localStorage.getItem('idPlaTier');
    this.servicePlanTiers.getPlanTiersById(+idPlanTier).subscribe(
      data => {
        this.planTiers = data;
      }
    )
  }

}
