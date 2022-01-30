import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { Enterprise } from '../../entreprise/entreprise';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-choisir-exercice',
  templateUrl: './choisir-exercice.component.html',
  styleUrls: ['./choisir-exercice.component.scss']
})
export class ChoisirExerciceComponent implements OnInit {

  entreprise = new Enterprise();
  exercice = new Excercice();
  exercices = []
  constructor(private entrepriseService: EntrepriseService,
    private exerciceService: ExcerciceService,
    private router: Router,public windowRef: NbWindowRef
  ) { }

  ngOnInit() {


    let idEntreprise = localStorage.getItem('current_entreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data => {
      this.entreprise = data;

        console.log(data);
      },
      error => {
        console.log(error);
      }
    );


    this.exerciceService.getAllExcercice(+idEntreprise).subscribe(
      data => { this.exercices = data },
      error => { console.log("ereur excercices") }
    )
  }

  mouvementByCompte(annee) {
    
    let idPlanGeneral = localStorage.getItem('idPlanGeneral');
    localStorage.removeItem('idPlanGeneral')
    console.log(idPlanGeneral)
    console.log(annee)
    localStorage.setItem('annee',annee);
    this.windowRef.close();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/pages/comptabilite/mouvement-general']));

  }
  }
