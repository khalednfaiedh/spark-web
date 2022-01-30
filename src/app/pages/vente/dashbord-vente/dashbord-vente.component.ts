import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashbord-vente',
  templateUrl: './dashbord-vente.component.html',
  styleUrls: ['./dashbord-vente.component.scss']
})
export class DashbordVenteComponent implements OnInit {
  public static urlStatistique = "/pages/vente/statistique"
  constructor() { }

  ngOnInit() {
  }

}
