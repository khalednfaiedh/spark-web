import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'ngx-refresh-product',
  templateUrl: './refresh-product.component.html',
  styleUrls: ['./refresh-product.component.scss'],
})
export class RefreshProductComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate([ProductComponent.urlProduct]);
  }

}
