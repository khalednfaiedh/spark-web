import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BonCommandeComponent } from '../bon-commande.component';

@Component({
  selector: 'ngx-refresh-bon-commande',
  templateUrl: './refresh-bon-commande.component.html',
  styleUrls: ['./refresh-bon-commande.component.scss']
})
export class RefreshBonCommandeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([BonCommandeComponent.urlBonCommande]);
  }

}
