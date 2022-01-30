import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../type-payement/paiement.service';
import { PaiementModel } from '../type-payement/paiement.model';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ShowVirementComponent } from './show-virement/show-virement.component';

@Component({
  selector: 'ngx-paiement-list',
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.scss']
})
export class PaiementListComponent implements OnInit {
  paiementList : PaiementModel[];
  moisI : String ;
  ETAT : String
  annee : any ;
  typeOp : String ;
  constructor(private paiementService : PaiementService, private router : Router,
    private windowService : NbWindowService) { }

  ngOnInit() {
    let mois = localStorage.getItem('MOIS')
    this.annee = localStorage.getItem('ANNEE')
    this.paiementList = new Array ;
    let idE = localStorage.getItem('current_entreprise')
    this.paiementService.getAll(+idE, +mois, + this.annee).subscribe(
  data =>{
    this.paiementList = data
    this.paiementList.forEach(element => {
      switch(element.etat) { 
        case 1: {  element.ETAT ='Non payer'; break;  } 
        case 2: { element.ETAT ="Payer"; break; } 
       }
    });
    },
  error => {
    console.log('error')
  }
);

switch(+mois) { 
  case 1: {  this.moisI ='Janvier'; break;  } 
  case 2: { this.moisI ="Février"; break; } 
  case 3: {this.moisI ="Mars";  break; } 
  case 4: { this.moisI ="Avril";  break; }  
  case 5: { this.moisI ="Mai";  break; }  
  case 6: { this.moisI ="Juin";  break; }  
  case 7: { this.moisI ="Juillet";  break; }  
  case 8: { this.moisI ="Aout";  break; }  
  case 9: { this.moisI ="Séptembre";  break; }  
  case 10: { this.moisI ="Octobre";  break; }  
  case 11: { this.moisI ="Novembre";  break; }  
  case 12: { this.moisI ="Décembre";  break;}
  case 13: { this.moisI ="13éme";  break;}
  case 14: { this.moisI ="14éme";  break;}
  case 15: { this.moisI ="15éme";  break;}
  case 16: { this.moisI ="16éme";  break; }  
  default: {  console.log("Invalid month"); break; } 
}
}

back(){
  this.router.navigate(['/pages/rh/journalPaie']);
}
open(paiement){
  localStorage.setItem('CODE',paiement.numPaiement);

  this.windowService.open(ShowVirementComponent, { title: 'Ordre de virement' },)
 
}
payer(PAIEMENT){
 
  this.paiementService.payement(PAIEMENT.idPayement).subscribe(
    data => {
     
      this.ngOnInit()
    },
    error => {
      console.log('erreur de paiement')
    }
  );
}

supprimer(PAIEMENT){
  this.paiementService.deletePayement(PAIEMENT.idPayement).subscribe(
    data => {
      
      this.ngOnInit()
    },
    error => {
      console.log("err delete")
    }
  )
}
}
