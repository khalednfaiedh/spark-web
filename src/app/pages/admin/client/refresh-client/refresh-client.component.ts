import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ClientComponent } from '../client.component';

@Component({
  selector: 'ngx-refresh-client',
  templateUrl: './refresh-client.component.html',
  styleUrls: ['./refresh-client.component.scss'],
})
export class RefreshClientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([ClientComponent.urlClient]);
  }

}
