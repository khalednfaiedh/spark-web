import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Enterprise } from '../../entreprise/entreprise';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-titre-journal',
  templateUrl: './titre-journal.component.html',
  styleUrls: ['./titre-journal.component.scss']
})
export class TitreJournalComponent implements OnInit {
  entreprise = new Enterprise();
  exercice = new Excercice();
  constructor(private entrepriseService:EntrepriseService, private exerciceService:ExcerciceService,
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

}
