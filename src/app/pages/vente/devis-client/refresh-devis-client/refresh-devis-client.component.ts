import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisClientComponent } from '../devis-client.component';

@Component({
  selector: 'ngx-refresh-devis-client',
  templateUrl: './refresh-devis-client.component.html',
  styleUrls: ['./refresh-devis-client.component.scss']
})
export class RefreshDevisClientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([DevisClientComponent.urlDevisClient]);
  }

}
