import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BonDeLivraisonComponent } from '../bon-de-livraison.component';

@Component({
  selector: 'ngx-refresh-bon-de-livraison',
  templateUrl: './refresh-bon-de-livraison.component.html',
  styleUrls: ['./refresh-bon-de-livraison.component.scss']
})
export class RefreshBonDeLivraisonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([BonDeLivraisonComponent.urlBonLivraison]);
  }

}
