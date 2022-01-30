import { Component, OnInit } from '@angular/core';
import { BanqueModel } from '../../../banque/Banque.modal';
import { CompteBancaireModel } from '../compte-bancaire.model';
import { CompteBancaireService } from '../compte-bancaire.service';

@Component({
  selector: 'ngx-show-compte',
  templateUrl: './show-compte.component.html',
  styleUrls: ['./show-compte.component.scss']
})
export class ShowCompteFournisseurComponent implements OnInit {
compte : CompteBancaireModel
  constructor(private service : CompteBancaireService) { }

  ngOnInit() {
    this.compte = new CompteBancaireModel()
    this.compte.banque = new BanqueModel
    let idCompte = localStorage.getItem('idCompte');
    this.service.getById(+idCompte).subscribe(
   data => { 
     this.compte = data;
   
     },
   error => {
     console.log('erreur');
   });
  }

}
