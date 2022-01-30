import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../entreprise/entreprise';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-titre',
  templateUrl: './titre.component.html',
  styleUrls: ['./titre.component.scss']
})
export class TitreComponent implements OnInit {
  entreprise = new Enterprise();
  constructor( private entrepriseService:EntrepriseService,private router:Router) { }

  ngOnInit() {

    let idEntreprise=localStorage.getItem('current_entreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data=>{this.entreprise = data;
         
      console.log(data);
      },
      error=>{console.log(error);
      }
    );
  }

  
    onClick(){
      
        window.history.back();
   

    }
  }


