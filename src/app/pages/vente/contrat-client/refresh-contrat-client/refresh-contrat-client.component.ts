import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratClientComponent } from '../contrat-client.component';

@Component({
  selector: 'ngx-refresh-contrat-client',
  templateUrl: './refresh-contrat-client.component.html',
  styleUrls: ['./refresh-contrat-client.component.scss']
})
export class RefreshContratClientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([ContratClientComponent.urlContratClient]);
  }

}
