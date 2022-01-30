import { Component, OnInit } from '@angular/core';
import { Excercice, ExcerciceService } from '../../excercice/excercice.service';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Enterprise } from '../../entreprise/entreprise';

@Component({
  selector: 'ngx-titre-exercice',
  templateUrl: './titre-exercice.component.html',
  styleUrls: ['./titre-exercice.component.scss']
})
export class TitreExerciceComponent implements OnInit {
exercice = new Excercice();
entreprise= new Enterprise();
  constructor(  private exerciceService:ExcerciceService, 
                private entrepriseService:EntrepriseService,
                private router:Router) { }

  ngOnInit() {

    let idEntreprise=localStorage.getItem('current_entreprise');
    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data=>{this.entreprise = data;
         
      console.log(data);
      },
      error=>{console.log(error);
      }
    );

    let idExercice= localStorage.getItem('idExercice')
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {this.exercice = data;
        this.exercice=this.exercice;
              },
      error => {console.log(error);}
      );
  }

  onClick03(){
    window.history.back();
  }

  previousState() {
    window.history.back();
}

}
