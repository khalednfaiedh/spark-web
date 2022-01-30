import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FournisseurComponent } from '../fournisseur.component';

@Component({
  selector: 'ngx-refresh-fournisseur',
  templateUrl: './refresh-fournisseur.component.html',
  styleUrls: ['./refresh-fournisseur.component.scss'],
})
export class RefreshFournisseurComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([FournisseurComponent.urlFournisseur]);
  }
}
