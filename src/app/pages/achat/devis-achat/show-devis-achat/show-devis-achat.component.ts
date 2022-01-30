import { Component, OnInit } from '@angular/core';
import { DevisAchatService } from "../services/devis-achat.service";
import { DevisModel } from "../model/devis-achat.model";
import { NbWindowRef } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { FournisseurModel } from '../../../admin/fournisseur/fournisseur.model';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';

@Component({
  selector: 'ngx-show-devis-achat',
  templateUrl: './show-devis-achat.component.html',
  styleUrls: ['./show-devis-achat.component.scss']
})
export class ShowDevisAchatComponent implements OnInit {

  id = localStorage.getItem('idRC');
  devis: DevisModel = new DevisModel();
  source: LocalDataSource;
  fournisseur: FournisseurModel = new FournisseurModel();
  prixtotHT: number = 0;
  prixtotTTC: number = 0;
  fournisseurs = [];
  fournisseurId: number;

  constructor(private serviceD: DevisAchatService, public windowRef: NbWindowRef,
    private serviceF: FournisseurService) { }

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.serviceF.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
    },
      error => {
        console.log("error");
      });
    this.serviceD.getDevis(+this.id).subscribe(
      data => {
        this.devis = data;
        this.fournisseurId= this.devis.demandeFournisseur.idF;
        console.log(this.devis);
        this.source = new LocalDataSource(data.devisProduits);
        this.prixtotHT = this.devis.prixTot;
        this.prixtotTTC = this.prixtotHT + ((this.prixtotHT * this.devis.taxe) / 100)
        this.serviceF.getFournisseurById(data.demandeFournisseur.idF).subscribe(
          data2 => {
            this.fournisseur = data2;
          })
      }
    )
  }
  settings = {


    actions: {
      edit: false,
      add: false,
      delete: false,
      position: 'right',

    },

    columns: {
      codeP: {
        title: 'Code',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
      },
      qte: {
        title: 'Quantité',
        type: 'number',
        filter: false,

      },
      prix: {
        title: 'Prix Unitaire',
        type: 'number',
        filter: false,

      },
      taxeProduit: {
        title: 'Tva (%)',
        type: 'number',
        editable: false,
        addable: false,
      },
      remiseProduit: {
        title: 'Remise (%)',
        type: 'number',
      },
      prixTotale: {
        title: 'Prix HT',
        type: 'number',
        editable: false,
        addable: false,
        // valuePrepareFunction(cell, row) {
        //   if (row.quantity != null && row.prixUnitaire != null) {
        //     row.prixTotale = row.quantity * row.prixUnitaire
        //     return row.prixTotale;
        //   }
        // }
      },
      prixTTC: {
        title: 'Prix TTC',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
        // valuePrepareFunction(cell, row) {
        //   if (row.prixTotale != null && row.taxeProduit != null) {
        //   row.prixTTC = row.prixTotale + ((row.prixTotale * row.taxeProduit) / 100);
        //   return row.prixTTC;
        //   }
        // }
      },
    },
  };
  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }

}
