import { Component, OnInit } from '@angular/core';
import { BanqueModel } from '../../../banque/Banque.modal';
import { UniteDeTransactionModel } from '../../../unite-de-transaction/UniteDeTransaction.model';
import { UniteDeTransactionService } from '../../../unite-de-transaction/UniteDeTransaction.service';
import { CompteBancaireModel } from '../compte-bancaire.model';
import { CompteBancaireService } from '../compte-bancaire.service';

@Component({
  selector: 'ngx-show-compte',
  templateUrl: './show-compte.component.html',
  styleUrls: ['./show-compte.component.scss']
})
export class ShowCompteComponent implements OnInit {
  compte: CompteBancaireModel
  unites: UniteDeTransactionModel[];
  idEntr = +localStorage.getItem('idEntreprise');
  constructor(private service: CompteBancaireService,
    private uniteService: UniteDeTransactionService) { }

  ngOnInit() {
    this.compte = new CompteBancaireModel()
    this.compte.banque = new BanqueModel
    let idCompte = localStorage.getItem('idCompte');
    this.service.getCompteById(+idCompte).subscribe(
      data => { this.compte = data; },
      error => { console.log('erreur'); });
    this.uniteService.getAllUniteDeTransaction(this.idEntr).subscribe(
      data => { this.unites = data },
      err => { console.log('err') });
  }
}
