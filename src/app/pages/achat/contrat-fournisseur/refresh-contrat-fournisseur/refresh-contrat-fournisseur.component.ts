import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContratFournisseurComponent } from '../contrat-fournisseur.component';

@Component({
  selector: 'ngx-refresh-contrat-fournisseur',
  templateUrl: './refresh-contrat-fournisseur.component.html',
  styleUrls: ['./refresh-contrat-fournisseur.component.scss']
})
export class RefreshContratFournisseurComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([ContratFournisseurComponent.urlContratFournisseur]);
  }

}
