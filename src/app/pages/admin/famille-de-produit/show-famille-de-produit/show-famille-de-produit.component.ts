import { Component, OnInit } from '@angular/core';
import { FamilleDeProduitModel } from '../famille-de-produit.model';
import { FamilleDeProduitService } from '../famille-de-produit.service';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-show-famille-de-produit',
  templateUrl: './show-famille-de-produit.component.html',
  styleUrls: ['./show-famille-de-produit.component.scss']
})
export class ShowFamilleDeProduitComponent implements OnInit {
source: any;
FamilleDeProduits: FamilleDeProduitModel[];
FamilleDeProduit: FamilleDeProduitModel;
  constructor(private service: FamilleDeProduitService, public windowRef: NbWindowRef,private router:Router) { }

  ngOnInit() {
    let id= localStorage.getItem('current_entreprise')
    this.FamilleDeProduit = new FamilleDeProduitModel();
    let idC = localStorage.getItem("idFamilleDeProduit");
    this.service.getFamilleDeProduitById(+idC).subscribe(data=>{
      this.FamilleDeProduit = data;
      console.log(data)
      this.source = data.familleDeProduitFils;
    });
    this.service.getAllFamilleDeProduit(+id).subscribe(data=>{
      this.FamilleDeProduits = data;
    },
    error=>{console.log("error");});

  }
  settings = {
    actions: false,
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
      },
    },
  };
  onclose(){
    this.windowRef.close();
    this.router.navigate(["/pages/admin/familleDeProduit"]);
  }
}