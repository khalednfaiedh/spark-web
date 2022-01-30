import { Component, OnInit } from '@angular/core';
import { EtatFinancier } from '../etat-financier';
import { EtatFinancierService } from '../etat-financier.service';

@Component({
  selector: 'ngx-show-etatfinancier',
  templateUrl: './show-etatfinancier.component.html',
  styleUrls: ['./show-etatfinancier.component.scss']
})
export class ShowEtatfinancierComponent implements OnInit {

  etatFinancier :EtatFinancier
  constructor(private etatFinancierService:EtatFinancierService) { }

  ngOnInit() {
    this.etatFinancier = new EtatFinancier();
    let idEtat = localStorage.getItem("idEtat");
     localStorage.removeItem('idEtat')
    this.etatFinancierService.getEtatFinancierById(+idEtat).subscribe(
      data =>{this.etatFinancier = data;},
      error =>{console.log(error);}
      );
  }
}
