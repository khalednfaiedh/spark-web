import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaxeComponent } from '../taxe.component';

@Component({
  selector: 'ngx-refresh-taxe',
  templateUrl: './refresh-taxe.component.html',
  styleUrls: ['./refresh-taxe.component.scss']
})
export class RefreshTaxeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([TaxeComponent.urlTaxe]);
  }

}
