import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Excercice, ExcerciceService } from '../../excercice/excercice.service';
import { Enterprise } from '../../entreprise/entreprise';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-choisire-exercice-plan-tier',
  templateUrl: './choisire-exercice-plan-tier.component.html',
  styleUrls: ['./choisire-exercice-plan-tier.component.scss']
})
export class ChoisireExercicePlanTierComponent implements OnInit {

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
    
    let idPlanGeneral = localStorage.getItem('idPlanTiers');
    console.log(idPlanGeneral)
    console.log(annee)
    localStorage.setItem('annee',annee);
    this.windowRef.close();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate(['/pages/comptabilite/mouvement-tiers']));

  }
}
