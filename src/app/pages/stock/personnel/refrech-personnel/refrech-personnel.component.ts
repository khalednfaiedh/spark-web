import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-refrech-personnel',
  templateUrl: './refrech-personnel.component.html',
  styleUrls: ['./refrech-personnel.component.scss']
})
export class RefrechPersonnelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/pages/stock/personnel']);
  }

}
