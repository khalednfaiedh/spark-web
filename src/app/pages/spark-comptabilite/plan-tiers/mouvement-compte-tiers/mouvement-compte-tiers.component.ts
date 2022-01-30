import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../entreprise/entreprise';
import { Excercice, ExcerciceService } from '../../excercice/excercice.service';
import { PlanTiersService } from '../plan-tiers.service';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-mouvement-compte-tiers',
  templateUrl: './mouvement-compte-tiers.component.html',
  styleUrls: ['./mouvement-compte-tiers.component.scss']
})
export class MouvementCompteTiersComponent implements OnInit {
  operations=[];
  entreprise= new Enterprise() ;
  exercice= new Excercice();
  constructor(private planTiersService: PlanTiersService,
              private entrepriseService:EntrepriseService,
              private exerciceService:ExcerciceService,
              private router:Router) { }

  ngOnInit() {

    let idPlanTiers = localStorage.getItem('idPlanTiers');

    let  annee = localStorage.getItem('annee');
    console.log(annee)

    this.planTiersService.getMouvementPlanTiers(idPlanTiers,annee).subscribe(

      data=>{this.operations=data;console.log(data)},
      error=>{console.log("ereur")}
    )
     


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
      data => {this.exercice = data;},
    error=>{console.log('error exerciece')})
  }
  onClick03(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/pages/comptabilite/journal']));
  }
   

}
