import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeComponent } from '../commande.component';

@Component({
  selector: 'ngx-refresh-commande',
  templateUrl: './refresh-commande.component.html',
  styleUrls: ['./refresh-commande.component.scss']
})
export class RefreshCommandeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([CommandeComponent.urlCommande]);
  }
}
