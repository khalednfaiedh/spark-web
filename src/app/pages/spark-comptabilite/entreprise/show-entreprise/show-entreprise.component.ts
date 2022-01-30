import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../entreprise';
import { EntrepriseService } from '../entreprise.service';

@Component({
  selector: 'ngx-show-entreprise',
  templateUrl: './show-entreprise.component.html',
  styleUrls: ['./show-entreprise.component.scss']
})
export class ShowEntrepriseComponent implements OnInit {
  enterprise :Enterprise
  name="khaled";
  
  constructor(private entrepriseService:EntrepriseService) { }

  ngOnInit() {
    this.enterprise = new Enterprise();      
    let idEntreprise = localStorage.getItem("idEntreprise");
    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      ent =>{this.enterprise = ent;},
      error =>{console.log(error);}
      );
  }
}
