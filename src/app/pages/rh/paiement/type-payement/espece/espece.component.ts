import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaiementModel } from '../paiement.model';
import { PaiementService } from '../paiement.service';
import { FichePaieModel } from '../../../fiche-paie/fichePaie.model';

@Component({
  selector: 'ngx-espece',
  templateUrl: './espece.component.html',
  styleUrls: ['./espece.component.scss']
})
export class EspeceComponent implements OnInit {
  constructor(private router : Router, private paiementService : PaiementService) { }
  fiches : FichePaieModel[] ;
  recus : PaiementModel[] ;
  dateDeJour = new Date;
  num : number ;
ngOnInit() {
        this.recus = new Array
        let AllSelectedFiches = localStorage.getItem('AllSelectedFiches')
        this.fiches = JSON.parse(AllSelectedFiches);
        console.log(this.fiches)
        for (let i = 0; i < this.fiches.length; i++) {
              this.recus[i] = new PaiementModel() ;
              this.recus[i].nom = this.fiches[i].nom ;
              this.recus[i].idFiche = this.fiches[i].idFiche ;
              this.recus[i].prenom = this.fiches[i].prenom ;
              this.recus[i].matricule = this.fiches[i].matricule ;
              this.recus[i].net = this.fiches[i].netFinal ;
              this.recus[i].annee = this.fiches[i].anneeFiche ; 
              this.recus[i].mois = this.fiches[i].moisFiche ;      
              this.recus[i].dateEnregistrement = this.dateDeJour ;
              this.recus[i].numPaiement = Math.floor(100000 + Math.random() * 900000)
              // this.recus[i].entreprise = this.fiches[i].contr ; 
            switch(this.fiches[i].moisFiche) { 
              case 1: {  this.recus[i].moisI ='Janvier'; break;  } 
              case 2: { this.recus[i].moisI ="Février"; break; } 
              case 3: {this.recus[i].moisI ="Mars";  break; } 
              case 4: { this.recus[i].moisI ="Avril";  break; }  
              case 5: { this.recus[i].moisI ="Mai";  break; }  
              case 6: { this.recus[i].moisI ="Juin";  break; }  
              case 7: { this.recus[i].moisI ="Juillet";  break; }  
              case 8: { this.recus[i].moisI ="Aout";  break; }  
              case 9: { this.recus[i].moisI ="Séptembre";  break; }  
              case 10: { this.recus[i].moisI ="Octobre";  break; }  
              case 11: { this.recus[i].moisI ="Novembre";  break; }  
              case 12: { this.recus[i].moisI ="Décembre";  break; } 
              case 13: { this.recus[i].moisI ="13éme mois";  break; } 
              case 14: { this.recus[i].moisI ="14éme mois";  break; }  
              case 15: { this.recus[i].moisI ="15éme mois";  break; }  
              case 16: { this.recus[i].moisI ="16éme mois";  break; }   
              default: {  console.log("Invalid month"); break; } 
            }
        }
}
back(){
this.router.navigate(['/pages/rh/journalPaie']);
localStorage.removeItem('AllSelectedFiches')
}

save(){
  this.recus.forEach(element => {
    element.etat = 1 ;
    element.typeOp = 2 ;
    let idEntreprise = localStorage.getItem('current_entreprise')
    element.idEntreprise  = +idEntreprise
 });
  this.paiementService.save(this.recus).subscribe(
   data => {
        
        localStorage.removeItem('AllSelectedFiches')
     //  localStorage.setItem('MOIS',this.recus[0].mois)
       this.recus=[]
       this.router.navigate(['pages/rh/paiement']);
   },
   error => {
    console.log('err save')
   });
}
}
