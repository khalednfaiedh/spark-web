import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandePrixClientComponent } from '../demande-prix-client.component';

@Component({
  selector: 'ngx-refresh-demande-prix-client',
  templateUrl: './refresh-demande-prix-client.component.html',
  styleUrls: ['./refresh-demande-prix-client.component.scss']
})
export class RefreshDemandePrixClientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([DemandePrixClientComponent.urlDemandePrixClient]);
  }

}
