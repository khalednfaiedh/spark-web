import { Component, OnInit } from '@angular/core';
import { CoordonnesBancaireClientService } from '../service/coordonnes-bancaire-client.service';
import { BanqueService } from '../../../banque/banque.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-show-coordonnes-bancaire-client',
  templateUrl: './show-coordonnes-bancaire-client.component.html',
  styleUrls: ['./show-coordonnes-bancaire-client.component.scss']
})
export class ShowCoordonnesBancaireClientComponent implements OnInit {
  source: any;
  banques: any = [];
  constructor(private service: CoordonnesBancaireClientService, private serviceBanque: BanqueService,
    public windowRef: NbWindowRef, ) { }

  ngOnInit() {
    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceBanque.getAllBanques(+idEntr).subscribe(
      data => {
        this.source = data;
        console.log(data);


      },
      error => {
        console.log("error");
      });
    let codeCLT = localStorage.getItem('idClient');
    this.service.getCoordonneesBancairesClient(+codeCLT).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });
  }
  settings = {
    actions: {
      "position": "right",
      edit: false,
      delete: false,
      add: false,
    },
    columns: {
      banque: {
        title: 'Banque',
        type: 'list',
        width: '200px',
        valuePrepareFunction: (cell, row) => {
          return cell.nom;
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Banque',
            list: this.banques.nom,
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Banque',
            list: this.banques,
          },
        },
      },
      rib: {
        title: 'Rib',
        type: 'string',
        filter: true,
        width: '400px',
      },
      bic: {
        title: 'Bic',
        type: 'string',
        filter: true,
        width: '200px',
      },
      iban: {
        title: 'Iban',
        type: 'string',
        filter: true,
        width: '400px',
      },

    },
  };
  onclose() {
    this.windowRef.close();
  }
}
