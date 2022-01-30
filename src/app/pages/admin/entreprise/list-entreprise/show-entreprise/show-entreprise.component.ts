import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../entreprise.service';
import { Entreprise } from '../../entreprise';
import { FormeJuridiqueModel } from '../../../forme-juridique/forme-juridique.model';
import { UniteDeTransactionModel } from '../../../unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-show-entreprise',
  templateUrl: './show-entreprise.component.html',
  styleUrls: ['./show-entreprise.component.scss']
})
export class ShowEntrepriseComponent implements OnInit {
  enterprise :Entreprise
 
  constructor(private entrepriseService:EntrepriseService) { }

  ngOnInit() {
    this.enterprise = new Entreprise();  
    this.enterprise.money = new UniteDeTransactionModel
    this.enterprise.formeJuridique = new FormeJuridiqueModel    
    let idEntreprise = localStorage.getItem("idEntreprise");
    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      ent =>{this.enterprise = ent;
  },
      error =>{console.log(error);}
      );
  }
}
