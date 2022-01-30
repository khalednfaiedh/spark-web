import { Component, OnInit } from '@angular/core';
import { ConditionDePaiementService } from '../condition-de-paiement.service';
import { ThrowStmt } from '@angular/compiler';
import { ConditionDePaiementModel } from '../condition-de-paiement-model';

@Component({
  selector: 'ngx-show-condition-de-paiement',
  templateUrl: './show-condition-de-paiement.component.html',
  styleUrls: ['./show-condition-de-paiement.component.scss']
})
export class ShowConditionDePaiementComponent implements OnInit {
  condition: ConditionDePaiementModel = new ConditionDePaiementModel()

  constructor(private serviceCP: ConditionDePaiementService) { }

  ngOnInit() {
    let idCP = localStorage.getItem('idCP')
    this.serviceCP.getConditionById(+idCP).subscribe(data => {
      this.condition = data

    })
  }

}
