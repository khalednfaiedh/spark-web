import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PaiementModel } from '../paiement.model';
import { PaiementService } from '../paiement.service';
import { FichePaieModel } from '../../../fiche-paie/fichePaie.model';
import { EmployeListService } from '../../../../admin/employe-list/employe-list.service';

@Component({
  selector: 'ngx-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.scss']
})
export class VirementComponent implements OnInit {
  constructor(private employeeService : EmployeListService, private router : Router, private paiementService : PaiementService) { }
      fiches : FichePaieModel[] ;
      virements : PaiementModel[] ;
      total : number
      mois : string
      annee : number
      num : number
  ngOnInit() {
    this.virements = new Array
    let AllSelectedFiches = localStorage.getItem('AllSelectedFiches')
    this.fiches = JSON.parse(AllSelectedFiches);
    this.total = 0
    for (let i = 0; i < this.fiches.length; i++) {
      this.virements[i] = new PaiementModel() ;
      this.virements[i].nom = this.fiches[i].nom ;
      this.virements[i].prenom = this.fiches[i].prenom ;
      this.virements[i].idFiche = this.fiches[i].idFiche ;
      this.virements[i].matricule = this.fiches[i].matricule ;
      this.virements[i].mois = this.fiches[i].moisFiche ;
      this.virements[i].annee = this.fiches[i].anneeFiche ;
      this.employeeService.getEmployesById(this.fiches[i].matricule).subscribe(
        data => {
          this.virements[i].rib = data.rib
          this.virements[i].banque = data.nomBanque
          this.virements[i].agence = data.agence},
        error => {console.log('err get empl information')}
      )
      this.virements[i].net = this.fiches[i].netFinal ;
      this.total += this.fiches[i].netFinal ;   
    }
    this.annee = this.fiches[0].anneeFiche ; 
    switch(this.fiches[0].moisFiche) { 
      case 1: {  this.mois ='Janvier'; break;  } 
      case 2: { this.mois ="Février"; break; } 
      case 3: {this.mois ="Mars";  break; } 
      case 4: { this.mois ="Avril";  break; }  
      case 5: { this.mois ="Mai";  break; }  
      case 6: { this.mois ="Juin";  break; }  
      case 7: { this.mois ="Juillet";  break; }  
      case 8: { this.mois ="Aout";  break; }  
      case 9: { this.mois ="Séptembre";  break; }  
      case 10: { this.mois ="Octobre";  break; }  
      case 11: { this.mois ="Novembre";  break; }  
      case 12: { this.mois ="Décembre";  break; }  
      case 13: {this.mois ="13émé mois";  break; } 
      case 14: { this.mois ="14émé mois";  break; }  
      case 15: { this.mois ="15émé mois";  break; }  
      case 16: { this.mois ="16émé mois";  break; }  
      default: {  console.log("Invalid month"); break; } 
   }
  }
back(){
  this.router.navigate(['/pages/rh/journalPaie']);
  localStorage.removeItem('AllSelectedFiches')
}
save(){
  this.virements.forEach(element => {
    element.numPaiement = this.num ;
    element.etat =1 ;
    element.typeOp = 3
    let idCompte = localStorage.getItem('idCompteBancaire')
    element.idCompte =   +idCompte
    let idEntreprise = localStorage.getItem('current_entreprise')
    element.idEntreprise  = +idEntreprise
 });
  this.paiementService.save(this.virements).subscribe(
    data => {
       
         localStorage.removeItem('AllSelectedFiches')
         localStorage.removeItem("idCompteBancaire")
         this.virements=[]
         this.total = 0
         this.num = 0 ;
         this.router.navigate(['pages/rh/paiement']);
    },
    error => {
     console.log('err save')
    }
  )
 }
}
