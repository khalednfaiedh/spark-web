import { Component, OnInit } from '@angular/core';
import { PlanGeneralService } from '../plan-general.service';
import { error } from 'util';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Enterprise } from '../../entreprise/entreprise';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrls: ['./mouvement.component.scss']
})
export class MouvementComponent implements OnInit {

  operations=[];
  entreprise= new Enterprise();
  exercice= new Excercice();
  constructor(private planGeneralService:PlanGeneralService,
              private entrepriseService:EntrepriseService,
              private exerciceService:ExcerciceService,
              private router:Router) { }

  ngOnInit() {

    let idPlanGeneral = localStorage.getItem('idPlanGeneral');

    let  annee = localStorage.getItem('annee');

    localStorage.removeItem('idPlanGeneral')
    localStorage.removeItem('annee')
    console.log(annee)

    this.planGeneralService.getMouvementPlanGeneral(idPlanGeneral,annee).subscribe(

      data=>{this.operations=data;console.log(data)},
      error=>{console.log("ereur")}
    )
     


  

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
