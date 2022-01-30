import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-refrech-magasin',
  templateUrl: './refrech-magasin.component.html',
  styleUrls: ['./refrech-magasin.component.scss']
})
export class RefrechMagasinComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/pages/stock/magasin']);
  }

}
