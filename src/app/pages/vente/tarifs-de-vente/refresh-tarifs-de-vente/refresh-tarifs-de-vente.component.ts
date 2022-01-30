import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarifsDeVenteComponent } from '../tarifs-de-vente.component';

@Component({
  selector: 'ngx-refresh-tarifs-de-vente',
  templateUrl: './refresh-tarifs-de-vente.component.html',
  styleUrls: ['./refresh-tarifs-de-vente.component.scss']
})
export class RefreshTarifsDeVenteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([TarifsDeVenteComponent.urlTarifsDeVente]);
  }

}
