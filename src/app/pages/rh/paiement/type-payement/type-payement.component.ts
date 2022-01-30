import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { CompteBancaireService } from '../../../admin/entreprise/compte-bancaire/compte-bancaire.service';

@Component({
  selector: 'ngx-type-payement',
  templateUrl: './type-payement.component.html',
  styleUrls: ['./type-payement.component.scss']
})
export class TypePayementComponent implements OnInit {

  typePayement = ['Espéce','Chéque','Ordre de virement'] ;
  typePayementSelected : string ;
  compte : any ;
  comptes : any ;
  constructor(private router : Router, private windowRef : NbWindowRef,
    private compteBancaireService : CompteBancaireService) { }
  
  ngOnInit() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.compteBancaireService.getAllCompteMin(+idEntreprise).subscribe(
      data => {this.comptes = data}
    )
  }
  confirmTypePayement(){
   
    localStorage.setItem('type',this.typePayementSelected);
    if (this.typePayementSelected =='Espéce' ) {
       this.router.navigate(['/pages/rh/paiement/espece']);
       
    }else if (this.typePayementSelected =='Chéque' ) {
      this.router.navigate(['/pages/rh/paiement/cheque']);    } 
    else {
      this.router.navigate(['/pages/rh/paiement/virement']);
      localStorage.setItem('idCompteBancaire',this.compte.idCompte);

    }
    this.windowRef.close()
  }
  close(){
    this.windowRef.close()
  }
}
