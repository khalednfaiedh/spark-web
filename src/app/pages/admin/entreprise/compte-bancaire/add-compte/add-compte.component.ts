import { Component, OnInit } from '@angular/core';
import { CompteBancaireModel } from '../compte-bancaire.model';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { CompteBancaireService } from '../compte-bancaire.service';
import { BanqueModel } from '../../../banque/Banque.modal';
import { BanqueService } from '../../../banque/banque.service';
import { UniteDeTransactionService } from '../../../unite-de-transaction/UniteDeTransaction.service';
import { UniteDeTransactionModel } from '../../../unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteComponent implements OnInit {

  compte: any;
  A: string;
  idEntr = +localStorage.getItem('idEntreprise');
  banques: BanqueModel[];
  unites:UniteDeTransactionModel[];
  constructor(private service: CompteBancaireService, private router: Router,
    public banqueService: BanqueService,
    public uniteService : UniteDeTransactionService,
    public windowRef: NbWindowRef) {
  }

  ngOnInit(): void {
    this.compte = new CompteBancaireModel();
    let e = localStorage.getItem('e');
  //  let idEntr = localStorage.getItem('current_entreprise')
    this.banqueService.getAllBanques(this.idEntr).subscribe(
      data => { this.banques = data },
      err => { console.log('err') }
    )
    this.uniteService.getAllUniteDeTransaction(this.idEntr).subscribe(
      data => { this.unites = data },
      err => { console.log('err') }
    )
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let idCompte = localStorage.getItem('idCompte');
      this.service.getCompteById(+idCompte).subscribe(
        data => {
          this.compte = data;
        },
        error => {   });
    }
  }
  add() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.service.addCompte(+this.idEntr, this.compte).subscribe
        (data => {
          console.log("succées");
          localStorage.removeItem('e');
          localStorage.removeItem('idCompte');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/entreprise/compte-bancaire"]));
          this.windowRef.close();
        },
          error => {

          });
    }
    if (e === '1') {
      this.service.updateCompte(+this.idEntr, this.compte).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idCompte');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/entreprise/compte-bancaire"]));
          this.windowRef.close();
        },
        error => {

        });
    }
  }
  close() {
    this.windowRef.close();
  }
}
