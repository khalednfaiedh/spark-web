import { Component, OnInit } from '@angular/core';
import { Excercice, ExcerciceService } from '../../excercice/excercice.service';
import { Enterprise } from '../../entreprise/entreprise';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Router } from '@angular/router';
import { MockDataModule } from '../../../../@core/mock/mock-data.module';

@Component({
  selector: 'ngx-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

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
  
     
    previousState() {

      let e = localStorage.getItem('e')
      if(e ==='2')
      {
        
        this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
        this.router.navigate(['/pages/comptabilite//journalFils']));
      }
      else
      {
        this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
        this.router.navigate(['/pages/comptabilite//listModeleEcriture']));
      }

      
  }
  

}
