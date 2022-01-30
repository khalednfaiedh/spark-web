import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-refresh-emplacement',
  templateUrl: './refresh-emplacement.component.html',
  styleUrls: ['./refresh-emplacement.component.scss']
})
export class RefreshEmplacementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/pages/stock/emplacement']);
  }
}
