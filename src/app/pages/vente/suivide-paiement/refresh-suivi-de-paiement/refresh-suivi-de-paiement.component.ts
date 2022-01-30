import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuividePaiementComponent } from '../suivide-paiement.component';

@Component({
  selector: 'ngx-refresh-suivi-de-paiement',
  templateUrl: './refresh-suivi-de-paiement.component.html',
  styleUrls: ['./refresh-suivi-de-paiement.component.scss']
})
export class RefreshSuiviDePaiementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([SuividePaiementComponent.urlSuiviPaiement]);
  }

}
