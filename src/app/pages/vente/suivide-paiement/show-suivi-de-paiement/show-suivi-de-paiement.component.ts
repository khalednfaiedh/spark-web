import { Component, OnInit } from '@angular/core';
import { SuiviDePaiementService } from '../suivi-de-paiement.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-show-suivi-de-paiement',
  templateUrl: './show-suivi-de-paiement.component.html',
  styleUrls: ['./show-suivi-de-paiement.component.scss']
})
export class ShowSuiviDePaiementComponent implements OnInit {
  suiviPaiement: any = new Object()
  referenceFacture: string;
  test: string
  constructor(private serviceSP: SuiviDePaiementService, private windowService: NbWindowRef
  ) { }

  ngOnInit() {
    let idSP = localStorage.getItem('idSP');
    this.serviceSP.getSuiviPaiementById(+idSP).subscribe(dataSP => {
      this.suiviPaiement = dataSP
      this.referenceFacture = "FCT" + this.suiviPaiement.code_fac;

    })
  }

  onclose() {
    this.windowService.close();
  }

}
