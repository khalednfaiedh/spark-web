import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DevisAchatComponent } from '../devis-achat.component';

@Component({
  selector: 'ngx-refresh-devis-achat',
  templateUrl: './refresh-devis-achat.component.html',
  styleUrls: ['./refresh-devis-achat.component.scss']
})
export class RefreshDevisAchatComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
    this.router.navigate([DevisAchatComponent.urlRefreshDevisAchat]);
  }

}
