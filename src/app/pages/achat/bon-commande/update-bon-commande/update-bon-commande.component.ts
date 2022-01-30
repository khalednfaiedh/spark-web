import { Component, OnInit } from '@angular/core';
import { BonCommandeService } from '../services/bon-commande.service';
import { BonCommandeAchatModel } from '../model/bon-commande.model';
import { NbWindowRef } from '@nebular/theme';
import { EtapeCommandeModel } from '../../../admin/etape-commande/etape-commande.model';
import { EtapeCommandeService } from '../../../admin/etape-commande/etape-commande.service';

@Component({
  selector: 'ngx-update-bon-commande',
  templateUrl: './update-bon-commande.component.html',
  styleUrls: ['./update-bon-commande.component.scss']
})
export class UpdateBonCommandeComponent implements OnInit {
  bonCommande: BonCommandeAchatModel;
  etapeCommandes: EtapeCommandeModel[];

  constructor(public windowRef: NbWindowRef, public service: BonCommandeService,
    public serviceEtapeCommande: EtapeCommandeService) { }

  ngOnInit() {
    this.bonCommande = new BonCommandeAchatModel();
    this.serviceEtapeCommande.getAllEtapeCommande().subscribe(
      data => {
        this.etapeCommandes = data;
      },
      error => { console.log("error"); });
    let idBC = localStorage.getItem('idBC')
    this.service.getBonCommandeById(+idBC).subscribe(data => {
      this.bonCommande = data;
      console.log(this.bonCommande)
    },
      error => { console.log("error"); });
  }

  modifierBC() {
    this.service.updateBonCommandesByEtapeCommandes(this.bonCommande).subscribe(data => {
      this.windowRef.close();
    },
      error => {
        console.log("error");
      });
  }
}