import { Component, OnInit } from '@angular/core';
import { PaiementModel } from '../paiement.model';
import { Router } from '@angular/router';
import { PaiementService } from '../paiement.service';
import { FichePaieModel } from '../../../fiche-paie/fichePaie.model';

@Component({
  selector: 'ngx-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss']
})
export class ChequeComponent implements OnInit {

  constructor(private router : Router, private paiementService : PaiementService) { }
  fiches : FichePaieModel[] ;
  cheque : PaiementModel[] ;
  
  dateDeJour = new Date
ngOnInit() {
this.cheque = new Array
let AllSelectedFiches = localStorage.getItem('AllSelectedFiches')
this.fiches = JSON.parse(AllSelectedFiches);
for (let i = 0; i < this.fiches.length; i++) {
  this.cheque[i] = new PaiementModel() ;
  this.cheque[i].nom = this.fiches[i].nom ;
  this.cheque[i].prenom = this.fiches[i].prenom ;
  this.cheque[i].matricule = this.fiches[i].matricule ;
  this.cheque[i].net = this.fiches[i].netFinal ;
  this.cheque[i].annee = this.fiches[i].anneeFiche ;
  this.cheque[i].mois = this.fiches[i].moisFiche ;
  this.cheque[i].idFiche = this.fiches[i].idFiche ;
  this.cheque[i].numPaiement = Math.floor(100000 + Math.random() * 900000)
 
switch(this.fiches[i].moisFiche) { 
  case 1: {  this.cheque[i].moisI ='Janvier'; break;  } 
  case 2: { this.cheque[i].moisI ="Février"; break; } 
  case 3: {this.cheque[i].moisI ="Mars";  break; } 
  case 4: { this.cheque[i].moisI ="Avril";  break; }  
  case 5: { this.cheque[i].moisI ="Mai";  break; }  
  case 6: { this.cheque[i].moisI ="Juin";  break; }  
  case 7: { this.cheque[i].moisI ="Juillet";  break; }  
  case 8: { this.cheque[i].moisI ="Aout";  break; }  
  case 9: { this.cheque[i].moisI ="Séptembre";  break; }  
  case 10: { this.cheque[i].moisI ="Octobre";  break; }  
  case 11: { this.cheque[i].moisI ="Novembre";  break; }  
  case 12: { this.cheque[i].moisI ="Décembre";  break; }  
  default: {  console.log("Invalid month"); break; } 
}
}
}
back(){
this.router.navigate(['/pages/rh/journalPaie']);
localStorage.removeItem('AllSelectedFiches')
}
save(){
  this.cheque.forEach(element => {
    element.etat = 1 ;
    element.typeOp = 1 ;
    let idEntreprise = localStorage.getItem('current_entreprise')
    element.idEntreprise  = +idEntreprise
 });
  this.paiementService.save(this.cheque).subscribe(
    data => {
         console.log('success save')
         console.log(this.cheque)
         localStorage.removeItem('AllSelectedFiches')
         this.cheque=[]
         this.router.navigate(['pages/rh/paiement']);
    },
    error => {
     console.log('err save')
    });
}
}
