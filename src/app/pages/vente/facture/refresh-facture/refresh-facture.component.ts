import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureComponent } from '../facture.component';

@Component({
  selector: 'ngx-refresh-facture',
  templateUrl: './refresh-facture.component.html',
  styleUrls: ['./refresh-facture.component.scss']
})
export class RefreshFactureComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([FactureComponent.urlFacture]);
  }

}
