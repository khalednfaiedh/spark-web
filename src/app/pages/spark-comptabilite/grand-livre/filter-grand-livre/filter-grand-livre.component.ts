import { Component, OnInit } from '@angular/core';
import { ExcerciceService } from '../../excercice/excercice.service';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Router } from '@angular/router';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-filter-grand-livre',
  templateUrl: './filter-grand-livre.component.html',
  styleUrls: ['./filter-grand-livre.component.scss']
})
export class FilterGrandLIvreComponent implements OnInit {
  exercices:any[];
  entreprise:any;
  id:any;
  constructor( private exerciceService:ExcerciceService,
    private entrepriseService:EntrepriseService,
    private  router:Router,private windowService: NbWindowService,
    private windowRef: NbWindowRef) { }

  ngOnInit() {

    let idEntreprise=localStorage.getItem('current_entreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data=>{this.entreprise = data;
         
      console.log(data);
      },
      error=>{console.log(error);
      }
    );

    this.exerciceService.getAllExcercice(+idEntreprise).subscribe(
      data=>{this.exercices=data},
      error=>{console.log("ereur excercices")})
  


    }
  getGrandLivre(id){
    localStorage.setItem('idExerciceFilter',id);
    this.router.navigate(['/pages/grandLivreExercice']);
    this.windowRef.close();
console.log(id)
  }
}
