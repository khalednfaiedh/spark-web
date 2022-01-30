import { Component, OnInit } from '@angular/core';
import { CategorieClientService } from '../categorie-client.service';
import { CategorieClient } from '../categorieClient';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-show-categorie-client',
  templateUrl: './show-categorie-client.component.html',
  styleUrls: ['./show-categorie-client.component.scss']
})
export class ShowCategorieClientComponent implements OnInit {
  source: any;
  categoriesClient: CategorieClient[];
  categorieClient: CategorieClient;
  constructor(private serviceCategorieClient: CategorieClientService, private router: Router, public windowRef: NbWindowRef) { }

  ngOnInit() {
    let idC = localStorage.getItem("idCategorie");
    this.serviceCategorieClient.getCategorieClientById(+idC).subscribe(data => {
      this.categorieClient = data;
      console.log(data)
      this.source = data.categorieClientFils;
    });
    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceCategorieClient.getAllCategorieClient(+idEntr).subscribe(data => {
      this.categoriesClient = data;
    },
      error => { console.log("error"); });

  }
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Nom',
        type: 'string',
      },
    },
  };
  onclose() {
    this.windowRef.close();

  }
}
